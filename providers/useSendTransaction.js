"use client";

import useKrypton from "@/hooks/useKrypton";
import { openDrawer } from "@/redux/slice/sigManagerSlice";
import {
  setFnArgs,
  setFnName,
  setSuccessMessage,
} from "@/redux/slice/walletSlice";
import { useEthersSigner } from "@/wagmi/EthersSigner";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function useSendTransaction() {
  const dispatch = useDispatch();
  const { prepareTransaction, executeTransaction } = useKrypton();
  const searchParams = useSearchParams();
  const signer = useEthersSigner();
  const is2FA = useSelector((state) => state.wallet.is2FA);
  const recentTwoFactor = useSelector((state) => state.wallet.recentTwoFactor);
  const twoFactorCooldown = useSelector(
    (state) => state.wallet.twoFactorCooldown
  );

  const use2FAsend = (fnName, fnArgs, successMessage) => {
    const combinedArgs = [...fnArgs, ""];

    dispatch(setFnName(fnName));
    dispatch(setFnArgs(combinedArgs));

    dispatch(setSuccessMessage(successMessage));
    dispatch(openDrawer());
  };

  const useNo2FAsendWithSig = async (fnName, fnArgs, successMessage) => {
    const walletAddress = searchParams.get("wallet").split(":")[1];
    const chain = searchParams.get("wallet").split(":")[0];

    const combinedArgs = [
      ...fnArgs,
      "0xa15569dd8f8324dbeabf8073fdec36d4b754f53ce5901e283c6de79af177dc94557fa3c9922cd7af2a96ca94402d35c39f266925ee6407aeb32b31d76978d4ba1c",
    ];

    const callData = await prepareTransaction(fnName, combinedArgs);

    await executeTransaction(walletAddress, chain, callData, successMessage);
  };

  const useNo2FAsendWithNoSig = async (fnName, fnArgs, successMessage) => {
    const walletAddress = searchParams.get("wallet").split(":")[1];
    const chain = searchParams.get("wallet").split(":")[0];

    const callData = await prepareTransaction(fnName, fnArgs);

    await executeTransaction(walletAddress, chain, callData, successMessage);
  };

  const useNormalSend = async (fnName, fnArgs, successMessage) => {
    try {
      const callData = await prepareTransaction(fnName, fnArgs);

      const tx = await signer.sendTransaction(callData);
      await tx.wait();

      toast.success(successMessage);
    } catch (error) {
      console.log(error);
      toast.error("Transaction failed");
    }
  };

  const initiateTransaction = async (fnName, fnArgs, successMessage) => {
    if (!is2FA) {
      await useNo2FAsendWithSig(fnName, fnArgs, successMessage);
      return;
    }

    if (recentTwoFactor + twoFactorCooldown > Date.now() / 1000) {
      await useNo2FAsendWithSig(fnName, fnArgs, successMessage);
      return;
    }

    use2FAsend(fnName, fnArgs, successMessage);
  };

  return {
    use2FAsend,
    useNo2FAsendWithSig,
    useNo2FAsendWithNoSig,
    useNormalSend,
    initiateTransaction,
  };
}

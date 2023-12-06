"use client";

import { ChainConfig } from "@/lib/chainConfig";
import { setSignature } from "@/redux/slice/sigManagerSlice";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { keccak256 } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import Web3 from "web3";
import useReadContract from "./useReadContract";

export default function useSignPayload() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { getTimeBasedMsg, getMessageHash } = useReadContract();

  const signMessage = async (id) => {
    const message = await getTimeBasedMsg();
    const messageHash = await getMessageHash(message);

    const inputs = Array.isArray(id) ? id : [id];
    const hash = inputs.reduce((acc, curr) => acc + curr, "");

    const currentConfig = ChainConfig.find(
      (c) => c.chainId.toString() === searchParams.get("wallet").split(":")[0]
    );

    if (!currentConfig) {
      return;
    }

    const web3 = new Web3(new Web3.providers.HttpProvider(currentConfig.rpc));

    web3.eth.accounts.wallet.add(keccak256(Buffer.from(hash)));
    const account = privateKeyToAccount(keccak256(Buffer.from(hash)));

    const signature = await web3.eth.sign(messageHash, account.address);

    dispatch(setSignature(signature.signature));
  };

  return { signMessage };
}

"use client";

import { ChainConfig } from "@/lib/chainConfig";
import Krypton from "@/lib/contracts/Krypton";
import { useEthersSigner } from "@/wagmi/EthersSigner";
import { ethers } from "ethers";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function useGuardian() {
  const searchParam = useSearchParams();
  const signer = useEthersSigner();

  const transferGuardian = async (newGuardian, guardianToChange) => {
    try {
      const wallet = searchParam.get("wallet");

      if (!wallet) return;

      const walletAddress = wallet.split(":")[1];
      const chain = wallet.split(":")[0];

      const currentConfig = ChainConfig.find(
        (config) => config.chainId.toString() === chain
      );

      if (!currentConfig) return;

      const KryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        signer
      );

      const unsignedTx =
        await KryptonContract.populateTransaction.transferGuardianship(
          guardianToChange,
          newGuardian
        );

      const tx = {
        to: walletAddress,
        data: unsignedTx.data,
        gasLimit: 10000000,
      };

      const txid = await signer.sendTransaction(tx);

      toast.success("Successfully Added Guardian Request");

      return txid;
    } catch (err) {
      toast.error("Error Adding Guardian Request");
      return false;
    }
  };

  const initiateRecoveryUnsigned = async (newOwner) => {
    try {
      const wallet = searchParam.get("wallet");

      if (!wallet) return;

      const walletAddress = wallet.split(":")[1];
      const chain = wallet.split(":")[0];

      const currentConfig = ChainConfig.find(
        (config) => config.chainId.toString() === chain
      );

      if (!currentConfig) return;

      const KryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        signer
      );

      const unsignedTx =
        await KryptonContract.populateTransaction.initiateRecovery(
          newOwner,
          "0xa15569dd8f8324dbeabf8073fdec36d4b754f53ce5901e283c6de79af177dc94557fa3c9922cd7af2a96ca94402d35c39f266925ee6407aeb32b31d76978d4ba1c"
        );

      const tx = {
        to: walletAddress,
        data: unsignedTx.data,
        gasLimit: 10000000,
      };

      const txid = await signer.sendTransaction(tx);

      toast.success("Sucessfully Initiated Recovery Request");

      return txid;
    } catch (err) {
      toast.error("Error Initiating Recovery Request");
      return false;
    }
  };

  const supportRecovery = async (newOwner) => {
    try {
      const wallet = searchParam.get("wallet");

      if (!wallet) return;

      const walletAddress = wallet.split(":")[1];
      const chain = wallet.split(":")[0];

      const currentConfig = ChainConfig.find(
        (config) => config.chainId.toString() === chain
      );

      if (!currentConfig) return;

      const KryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        signer
      );

      const unsignedTx =
        await KryptonContract.populateTransaction.supportRecovery(newOwner);

      const tx = {
        to: walletAddress,
        data: unsignedTx.data,
        gasLimit: 10000000,
      };

      const txid = await signer.sendTransaction(tx);

      toast.success("Sucessfully Supported Recovery Request");

      return txid;
    } catch (err) {
      toast.error("Error Supporting Recovery Request");
      return false;
    }
  };

  return {
    transferGuardian,
    initiateRecoveryUnsigned,
    supportRecovery,
  };
}

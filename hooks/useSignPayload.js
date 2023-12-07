"use client";

import { ChainConfig } from "@/lib/chainConfig";
import {
  closeMessageDrawer,
  setSignature,
} from "@/redux/slice/sigManagerSlice";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { keccak256 } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import Web3 from "web3";
import useReadContract from "./useReadContract";
import { ethers } from "ethers";
import Krypton from "@/lib/contracts/Krypton";
import { useEthersSigner } from "@/wagmi/EthersSigner";
import { useRouter } from "next/navigation";
import { configureAbly } from "@ably-labs/react-hooks";

export default function useSignPayload() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { getTimeBasedMsg, getMessageHash } = useReadContract();
  const signer = useEthersSigner();
  const router = useRouter();

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

  const signInitateMessage = async (id, walletAddress, chainId) => {
    try {
      const KryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        signer
      );

      const message = await KryptonContract.getTimeBasedMsg();
      const messageHash = await KryptonContract.getMessageHash(message);

      const inputs = Array.isArray(id) ? id : [id];
      const hash = inputs.reduce((acc, curr) => acc + curr, "");

      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chainId
      );

      if (!currentConfig) {
        return;
      }

      const web3 = new Web3(new Web3.providers.HttpProvider(currentConfig.rpc));

      web3.eth.accounts.wallet.add(keccak256(Buffer.from(hash)));
      const account = privateKeyToAccount(keccak256(Buffer.from(hash)));

      const signature = await web3.eth.sign(messageHash, account.address);

      dispatch(setSignature(signature.signature));
    } catch (e) {
      console.log(e);
    }
  };

  const signRecoveryMessage = async (id) => {
    const message = searchParams.get("message");

    const uid = message.split(":")[0];
    const chainId = message.split(":")[1];
    const walletAddress = message.split(":")[2];
    const payload = message.split(":")[3];

    const inputs = Array.isArray(id) ? id : [id];
    const hash = inputs.reduce((acc, curr) => acc + curr, "");

    const currentConfig = ChainConfig.find(
      (c) => c.chainId.toString() === chainId
    );

    if (!currentConfig) {
      return;
    }

    const web3 = new Web3(new Web3.providers.HttpProvider(currentConfig.rpc));

    web3.eth.accounts.wallet.add(keccak256(Buffer.from(hash)));
    const account = privateKeyToAccount(keccak256(Buffer.from(hash)));

    const signature = await web3.eth.sign(payload, account.address);

    console.log(signature);

    dispatch(setSignature(signature.signature));

    dispatch(closeMessageDrawer());

    const ably = configureAbly({
      authUrl: `https://eminence.dotcombackend.me/api/ably/auth?id=${account.address}`,
    });

    let channel = ably.channels.get(
      `${uid}:${chainId}:${walletAddress}:${payload}`
    );

    channel.publish("signature", signature.signature);

    router.push("/login");
  };

  return { signMessage, signInitateMessage, signRecoveryMessage };
}

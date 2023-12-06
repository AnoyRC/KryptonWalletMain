"use client";

import { ChainConfig } from "@/lib/chainConfig";
import { ethers } from "ethers";
import { bundlerActions, signUserOperationHashWithECDSA } from "permissionless";
import { useSelector } from "react-redux";
import { createClient, createPublicClient, http } from "viem";
import { useAccount, useNetwork, useWalletClient } from "wagmi";
import {
  pimlicoBundlerActions,
  pimlicoPaymasterActions,
} from "permissionless/actions/pimlico";
import toast from "react-hot-toast";
import useDeployKrypton from "./useDeployKrypton";
import { useEthersSigner } from "@/wagmi/EthersSigner";
import Krypton from "@/lib/contracts/Krypton";
import useReadContract from "./useReadContract";

export default function useKrypton() {
  const { chain: currentChain } = useNetwork();
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const { address } = useAccount();
  const signer = useEthersSigner();
  const { checkWalletCode } = useDeployKrypton();
  const { getTwoFactorCooldown, getRecentTwoFactor } = useReadContract();

  const executeTransaction = async (
    walletAddress,
    chain,
    fnCallData,
    successMessage = "Transaction executed successfully"
  ) => {
    try {
      const ENTRY_POINT_ADDRESS = process.env.NEXT_PUBLIC_ENTRY_POINT_ADDRESS;
      const apiKey = process.env.NEXT_PUBLIC_PIMLICO_APIKEY;

      let chainName = "";

      if (chain === "80001") {
        chainName = "mumbai";
      }

      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chain
      );

      if (!currentConfig) {
        toast.error("Chain not supported");
        return false;
      }

      const walletCode = await checkWalletCode(walletAddress);

      if (!walletCode) {
        toast.error("Wallet not deployed");
        return false;
      }

      const publicClient = createPublicClient({
        transport: http(currentConfig.rpc),
        chain: currentChain,
      });

      const bundlerClient = createClient({
        transport: http(
          `https://api.pimlico.io/v1/${chainName}/rpc?apikey=${apiKey}`
        ),
        chain: currentChain,
      })
        .extend(bundlerActions)
        .extend(pimlicoBundlerActions);

      const paymasterClient = createClient({
        // ⚠️ using v2 of the API ⚠️
        transport: http(
          `https://api.pimlico.io/v2/${chainName}/rpc?apikey=${apiKey}`
        ),
        chain: currentChain,
      }).extend(pimlicoPaymasterActions);

      const initCode = "0x";

      const callData = fnCallData;

      const nonce = await publicClient.readContract({
        address: walletAddress,
        abi: Krypton.abi,
        functionName: "getNonce",
      });

      const gasPrice = await bundlerClient.getUserOperationGasPrice();

      const userOperation = {
        sender: walletAddress,
        nonce: nonce,
        callData,
        initCode,
        maxFeePerGas: gasPrice.fast.maxFeePerGas,
        maxPriorityFeePerGas: gasPrice.fast.maxPriorityFeePerGas,
        // dummy signature, needs to be there so the SimpleAccount doesn't immediately revert because of invalid signature length
        signature:
          "0xa15569dd8f8324dbeabf8073fdec36d4b754f53ce5901e283c6de79af177dc94557fa3c9922cd7af2a96ca94402d35c39f266925ee6407aeb32b31d76978d4ba1c",
      };

      const sponsorUserOperationResult =
        await paymasterClient.sponsorUserOperation({
          userOperation,
          entryPoint: ENTRY_POINT_ADDRESS,
        });

      const sponsoredUserOperation = {
        ...userOperation,
        preVerificationGas: sponsorUserOperationResult.preVerificationGas,
        verificationGasLimit: sponsorUserOperationResult.verificationGasLimit,
        callGasLimit: sponsorUserOperationResult.callGasLimit,
        paymasterAndData: sponsorUserOperationResult.paymasterAndData,
      };

      console.log(
        "Received paymaster sponsor result:",
        sponsorUserOperationResult
      );

      const signature = await signUserOperationHashWithECDSA({
        client: walletClient,
        account: address,
        userOperation: sponsoredUserOperation,
        chainId: currentChain.id,
        entryPoint: ENTRY_POINT_ADDRESS,
      });
      sponsoredUserOperation.signature = signature;

      console.log("Generated signature:", signature);

      const userOperationHash = await bundlerClient.sendUserOperation({
        userOperation: sponsoredUserOperation,
        entryPoint: ENTRY_POINT_ADDRESS,
      });

      console.log("Received User Operation hash:", userOperationHash);

      // let's also wait for the userOperation to be included, by continually querying for the receipts
      console.log("Querying for receipts...");
      const receipt = await bundlerClient.waitForUserOperationReceipt({
        hash: userOperationHash,
      });
      const txHash = receipt.receipt.transactionHash;
      console.log("User Operation included in transaction", txHash);

      toast.success(successMessage);

      await getTwoFactorCooldown();
      await getRecentTwoFactor();

      return true;
    } catch (e) {
      console.log(e);
      toast.error("Error executing transaction");
      return false;
    }
  };

  const prepareEnableTwoFactorAuth = async (
    walletAddress,
    twoFactorAddress
  ) => {
    const KryptonContract = new ethers.Contract(
      walletAddress,
      Krypton.abi,
      signer
    );

    const functionCallData = KryptonContract.interface.encodeFunctionData(
      "enableTwoFactorAuth",
      [twoFactorAddress]
    );

    return functionCallData;
  };

  const prepareTransaction = async (fnName, fnArgs = []) => {
    const KryptonContract = new ethers.Contract(address, Krypton.abi, signer);

    const functionCallData = KryptonContract.interface.encodeFunctionData(
      fnName,
      fnArgs
    );

    return functionCallData;
  };

  return {
    executeTransaction,
    prepareEnableTwoFactorAuth,
    prepareTransaction,
  };
}

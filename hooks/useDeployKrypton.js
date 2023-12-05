"use client";

import { ChainConfig } from "@/lib/chainConfig";
import KryptonProxyFactory from "@/lib/contracts/KryptonProxyFactory";
import { useEthersSigner } from "@/wagmi/EthersSigner";
import { ethers } from "ethers";
import {
  bundlerActions,
  getSenderAddress,
  signUserOperationHashWithECDSA,
} from "permissionless";
import { useSelector } from "react-redux";
import { concat, createClient, createPublicClient, http } from "viem";
import { useAccount, useNetwork, useWalletClient } from "wagmi";
import {
  pimlicoBundlerActions,
  pimlicoPaymasterActions,
} from "permissionless/actions/pimlico";
import toast from "react-hot-toast";
import { useEthersProvider } from "@/wagmi/EthersProvider";

export default function useDeployKrypton() {
  const signer = useEthersSigner();
  const chain = useSelector((state) => state.setup.chain);
  const { chain: currentChain } = useNetwork();
  const { address } = useAccount();
  const guardians = useSelector((state) => state.setup.guardians);
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const provider = useEthersProvider();

  const createKrypton = async () => {
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
        toast.error("Network not supported");
        return false;
      }

      const factory = new ethers.Contract(
        currentConfig.factory,
        KryptonProxyFactory.abi,
        signer
      );

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

      const guardiansAddresses = guardians.map((g) => g.address);

      const salt = Math.floor(Math.random() * 10000);

      const initCode = concat([
        factory.address,
        factory.interface.encodeFunctionData("createAccount", [
          address,
          guardiansAddresses,
          guardiansAddresses.length,
          salt,
        ]),
      ]);

      const senderAddress = await getSenderAddress(publicClient, {
        initCode,
        entryPoint: ENTRY_POINT_ADDRESS,
      });

      const callData = "0x";

      const gasPrice = await bundlerClient.getUserOperationGasPrice();

      const userOperation = {
        sender: senderAddress,
        nonce: 0n,
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

      toast.success("Krypton deployed successfully");

      return senderAddress;
    } catch (e) {
      console.log(e);
      toast.error("Error deploying Krypton");
      return false;
    }
  };

  const checkWalletCode = async (address) => {
    const walletCode = await provider.getCode(address);
    const walletExists = walletCode !== "0x";
    return walletExists;
  };

  return {
    createKrypton,
    checkWalletCode,
  };
}

"use client";

import { ChainConfig } from "@/lib/chainConfig";
import Krypton from "@/lib/contracts/Krypton";
import { setRecentTwoFactor } from "@/redux/slice/walletSlice";
import { ethers } from "ethers";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

export default function useReadContract() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const getThreshold = async () => {
    try {
      const walletAddress = searchParams.get("wallet").split(":")[1];
      const chain = searchParams.get("wallet").split(":")[0];

      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chain
      );

      if (!currentConfig) {
        return 0;
      }

      const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);

      const kryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        provider
      );

      const threshold = await kryptonContract.threshold();

      return threshold;
    } catch (e) {
      console.log(e);
      return 0;
    }
  };

  const getTwoFactorCooldown = async () => {
    try {
      const walletAddress = searchParams.get("wallet").split(":")[1];
      const chain = searchParams.get("wallet").split(":")[0];

      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chain
      );

      if (!currentConfig) {
        return 0;
      }

      const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);

      const kryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        provider
      );

      const cooldown = await kryptonContract.twoFactorCooldown();

      return cooldown;
    } catch (e) {
      console.log(e);
      return 0;
    }
  };

  const getAllGuardians = async () => {
    try {
      const walletAddress = searchParams.get("wallet").split(":")[1];
      const chain = searchParams.get("wallet").split(":")[0];

      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chain
      );

      if (!currentConfig) {
        return null;
      }

      const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);

      const kryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        provider
      );

      const guardians = await kryptonContract.getAllGuardians();

      return guardians;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const getTransferRequests = async (address) => {
    try {
      const walletAddress = searchParams.get("wallet").split(":")[1];
      const chain = searchParams.get("wallet").split(":")[0];

      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chain
      );

      if (!currentConfig) {
        return null;
      }

      const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);

      const kryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        provider
      );

      const transferRequests = await kryptonContract.guardianChangeRequest(
        address
      );

      return transferRequests;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const checkRecovery = async () => {
    try {
      const walletAddress = searchParams.get("wallet").split(":")[1];
      const chain = searchParams.get("wallet").split(":")[0];

      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chain
      );

      if (!currentConfig) {
        return false;
      }

      const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);

      const kryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        provider
      );

      const recovery = await kryptonContract.inRecovery();

      return recovery;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const getRecoveryRequests = async (address) => {
    try {
      const walletAddress = searchParams.get("wallet").split(":")[1];
      const chain = searchParams.get("wallet").split(":")[0];

      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chain
      );

      if (!currentConfig) {
        return null;
      }

      const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);

      const kryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        provider
      );

      const recoveryRequests = await kryptonContract.guardianRecoveryRequest(
        address
      );

      return recoveryRequests;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const getRecoveryRound = async () => {
    try {
      const walletAddress = searchParams.get("wallet").split(":")[1];
      const chain = searchParams.get("wallet").split(":")[0];

      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chain
      );

      if (!currentConfig) {
        return null;
      }

      const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);

      const kryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        provider
      );

      const recoveryRound = await kryptonContract.currRecoveryRound();

      return recoveryRound;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const checkTransfer = async () => {
    try {
      const walletAddress = searchParams.get("wallet").split(":")[1];
      const chain = searchParams.get("wallet").split(":")[0];

      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chain
      );

      if (!currentConfig) {
        return false;
      }

      const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);

      const kryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        provider
      );

      const transfer = await kryptonContract.inGuardianRequest();

      return transfer;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const isOwner = async (address) => {
    try {
      const walletAddress = searchParams.get("wallet").split(":")[1];
      const chain = searchParams.get("wallet").split(":")[0];

      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chain
      );

      if (!currentConfig) {
        return false;
      }

      const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);

      const kryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        provider
      );

      const owner = await kryptonContract.owner();

      return owner === address;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const isGuardian = async (address) => {
    try {
      const walletAddress = searchParams.get("wallet").split(":")[1];
      const chain = searchParams.get("wallet").split(":")[0];
      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chain
      );

      if (!currentConfig) {
        return false;
      }

      const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);
      const kryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        provider
      );

      const isGdn = await kryptonContract.isGuardian(address);
      return isGdn;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const is2FA = async () => {
    try {
      const walletAddress = searchParams.get("wallet").split(":")[1];
      const chain = searchParams.get("wallet").split(":")[0];
      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chain
      );

      if (!currentConfig) {
        return false;
      }

      const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);
      const kryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        provider
      );

      const is2FA = await kryptonContract.isTwoFactorEnabled();
      return is2FA;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const getRecentTwoFactor = async () => {
    try {
      const walletAddress = searchParams.get("wallet").split(":")[1];
      const chain = searchParams.get("wallet").split(":")[0];
      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chain
      );

      if (!currentConfig) {
        return 0;
      }

      const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);
      const kryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        provider
      );

      const recentTwoFactor = await kryptonContract.recentTwoFactor();

      dispatch(setRecentTwoFactor(Number(recentTwoFactor)));
    } catch (e) {
      console.log(e);
      dispatch(setRecentTwoFactor(0));
    }
  };

  const getTimeBasedMsg = async () => {
    try {
      const walletAddress = searchParams.get("wallet").split(":")[1];
      const chain = searchParams.get("wallet").split(":")[0];
      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chain
      );

      if (!currentConfig) {
        return 0;
      }

      const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);
      const kryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        provider
      );

      const timeBasedMsg = await kryptonContract.getTimeBasedMsg();

      return timeBasedMsg;
    } catch (e) {
      console.log(e);
      return 0;
    }
  };

  const getMessageHash = async (msg) => {
    try {
      const walletAddress = searchParams.get("wallet").split(":")[1];
      const chain = searchParams.get("wallet").split(":")[0];
      const currentConfig = ChainConfig.find(
        (c) => c.chainId.toString() === chain
      );

      if (!currentConfig) {
        return "";
      }

      const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);
      const kryptonContract = new ethers.Contract(
        walletAddress,
        Krypton.abi,
        provider
      );

      const msgHash = await kryptonContract.getMessageHash(msg);

      return msgHash;
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  return {
    getThreshold,
    getTwoFactorCooldown,
    getAllGuardians,
    getTransferRequests,
    getRecoveryRequests,
    checkRecovery,
    getRecoveryRound,
    checkTransfer,
    isOwner,
    isGuardian,
    is2FA,
    getRecentTwoFactor,
    getTimeBasedMsg,
    getMessageHash,
  };
}

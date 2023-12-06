"use client";

import useReadContract from "@/hooks/useReadContract";
import Krypton from "@/lib/contracts/Krypton";
import {
  setIs2FA,
  setIsGuardian,
  setIsOwner,
  setRecentTwoFactor,
  setTwoFactorCooldown,
  setWalletStatus,
} from "@/redux/slice/walletSlice";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAccount, useContractEvent } from "wagmi";

const StatusProvider = ({ children }) => {
  const searchParams = useSearchParams();
  const {
    checkRecovery,
    checkTransfer,
    isOwner,
    isGuardian,
    is2FA,
    getTwoFactorCooldown,
    getRecentTwoFactor,
  } = useReadContract();
  const dispatch = useDispatch();
  const { address } = useAccount();

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "GuardianshipTransferExecuted",
    listener(log) {
      setStatus();
      checkGuardian();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "GuardianAdded",
    listener(log) {
      setStatus();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "GuardianshipTransferInitiated",
    listener(log) {
      setStatus();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "GuardianshipTransferCancelled",
    listener(log) {
      setStatus();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "RecoveryInitiated",
    listener(log) {
      setStatus();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "RecoverySupported",
    listener(log) {
      setStatus();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "RecoveryCancelled",
    listener(log) {
      setStatus();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "RecoveryExecuted",
    listener(log) {
      setStatus();
      checkOwner();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "TwoFactorEnabled",
    listener(log) {
      check2FA();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "TwoFactorCooldownChanged",
    listener(log) {
      handleTwoFactorCooldown();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useEffect(() => {
    if (searchParams.get("wallet")) {
      setStatus();
    }
  }, []);

  const setStatus = async () => {
    const recovery = await checkRecovery();
    if (recovery) {
      dispatch(setWalletStatus("Recovery"));
      return;
    }

    const transfer = await checkTransfer();
    if (transfer) {
      dispatch(setWalletStatus("Transfer"));
      return;
    }

    dispatch(setWalletStatus("Good"));
  };

  const checkOwner = async () => {
    const owner = await isOwner(address);

    dispatch(setIsOwner(owner));
  };

  const checkGuardian = async () => {
    const guardian = await isGuardian(address);

    dispatch(setIsGuardian(guardian));
  };

  const check2FA = async () => {
    const twoFA = await is2FA();

    dispatch(setIs2FA(twoFA));
  };

  const handleTwoFactorCooldown = async () => {
    const cooldown = await getTwoFactorCooldown();

    dispatch(setTwoFactorCooldown(Number(cooldown)));
  };

  useEffect(() => {
    if (searchParams.get("wallet")) {
      checkOwner();
      checkGuardian();
      check2FA();
      handleTwoFactorCooldown();
      getRecentTwoFactor();
    }
  }, [address]);

  return <>{children}</>;
};

export default StatusProvider;

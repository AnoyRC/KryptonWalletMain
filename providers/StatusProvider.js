"use client";

import useReadContract from "@/hooks/useReadContract";
import Krypton from "@/lib/contracts/Krypton";
import {
  setIsGuardian,
  setIsOwner,
  setWalletStatus,
} from "@/redux/slice/walletSlice";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAccount, useContractEvent } from "wagmi";

const StatusProvider = ({ children }) => {
  const searchParams = useSearchParams();
  const { checkRecovery, checkTransfer, isOwner, isGuardian } =
    useReadContract();
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

  useEffect(() => {
    if (searchParams.get("wallet")) {
      checkOwner();
      checkGuardian();
    }
  }, [address]);

  return <>{children}</>;
};

export default StatusProvider;

"use client";
import GuardianRequests from "@/components/layout/main/dashboard/requests/GuardianRequests";
import RecoveryRequests from "@/components/layout/main/dashboard/requests/RecoveryRequests";
import useReadContract from "@/hooks/useReadContract";
import Krypton from "@/lib/contracts/Krypton";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useContractEvent } from "wagmi";

export default function Requests() {
  const [AllGuardianRequests, setAllGuardianRequests] = useState([]);
  const {
    getAllGuardians,
    getTransferRequests,
    checkTransfer,
    checkRecovery,
    getRecoveryRequests,
    getRecoveryRound,
  } = useReadContract();
  const [AllRecoveryRequests, setAllRecoveryRequests] = useState([]);
  const searchParams = useSearchParams();

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "GuardianshipTransferExecuted",
    listener(log) {
      getGuardianRequests();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "GuardianAdded",
    listener(log) {
      getGuardianRequests();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "GuardianshipTransferInitiated",
    listener(log) {
      getGuardianRequests();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "GuardianshipTransferCancelled",
    listener(log) {
      getGuardianRequests();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "RecoveryInitiated",
    listener(log) {
      getAllRecoveryRequests();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "RecoverySupported",
    listener(log) {
      getAllRecoveryRequests();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "RecoveryCancelled",
    listener(log) {
      getAllRecoveryRequests();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "RecoveryExecuted",
    listener(log) {
      getAllRecoveryRequests();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  const getGuardianRequests = async () => {
    const inRecovery = await checkRecovery();
    if (inRecovery) {
      setAllGuardianRequests([]);
      return;
    }

    const inTranfer = await checkTransfer();
    if (!inTranfer) {
      setAllGuardianRequests([]);
      return;
    }

    const guardians = await getAllGuardians();

    const guardianAddresses = guardians.map(
      (guardian) =>
        guardian.toString().substring(0, 2) +
        guardian
          .toString()
          .substring(
            guardian.toString().length - 40,
            guardian.toString().length
          )
    );

    const GuardianRequests = await Promise.all(
      guardianAddresses.map(async (guardian) => {
        const requests = await getTransferRequests(guardian);
        const combinedRequests = {
          from: guardian,
          requests: requests,
        };
        return combinedRequests;
      })
    );

    const GuardianRequestsFiltered = GuardianRequests.filter((request) => {
      if (
        request.requests.proposedGuardian ===
          "0x0000000000000000000000000000000000000000" ||
        request.requests.guardianToChange ===
          "0x0000000000000000000000000000000000000000"
      ) {
        return false;
      }

      if (request.requests.isUsed === true) {
        return false;
      }

      return true;
    });

    setAllGuardianRequests(GuardianRequestsFiltered);
  };

  const getAllRecoveryRequests = async () => {
    const inRecovery = await checkRecovery();
    if (!inRecovery) {
      setAllRecoveryRequests([]);
      return;
    }

    const guardians = await getAllGuardians();

    const guardianAddresses = guardians.map(
      (guardian) =>
        guardian.toString().substring(0, 2) +
        guardian
          .toString()
          .substring(
            guardian.toString().length - 40,
            guardian.toString().length
          )
    );

    const RecoveryRequests = await Promise.all(
      guardianAddresses.map(async (guardian) => {
        const requests = await getRecoveryRequests(guardian);
        const combinedRequests = {
          from: guardian,
          requests: requests,
        };
        return combinedRequests;
      })
    );

    const round = await getRecoveryRound();

    const filteredRecoveryRequests = RecoveryRequests.filter((request) => {
      if (
        request.requests.proposedOwner ===
        "0x0000000000000000000000000000000000000000"
      )
        return false;

      if (request.requests.isUsed === true) {
        return false;
      }

      if (request.requests.recoveryRound.toString() !== round.toString())
        return false;

      return true;
    });

    setAllRecoveryRequests(filteredRecoveryRequests);
  };

  useEffect(() => {
    getGuardianRequests();
    getAllRecoveryRequests();
  }, []);

  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mt-4 grid h-20 place-items-center mx-0 my-0"
        >
          <h1 className="font-uni text-white text-3xl font-bold">Requests</h1>
        </CardHeader>

        <CardBody className="flex flex-col gap-4 p-0">
          {AllRecoveryRequests.map((request, index) => (
            <RecoveryRequests
              key={index}
              name={null}
              address={request.from}
              proposedOwner={request.requests.proposedOwner}
            />
          ))}

          {(!AllRecoveryRequests || AllRecoveryRequests.length === 0) && (
            <div className="flex items-center justify-center gap-3">
              <XCircleIcon className="w-6 h-6 text-black" />
              No Recovery Requests
            </div>
          )}

          <div className="flex items-center justify-center text-center gap-3">
            <div className="w-[20%] bg-black h-[1px]" /> Guardian Requests
            <div className="w-[20%] bg-black h-[1px]" />
          </div>

          {AllGuardianRequests.map((request, index) => (
            <GuardianRequests
              key={index}
              name={null}
              from={request.from}
              address={request.requests.guardianToChange}
              proposedGuardian={request.requests.proposedGuardian}
            />
          ))}
        </CardBody>

        {(!AllGuardianRequests || AllGuardianRequests.length === 0) && (
          <div className="flex items-center justify-center gap-3">
            <XCircleIcon className="w-6 h-6 text-black" />
            No Guardian Requests
          </div>
        )}
      </Card>
    </div>
  );
}

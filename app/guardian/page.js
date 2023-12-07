"use client";
import ExecuteRecovery from "@/components/layout/guardian/ExecuteRecovery";
import GuardianTransfer from "@/components/layout/guardian/GuardianTransfer";
import InitiateRecovery from "@/components/layout/guardian/InitiateRecovery";
import StatusCard from "@/components/layout/guardian/StatusCard";
import useReadContract from "@/hooks/useReadContract";
import Krypton from "@/lib/contracts/Krypton";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Alert, Button, Card, Stepper, Step } from "@material-tailwind/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useContractEvent } from "wagmi";

export default function Guardian() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const twoFactor = useSelector((state) => state.wallet.is2FA);
  const {
    getRecoveryRequests,
    getAllGuardians,
    getRecoveryRound,
    checkRecovery,
  } = useReadContract();
  const [AllRecoveryRequests, setAllRecoveryRequests] = useState([]);
  const searchParams = useSearchParams();
  const [link, setLink] = useState("");

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
    getAllRecoveryRequests();
  }, []);

  const sampleLink =
    "https://app.spline.design/file/e2cc7718-0c00-4034-b04d-c0c3307f01a3";
  const status = useSelector((state) => state.wallet.status);

  const demoProcess = () => {
    setIsExecuting(true);

    setTimeout(() => {
      setActiveStep(1);
    }, 1000);
    setTimeout(() => {
      setActiveStep(2);
    }, 3000);
    setTimeout(() => {
      setIsExecuting(false);
      setActiveStep(0);
    }, 5000);
  };

  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <StatusCard status={status} />

        {status === "Good" && <GuardianTransfer />}

        {status !== "Recovery" && !twoFactor && <InitiateRecovery />}

        {status === "Recovery" && !isExecuting && (
          <ExecuteRecovery
            RecoveryRequestsData={AllRecoveryRequests}
            setActiveStep={setActiveStep}
            setIsExecuting={setIsExecuting}
            setLink={setLink}
          />
        )}

        {isExecuting && (
          <div className="w-full px-2 flex flex-col items-center justify-center mt-3 gap-2">
            {activeStep !== 0 && twoFactor && (
              <>
                <Alert
                  className="bg-black/80 -mt-3 mb-2"
                  icon={<InformationCircleIcon className="h-6 w-6 mt-0.5" />}
                >
                  Copy Secret Link and send it to the Owner to approve the
                  transaction.
                  <span className="font-bold"> DO NOT SHARE THIS LINK.</span>
                </Alert>

                <Button
                  className="-mt-2 bg-black/80 w-full mb-2"
                  size="lg"
                  onClick={() => navigator.clipboard.writeText(link)}
                >
                  Copy Secret Link
                </Button>
              </>
            )}

            <Stepper activeStep={activeStep} className="w-full">
              <Step className="h-4 w-4" onClick={() => setActiveStep(0)} />
              <Step className="h-4 w-4" onClick={() => setActiveStep(1)} />
              <Step className="h-4 w-4" onClick={() => setActiveStep(2)} />
            </Stepper>

            {activeStep === 0 && (
              <p className="flex gap-2">
                Generating Link
                <Image
                  src="/images/onboard/setup/loading.svg"
                  alt="animation"
                  width={15}
                  height={15}
                  className="animate-spin"
                />
              </p>
            )}

            {activeStep === 1 && (
              <p className="flex gap-2">
                {twoFactor
                  ? "Waiting for the Owner to Approve"
                  : "2FA Disabled, Skipping"}

                <Image
                  src="/images/onboard/setup/loading.svg"
                  alt="animation"
                  width={15}
                  height={15}
                  className="animate-spin"
                />
              </p>
            )}

            {activeStep === 2 && (
              <p className="flex gap-2">
                Executing
                <Image
                  src="/images/onboard/setup/loading.svg"
                  alt="animation"
                  width={15}
                  height={15}
                  className="animate-spin"
                />
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

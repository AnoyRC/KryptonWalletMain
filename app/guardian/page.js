"use client";
import ExecuteRecovery from "@/components/layout/guardian/ExecuteRecovery";
import GuardianTransfer from "@/components/layout/guardian/GuardianTransfer";
import InitiateRecovery from "@/components/layout/guardian/InitiateRecovery";
import StatusCard from "@/components/layout/guardian/StatusCard";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Alert, Button, Card, Stepper, Step } from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

const RecoveryRequestsData = [
  {
    name: "John Doe",
    address: "0xDb1d125C9f7faE45d7CeE470d048670a85270f4D",
    proposedOwner: "0x123456789123456789123456789123456789",
  },
  {
    name: "John Doe",
    address: "0x01545d12C90464B7075d58952Cad5923a5be0860",
    proposedOwner: "0x123456789123456789123456789123456789",
  },
  {
    name: "John Doe",
    address: "0x3C700d88616C9e186aed7dd59B2e7f60819bf863",
    proposedOwner: "0x123456789123456789123456789123456789",
  },
];

export default function Guardian() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const twoFactor = useSelector((state) => state.wallet.is2FA);

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
            RecoveryRequestsData={RecoveryRequestsData}
            executeFunction={demoProcess}
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
                  onClick={() => navigator.clipboard.writeText(sampleLink)}
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

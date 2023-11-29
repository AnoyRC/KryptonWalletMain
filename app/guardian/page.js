"use client";
import RecoveryRequests from "@/components/layout/main/dashboard/requests/RecoveryRequests";
import { CheckIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  Alert,
  Button,
  Card,
  CardHeader,
  Input,
  List,
  ListItem,
  Stepper,
  Step,
} from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";

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
  const [selected, setSelected] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const threshold = 3;
  const twoFactor = true;
  const setSelectedItem = (address) => {
    if (selected.includes(address)) {
      setSelected(selected.filter((item) => item !== address));
    } else {
      setSelected([...selected, address]);
    }
  };
  const sampleLink =
    "https://app.spline.design/file/e2cc7718-0c00-4034-b04d-c0c3307f01a3";
  const status = "Good";

  const demoProcess = () => {
    setIsExecuting(true);

    setTimeout(() => {
      setActiveStep(1);
    }, 1000);
    setTimeout(() => {
      setActiveStep(2);
    }, 2000);
    setTimeout(() => {
      setIsExecuting(false);
      setActiveStep(0);
    }, 3000);
  };

  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        {status === "Good" && (
          <CardHeader className="mt-4 flex flex-col p-3 mx-0 my-0 bg-green-500/30 border-green-500 border-[2px]">
            <h1 className="font-uni text-black/70 text-xl font-extrabold">
              Status
            </h1>
            <h1 className="font-uni text-black/70 text-7xl font-extrabold">
              Good
            </h1>
          </CardHeader>
        )}
        {status === "Transfer" && (
          <CardHeader className="mt-4 flex flex-col p-3 mx-0 my-0 bg-yellow-500/30 border-yellow-500 border-[2px]">
            <h1 className="font-uni text-black/70 text-xl font-extrabold">
              Status
            </h1>
            <h1 className="font-uni text-black/70 text-7xl font-extrabold">
              In Transfer
            </h1>
          </CardHeader>
        )}
        {status === "Recovery" && (
          <CardHeader className="mt-4 flex flex-col p-3 mx-0 my-0 bg-red-500/30 border-red-500 border-[2px]">
            <h1 className="font-uni text-black/70 text-xl font-extrabold">
              Status
            </h1>
            <h1 className="font-uni text-black/70 text-7xl font-extrabold">
              In Recovery
            </h1>
          </CardHeader>
        )}

        {status === "Good" && (
          <>
            <h6 className="font-uni text-lg font-bold">Guardian Transfer</h6>
            <Input
              size="lg"
              placeholder="new-guardian-address"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Button className="-mt-2 bg-black/80">Send Transfer Request</Button>

            <Alert
              className="bg-black/80 -mt-1"
              icon={<InformationCircleIcon className="h-6 w-6 mt-0.5" />}
            >
              Initiate a transfer request to a new guardian. This will require
              approval from the owner of the wallet.
            </Alert>
          </>
        )}

        {status !== "Recovery" && (
          <>
            <h6 className="font-uni text-lg font-bold">Proposed Owner</h6>
            <Input
              size="lg"
              placeholder="new-owner-address"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Button className="-mt-2 bg-black/80">Initiate Recovery</Button>
            <Alert
              className="bg-black/80 -mt-1"
              icon={<InformationCircleIcon className="h-6 w-6 mt-0.5" />}
            >
              Initiate a recovery request to a new owner. This means that the
              current owner has not enabled 2FA.
            </Alert>
          </>
        )}

        {status === "Recovery" && !isExecuting && (
          <>
            <div className="flex items-center justify-between -my-1 -mb-3 px-2">
              <h6 className="font-uni text-lg font-bold">Select Requests</h6>
              <p>
                {selected.length} out of {threshold} selected
              </p>
            </div>

            <List className="p-0">
              {RecoveryRequestsData.map((data, index) => (
                <ListItem
                  key={index}
                  className="flex items-center w-full p-2 justify-between gap-2 relative"
                  onClick={() => setSelectedItem(data.address)}
                  selected={selected.includes(data.address)}
                  style={{
                    backgroundColor: selected.includes(data.address)
                      ? "rgba(0, 255, 255, 0.1)"
                      : "transparent",
                    borderRadius: "0.5rem",
                    border: selected.includes(data.address)
                      ? "1px solid rgba(0, 255, 255, 1)"
                      : "",
                  }}
                >
                  {selected.includes(data.address) && (
                    <div className="absolute top-0 right-0 w-7 h-7 rounded-bl-xl bg-[#00ffff] grid place-items-center z-10">
                      <CheckIcon className="h-4 w-4 ml-0.5 mb-0.5 text-black" />
                    </div>
                  )}

                  <RecoveryRequests
                    name={data.name}
                    address={data.address}
                    proposedOwner={data.proposedOwner}
                  />
                </ListItem>
              ))}
            </List>

            <Button
              className="-mt-2 mx-2 bg-black/80"
              size="lg"
              onClick={demoProcess}
            >
              Execute Recovery
            </Button>
          </>
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

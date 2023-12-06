"use client";
import useReadContract from "@/hooks/useReadContract";
import Krypton from "@/lib/contracts/Krypton";
import useSendTransaction from "@/hooks/useSendTransaction";
import {
  InformationCircleIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  Alert,
  Button,
  Card,
  CardHeader,
  Input,
} from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useContractEvent } from "wagmi";
import toast from "react-hot-toast";

export default function General() {
  const previousName = "Old-Wallet-Name";
  const [threshold, setThreshold] = useState(0);
  const [guardianAddress, setGuardianAddress] = useState("");
  const { getThreshold } = useReadContract();
  const searchParams = useSearchParams();
  const { initiateTransaction } = useSendTransaction();
  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "ThresholdUpdated",
    listener(log) {
      getThreshold().then((res) => {
        setThreshold(Number(res));
      });
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  const addThreshold = () => {
    setThreshold(threshold + 1);
  };

  const substractThreshold = () => {
    setThreshold(threshold - 1);
  };

  useEffect(() => {
    getThreshold().then((res) => {
      setThreshold(Number(res));
    });
  }, []);

  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mt-4 grid h-20 place-items-center mx-0 my-0"
        >
          <h1 className="font-uni text-white text-3xl font-bold">General</h1>
        </CardHeader>

        <h6 className="font-uni text-lg font-bold">Wallet Name</h6>
        <Input
          size="lg"
          placeholder={previousName}
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />

        <Button className="w-full text-white font-bold bg-black/80" size="lg">
          Update
        </Button>

        <div className="flex items-center justify-center text-center gap-3">
          <div className="w-[20%] bg-black h-[1px]" /> Guardian Settings
          <div className="w-[20%] bg-black h-[1px]" />
        </div>

        <h6 className="font-uni text-lg font-bold">Threshold</h6>
        <div className="flex w-full items-center justify-between ">
          <div className="flex items-center gap-5">
            <Button onClick={substractThreshold} className="px-4 bg-black/80">
              <MinusIcon className="w-6 h-6" />
            </Button>
            <p className="font-uni text-lg font-bold">{threshold}</p>
            <Button onClick={addThreshold} className="px-4 bg-black/80">
              <PlusIcon className="w-6 h-6" />
            </Button>
          </div>
          <Button className=" text-white font-bold bg-black/80" size="lg">
            Update
          </Button>
        </div>

        <Alert
          className="bg-black/80"
          icon={<InformationCircleIcon className="h-6 w-6" />}
        >
          <p className="font-uni">
            Threshold is the minimum number of signatures required to approve a
            recovery.
          </p>
        </Alert>

        <h6 className="font-uni text-lg font-bold">Add Guardian</h6>
        <Input
          size="lg"
          placeholder="Guardian Address"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={guardianAddress}
          onChange={(e) => setGuardianAddress(e.target.value)}
        />
        <Button
          className="w-full text-white font-bold bg-black/80"
          size="lg"
          onClick={() => {
            if (
              guardianAddress.length !== 42 ||
              !guardianAddress.startsWith("0x")
            ) {
              toast.error("Invalid address");
              return;
            }

            initiateTransaction(
              "addGuardian",
              [guardianAddress],
              "Guardian added"
            );
          }}
        >
          Add Guardian
        </Button>
      </Card>
    </div>
  );
}

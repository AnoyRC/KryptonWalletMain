"use client";
import GuardianRequests from "@/components/layout/main/dashboard/requests/GuardianRequests";
import RecoveryRequests from "@/components/layout/main/dashboard/requests/RecoveryRequests";
import {
  ArrowUpRightIcon,
  ArrowsRightLeftIcon,
  CheckIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import Image from "next/image";

const AllRecoveryRequests = [
  {
    name: "Anoy",
    address: "0x3C700d88616C9e186aed7dd59B2e7f60819bf863",
    proposedOwner: "0xDb1d125C9f7faE45d7CeE470d048670a85270f4D",
  },
];

const AllGuardianRequests = [
  {
    name: "Anoy",
    address: "0x3C700d88616C9e186aed7dd59B2e7f60819bf863",
    proposedGuardian: "0xDb1d125C9f7faE45d7CeE470d048670a85270f4D",
  },
];

export default function Requests() {
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
              name={request.name}
              address={request.address}
              proposedOwner={request.proposedOwner}
            />
          ))}

          {!AllRecoveryRequests && (
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
              name={request.name}
              address={request.address}
              proposedGuardian={request.proposedGuardian}
            />
          ))}
        </CardBody>

        {!AllGuardianRequests && (
          <div className="flex items-center justify-center gap-3">
            <XCircleIcon className="w-6 h-6 text-black" />
            No Guardian Requests
          </div>
        )}
      </Card>
    </div>
  );
}

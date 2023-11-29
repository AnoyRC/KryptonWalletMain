"use client";
import { Input, Button, Alert } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function GuardianTransfer() {
  return (
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
  );
}

"use client";
import { Input, Button, Alert } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function InitiateRecovery() {
  return (
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
        Initiate a recovery request to a new owner. This means that the current
        owner has not enabled 2FA.
      </Alert>
    </>
  );
}

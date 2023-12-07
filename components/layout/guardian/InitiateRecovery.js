"use client";
import { Input, Button, Alert } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import useReadContract from "@/hooks/useReadContract";
import { useState } from "react";
import toast from "react-hot-toast";
import useGuardian from "@/hooks/useGuardian";

export default function InitiateRecovery() {
  const isGuardian = useSelector((state) => state.wallet.isGuardian);
  const { isGuardian: checkGuardian, isOwner } = useReadContract();
  const [proposedOwner, setProposedOwner] = useState("");
  const { initiateRecoveryUnsigned } = useGuardian();
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
        value={proposedOwner}
        onChange={(e) => setProposedOwner(e.target.value)}
        disabled={!isGuardian}
      />
      <Button
        className="-mt-2 bg-black/80"
        onClick={async () => {
          if (!proposedOwner) {
            toast.error("Please fill all the fields");
          }

          const isProposedOwner = await isOwner(proposedOwner);

          const isNewGuardian = await checkGuardian(proposedOwner);

          if (isProposedOwner || isNewGuardian) {
            toast.error("Cannot transfer ownership to an owner or guardian");
          }

          await initiateRecoveryUnsigned(proposedOwner);
        }}
        disabled={!isGuardian}
      >
        Initiate Recovery
      </Button>
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

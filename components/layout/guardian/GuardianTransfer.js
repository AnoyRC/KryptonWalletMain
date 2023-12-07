"use client";
import { Input, Button, Alert } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEthersSigner } from "@/wagmi/EthersSigner";
import useGuardian from "@/hooks/useGuardian";
import toast from "react-hot-toast";
import useReadContract from "@/hooks/useReadContract";

export default function GuardianTransfer() {
  const [newGuardian, setNewGuardian] = useState("");
  const [guardianToChange, setGuardianToChange] = useState("");
  const isGuardian = useSelector((state) => state.wallet.isGuardian);
  const { transferGuardian } = useGuardian();
  const { isGuardian: checkGuardian, isOwner } = useReadContract();

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
        value={newGuardian}
        onChange={(e) => setNewGuardian(e.target.value)}
        disabled={!isGuardian}
      />

      <Input
        size="lg"
        placeholder="guardian-to-change"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        value={guardianToChange}
        onChange={(e) => setGuardianToChange(e.target.value)}
        disabled={!isGuardian}
      />

      <Button
        className="-mt-2 bg-black/80"
        disabled={!isGuardian}
        onClick={async () => {
          if (!newGuardian || !guardianToChange) {
            toast.error("Please fill all the fields");
          }

          const isProposedOwner = await isOwner(newGuardian);

          const isNewGuardian = await checkGuardian(newGuardian);

          if (isProposedOwner || isNewGuardian) {
            toast.error("Cannot transfer guardianship to an owner or guardian");
          }

          const isGuardian = await checkGuardian(guardianToChange);

          if (!isGuardian) {
            toast.error("Guardian to Change is not a guardian");
          }

          transferGuardian(newGuardian, guardianToChange);
        }}
      >
        Send Transfer Request
      </Button>

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

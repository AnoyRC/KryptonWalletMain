"use client";
import {
  ArrowUpRightIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";

export default function RecoveryRequests({ name, address, proposedOwner }) {
  return (
    <Button
      size="lg"
      variant="outlined"
      className="flex flex-col  justify-between gap-1 capitalize text-lg font-uni"
    >
      <div className="flex items-center gap-3">
        <ArrowUpRightIcon className="h-6 w-6 text-black" />
        {name ? "From " + name : address}
      </div>
      <div className="flex items-center text-sm gap-3">
        <ArrowsRightLeftIcon className="h-6 w-6 text-black" />
        {proposedOwner}
      </div>
    </Button>
  );
}

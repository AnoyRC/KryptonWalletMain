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
      className="flex flex-col w-full justify-between gap-1 capitalize text-lg font-uni"
    >
      <div className="flex items-center gap-3">
        <ArrowUpRightIcon className="h-6 w-6 text-black" />
        {name
          ? "From " + name
          : "From " +
            address.substring(0, 4) +
            "..." +
            address.substring(address.length - 4)}
      </div>
      <div className="flex items-center text-sm gap-3">
        <ArrowsRightLeftIcon className="h-6 w-6 text-black" />
        {proposedOwner}
      </div>
    </Button>
  );
}

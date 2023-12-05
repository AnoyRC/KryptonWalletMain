"use client";

import { MapPinIcon, UserIcon } from "@heroicons/react/24/outline";

export default function GuardianCard({ address, id }) {
  const name = null;
  // Use Dataverse OS

  return (
    <div className="flex flex-row px-6 py-4 items-center border-black border-[1px] rounded-lg text-black font-bold justify-between gap-1 capitalize text-lg font-uni">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <UserIcon className="h-6 w-6 text-black" />
          {name ? name : `Guardian ${id + 1}`}
        </div>
        <div className="flex items-center text-sm gap-3">
          <MapPinIcon className="h-6 w-6 text-black" />
          {address}
        </div>
      </div>
    </div>
  );
}

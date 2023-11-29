"use client";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import Image from "next/image";

export default function TokenButton({
  Name,
  Balance,
  Symbol,
  Icon,
  USDBalance,
}) {
  return (
    <Button
      size="lg"
      variant="outlined"
      className="flex flex-col  gap-3 capitalize text-lg text-left font-uni "
    >
      <div className="flex items-center gap-2">
        <Image
          src={"/images/main/dashboard/tokens/" + Icon + ".svg"}
          width={20}
          height={30}
          alt="logo"
        />
        {Name}
      </div>
      <div className="flex items-end justify-between font-extrabold -mt-2 text-3xl">
        {Balance} {Symbol}
        <div className="flex items-center font-extrabold text-black/70 text-xl">
          <CurrencyDollarIcon className="h-6 w-6 mr-1" />
          {USDBalance}
        </div>
      </div>
    </Button>
  );
}

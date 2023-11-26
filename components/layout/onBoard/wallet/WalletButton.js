"use client";
import { ChipsInId } from "@/components/ui/chainChips";
import { Button } from "@material-tailwind/react";

export default function WalletButton({ address, chain }) {
  return (
    <Button
      size="lg"
      variant="outlined"
      className="flex justify-between items-center gap-3 capitalize text-lg font-uni"
    >
      {address.substring(0, 6) +
        "..." +
        address.substring(address.length - 6, address.length)}

      <ChipsInId chain={chain} />
    </Button>
  );
}

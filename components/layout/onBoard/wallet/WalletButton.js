"use client";
import { ChipsInId } from "@/components/ui/chainChips";
import { Button } from "@material-tailwind/react";

export default function WalletButton({ name, address, chain }) {
  return (
    <Button
      size="lg"
      variant="outlined"
      className="flex justify-between items-center gap-3 capitalize text-lg font-uni"
    >
      {name}

      <ChipsInId chain={chain} />
    </Button>
  );
}

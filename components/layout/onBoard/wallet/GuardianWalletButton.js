"use client";
import { ChipsInId } from "@/components/ui/chainChips";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export default function GuardianWalletButton({ address, chain }) {
  const router = useRouter();

  return (
    <Button
      size="lg"
      color="blue-gray"
      variant="outlined"
      className="flex justify-between items-center gap-3 capitalize text-lg font-uni"
      onClick={() => {
        router.push(`/guardian?wallet=${chain}:${address}`);
      }}
    >
      {address.substring(0, 6) +
        "..." +
        address.substring(address.length - 6, address.length)}

      <ChipsInId chain={chain} />
    </Button>
  );
}

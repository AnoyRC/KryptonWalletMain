"use client";
import { ChipsInId } from "@/components/ui/chainChips";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export default function WalletButton({ name, address, chain, walletAddress }) {
  const router = useRouter();
  const { address: wallet } = useAccount();

  return (
    walletAddress === wallet && (
      <Button
        size="lg"
        variant="outlined"
        className="flex justify-between items-center gap-3 capitalize text-lg font-uni"
        onClick={() => {
          router.push(`/home?wallet=${chain}:${address}`);
        }}
      >
        {name}

        <ChipsInId chain={chain} />
      </Button>
    )
  );
}

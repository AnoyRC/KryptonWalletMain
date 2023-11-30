"use client";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export default function Navbar() {
  const { isConnected } = useAccount();
  const router = useRouter();

  return (
    <div className="w-full flex justify-between font-fhtotal items-center h-[80px]">
      <h1 className="text-5xl text-black font-fhtotal font-bold">Krypton</h1>
      <Button
        size="lg"
        onClick={() => {
          if (isConnected) router.push("/wallet");
          else router.push("/login");
        }}
      >
        Launch App
      </Button>
    </div>
  );
}

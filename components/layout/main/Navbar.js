"use client";
import { Button } from "@material-tailwind/react";

export default function Navbar() {
  return (
    <div className="w-full flex justify-between font-fhtotal items-center h-[80px]">
      <h1 className="text-5xl text-black font-fhtotal font-bold">Krypton</h1>
      <Button size="lg">Launch App</Button>
    </div>
  );
}

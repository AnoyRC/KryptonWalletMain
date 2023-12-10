"use client";
import { CardHeader, Chip } from "@material-tailwind/react";
import { useSelector } from "react-redux";

export default function StatusCard({ status }) {
  const owner = useSelector((state) => state.wallet.owner);
  return (
    <CardHeader
      className="mt-4 flex flex-col p-3 mx-0 gap-2 my-0 border-[2px]"
      style={{
        borderColor:
          status === "Good"
            ? "#22c55e"
            : status === "Transfer"
            ? "#eab308"
            : "#ef4444",
      }}
    >
      <div className="flex justify-between">
        <h1 className="font-uni text-black/70 text-xl font-extrabold opacity-70">
          Owner
        </h1>
        {status === "Recovery" && (
          <Chip value="In Recovery" className="mr-2" color="red" />
        )}
        {status === "Transfer" && (
          <Chip value="In Transfer" className="mr-2" color="yellow" />
        )}
      </div>
      <h1 className="font-uni text-6xl text-black/80 font-extrabold">
        {owner
          ? owner.toString().slice(0, 6) + "..." + owner.toString().slice(-4)
          : "N/A"}
      </h1>
    </CardHeader>
  );
}

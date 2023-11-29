"use client";
import { CardHeader } from "@material-tailwind/react";

export default function StatusCard({ status }) {
  return (
    <CardHeader
      className="mt-4 flex flex-col p-3 mx-0 my-0 border-[2px]"
      style={{
        color:
          status === "Good"
            ? "#22c55e"
            : status === "Transfer"
            ? "#eab308"
            : "#ef4444",
        opacity: 0.7,
        borderColor:
          status === "Good"
            ? "#22c55e"
            : status === "Transfer"
            ? "#eab308"
            : "#ef4444",
      }}
    >
      <h1 className="font-uni text-black/70 text-xl font-extrabold">Status</h1>
      <h1 className="font-uni text-7xl font-extrabold">
        {status === "Good"
          ? status
          : status === "Transfer"
          ? "In Transfer"
          : "In Recovery"}
      </h1>
    </CardHeader>
  );
}

"use client";
import GuardianCard from "@/components/layout/main/dashboard/guardians/GuardianCard";
import { Card, CardHeader } from "@material-tailwind/react";

const guardians = [
  {
    name: "Anoy",
    address: "0x3C700d88616C9e186aed7dd59B2e7f60819bf863",
  },
  {
    name: "Anoy",
    address: "0x3C700d88616C9e186aed7dd59B2e7f60819bf863",
  },
  {
    name: "Anoy",
    address: "0x3C700d88616C9e186aed7dd59B2e7f60819bf863",
  },
];

export default function Guardians() {
  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mt-4 grid h-20 place-items-center mx-0 my-0"
        >
          <h1 className="font-uni text-white text-3xl font-bold">Guardians</h1>
        </CardHeader>

        {guardians.map((guardian, index) => (
          <GuardianCard
            key={index}
            name={guardian.name}
            address={guardian.address}
          />
        ))}

        {!guardians && (
          <div className="flex items-center justify-center gap-3">
            <XCircleIcon className="w-6 h-6 text-black" />
            No Guardians
          </div>
        )}
      </Card>
    </div>
  );
}

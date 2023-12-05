"use client";
import GuardianCard from "@/components/layout/main/dashboard/guardians/GuardianCard";
import useReadContract from "@/hooks/useReadContract";
import Krypton from "@/lib/contracts/Krypton";
import { Card, CardHeader } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useContractEvent } from "wagmi";

export default function Guardians() {
  const [guardians, setGuardians] = useState([]);
  const { getAllGuardians } = useReadContract();
  const searchParams = useSearchParams();

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "GuardianshipTransferExecuted",
    listener(log) {
      getGuardians();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "GuardianAdded",
    listener(log) {
      getGuardians();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useEffect(() => {
    getGuardians();
  }, []);

  const getGuardians = async () => {
    const guardians = await getAllGuardians();
    if (!guardians || guardians.length === 0) return;

    const guardiansWithAddress = guardians.map((guardian) => {
      return {
        address:
          guardian.toString().substring(0, 2) +
          guardian
            .toString()
            .substring(
              guardian.toString().length - 40,
              guardian.toString().length
            ),
      };
    });

    setGuardians(guardiansWithAddress);
  };

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
            id={index}
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

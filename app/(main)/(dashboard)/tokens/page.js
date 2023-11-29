"use client";
import TokenButton from "@/components/layout/main/dashboard/tokens/TokenButton";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardHeader, CardBody } from "@material-tailwind/react";
import Image from "next/image";

const tokens = [
  {
    Name: "Polygon",
    Balance: "0.245",
    Symbol: "MATIC",
    Icon: "polygon",
    USDBalance: "0.245",
  },
  {
    Name: "Tether USD",
    Balance: "420",
    Symbol: "USDT",
    Icon: "tether",
    USDBalance: "420",
  },
];

export default function Tokens() {
  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mt-4 grid h-20 place-items-center mx-0 my-0"
        >
          <h1 className="font-uni text-white text-3xl font-bold">Tokens</h1>
        </CardHeader>

        <CardBody className="flex flex-col gap-4 p-0">
          {tokens.map((token, index) => (
            <TokenButton
              Name={token.Name}
              Balance={token.Balance}
              Symbol={token.Symbol}
              Icon={token.Icon}
              USDBalance={token.USDBalance}
              key={index}
            />
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

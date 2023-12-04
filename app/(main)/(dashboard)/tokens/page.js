"use client";
import TokenButton from "@/components/layout/main/dashboard/tokens/TokenButton";
import { ChainConfig } from "@/lib/chainConfig";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";

export default function Tokens() {
  const searchParams = useSearchParams();
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
          {ChainConfig.find(
            (chain) =>
              chain.chainId.toString() ===
              searchParams.get("wallet")?.split(":")[0]
          )?.tokens.map((token, index) => (
            <TokenButton
              id={index}
              wallet={searchParams.get("wallet")?.split(":")[1]}
              chainId={searchParams.get("wallet")?.split(":")[0]}
              Name={token.nativeName}
              Symbol={token.name}
              Icon={token.icon}
              feedId={token.feedId}
              isNative={token.isNative}
              address={token.address}
              key={index}
            />
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

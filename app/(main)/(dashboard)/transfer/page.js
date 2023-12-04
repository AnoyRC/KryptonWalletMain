"use client";
import {
  ArrowsRightLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Card, Alert, Button, Select, Option } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChainConfig } from "@/lib/chainConfig";
import { useSearchParams } from "next/navigation";

export default function Tokens() {
  const [amount, setAmount] = useState("0.00");
  const [selected, setSelected] = useState("");
  const [recipient, setRecipient] = useState("");

  const [errorTitle, setErrorTitle] = useState("Invalid Recipient");
  const [errorDescription, setErrorDescription] = useState(
    "Please check the recipient address and try again."
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("wallet")) {
      setSelected(
        ChainConfig.find(
          (chain) =>
            chain.chainId.toString() ===
            searchParams.get("wallet")?.split(":")[0]
        )?.tokens[0].name
      );
    }
  }, [searchParams]);

  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-4">
            <h6 className="font-uni text-3xl text-black font-bold">Transfer</h6>
            <p className="font-uni text-lg text-black/60 -mt-3">
              Transfer your tokens to other wallets
            </p>
          </div>
          <Card className="flex gap-1 font-uni bg-black/80 text-white flex-row p-3">
            <Image
              src="/images/main/dashboard/swap/fuel.svg"
              width={20}
              height={20}
              alt="fuel"
            />
            0.004
          </Card>
        </div>
        <Card className="w-full flex flex-col p-6 py-8 gap-3 bg-black/80">
          <h6 className="font-uni text-lg text-white/60 ">You Send</h6>
          <div className="w-full flex items-center justify-between gap-3">
            <input
              className="w-full h-10 bg-transparent text-white outline-none font-extrabold text-2xl mt-[2px]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
            />

            <div className="[&>*]:min-w-0 w-[180px]">
              {ChainConfig.find(
                (chain) =>
                  chain.chainId.toString() ===
                  searchParams.get("wallet")?.split(":")[0]
              ) && (
                <Select
                  size="md"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  className="border-transparent text-white font-uni font-extrabold text-2xl py-0 "
                  containerProps={{
                    className: "pb-3 min-w-0 w-[180px]",
                  }}
                  value={selected}
                  onChange={(e) => setSelected(e)}
                >
                  {ChainConfig.find(
                    (chain) =>
                      chain.chainId.toString() ===
                      searchParams.get("wallet")?.split(":")[0]
                  )?.tokens.map((token) => (
                    <Option
                      key={token.name}
                      value={token.name}
                      className="flex items-center gap-2"
                    >
                      {token.name}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
          </div>

          <div className="flex w-full my-5 justify-center relative">
            <div className="bg-white/40 w-[90%] h-[1px]"></div>
          </div>

          <h6 className="font-uni text-lg text-white/60">To</h6>

          <div className="w-full flex items-center justify-between gap-3">
            <input
              className="w-full h-10 bg-transparent text-white outline-none font-extrabold text-2xl mt-[2px]"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter Recipient Address"
            />
          </div>
        </Card>

        <Button size="lg" className="bg-black/80">
          Transfer
        </Button>

        <Alert
          variant="gradient"
          icon={<ExclamationTriangleIcon className="h-8 w-8" />}
          className="mb-2 mr-0"
        >
          <h6 className="font-bold text-lg mb-2">{errorTitle}</h6>
          <p className="text-sm">{errorDescription}</p>
        </Alert>
      </Card>
    </div>
  );
}

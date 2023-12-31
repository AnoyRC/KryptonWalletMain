"use client";
import {
  ArrowsRightLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Card, Alert, Button, Select, Option } from "@material-tailwind/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChainConfig } from "@/lib/chainConfig";
import { useSelector } from "react-redux";

export default function Tokens() {
  const [amount, setAmount] = useState("0.00");
  const [selected, setSelected] = useState("MATIC");
  const [selected2, setSelected2] = useState("USDT");

  const [errorTitle, setErrorTitle] = useState("Same Tokens");
  const [errorDescription, setErrorDescription] = useState(
    "Swapping is not available with the same tokens."
  );
  const searchParams = useSearchParams();
  const isOwner = useSelector((state) => state.wallet.isOwner);

  useEffect(() => {
    if (searchParams.get("wallet")) {
      setSelected(
        ChainConfig.find(
          (chain) =>
            chain.chainId.toString() ===
            searchParams.get("wallet")?.split(":")[0]
        )?.tokens[0].name
      );
      setSelected2(
        ChainConfig.find(
          (chain) =>
            chain.chainId.toString() ===
            searchParams.get("wallet")?.split(":")[0]
        )?.tokens[1].name
      );
    }
  }, [searchParams]);

  const interchange = () => {
    const temp = selected;
    setSelected(selected2);
    setSelected2(temp);
  };

  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-4">
            <h6 className="font-uni text-3xl text-black font-bold">Swap</h6>
            <p className="font-uni text-lg text-black/60 -mt-3">
              Swap your tokens for other tokens
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
            <Button
              className="absolute top-1/2 -translate-y-1/2 bg-white px-4 rounded-2xl"
              size="md"
              ripple={false}
              onClick={interchange}
            >
              <ArrowsRightLeftIcon className="w-5 h-5 text-black" />
            </Button>
          </div>

          <h6 className="font-uni text-lg text-white/60">You Get</h6>

          <div className="w-full flex items-center justify-between gap-3">
            <p className=" text-2xl font-extrabold w-full text-white ">0.00</p>

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
                  value={selected2}
                  onChange={(e) => setSelected2(e)}
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
        </Card>

        <Button size="lg" className="bg-black/80" disabled={!isOwner}>
          Swap
        </Button>

        {/* <Alert
          variant="gradient"
          icon={<ExclamationTriangleIcon className="h-8 w-8" />}
          className="mb-2 mr-0"
        >
          <h6 className="font-bold text-lg mb-2">{errorTitle}</h6>
          <p className="text-sm">{errorDescription}</p>
        </Alert> */}
      </Card>
    </div>
  );
}

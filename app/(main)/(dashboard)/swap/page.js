"use client";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { Card, Input, Button, Select, Option } from "@material-tailwind/react";
import { useState } from "react";

export default function Tokens() {
  const [amount, setAmount] = useState("0.00");
  const [selected, setSelected] = useState("MATIC");
  const [selected2, setSelected2] = useState("USDT");

  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <h6 className="font-uni text-3xl text-black font-bold">Swap</h6>
        <p className="font-uni text-lg text-black/60 -mt-3">
          Swap your tokens for other tokens
        </p>
        <Card className="w-full flex flex-col p-6 py-8 gap-3 bg-black/80">
          <h6 className="font-uni text-lg text-white/60 ">Send</h6>
          <div className="w-full flex items-center justify-between gap-3">
            <input
              className="w-full h-10 bg-transparent text-white outline-none font-extrabold text-2xl mt-[2px]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
            />

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
              <Option className="font-uni" value="MATIC">
                MATIC
              </Option>
              <Option className="font-uni" value="USDT">
                USDT
              </Option>
              <Option className="font-uni" value="USDC">
                USDC
              </Option>
            </Select>
          </div>

          <div className="flex w-full my-5 justify-center relative">
            <div className="bg-white/40 w-[90%] h-[1px]"></div>
            <Button
              className="absolute top-1/2 -translate-y-1/2 bg-white px-4 rounded-2xl"
              size="md"
              ripple={false}
            >
              <ArrowsRightLeftIcon className="w-5 h-5 text-black" />
            </Button>
          </div>

          <h6 className="font-uni text-lg text-white/60">Get</h6>

          <div className="w-full flex items-center justify-between gap-3">
            <p className=" text-2xl font-extrabold w-full text-white ">0.00</p>
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
              <Option className="font-uni" value="MATIC">
                MATIC
              </Option>
              <Option className="font-uni" value="USDT">
                USDT
              </Option>
              <Option className="font-uni" value="USDC">
                USDC
              </Option>
            </Select>
          </div>
        </Card>

        <Button size="lg" className="bg-black/80">
          Swap
        </Button>
      </Card>
    </div>
  );
}

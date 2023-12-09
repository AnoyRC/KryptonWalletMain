"use client";
import {
  ArbitrumChip,
  BaseChip,
  CeloChip,
  MumbaiChip,
  PolygonChip,
  PolygonZKChip,
  ScrollChip,
} from "@/components/ui/chainChips";
import { ChainConfig } from "@/lib/chainConfig";
import { setActiveStep, setChain, setName } from "@/redux/slice/setupSlice";
import { Button, Input, Select, Option, Alert } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Step1() {
  const dispatch = useDispatch();
  const chain = useSelector((state) => state.setup.chain);
  const name = useSelector((state) => state.setup.name);
  const router = useRouter();
  const { chain: currentChain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { isConnected } = useAccount();

  return (
    <div className="w-full flex flex-col gap-4">
      <h6 className="font-uni text-lg font-bold">Wallet Name</h6>
      <Input
        size="lg"
        placeholder="my-awesome-wallet"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        value={name}
        onChange={(e) => dispatch(setName(e.target.value))}
      />

      <h6 className="font-uni text-lg font-bold">Chain</h6>
      <Select
        variant="static"
        label=""
        containerProps={{
          className: "-mt-5 mb-2",
        }}
        labelProps={{
          className: "my-2",
        }}
        className="my-2"
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        value={chain}
        onChange={(e) => dispatch(setChain(e))}
      >
        <Option value="80001">
          <MumbaiChip />
        </Option>
        <Option value="84531">
          <BaseChip />
        </Option>
      </Select>

      {isConnected && currentChain.id.toString() !== chain && (
        <Alert variant="gradient" icon={<Icon />} className="mb-2 mr-0">
          <h6 className="font-bold text-lg mb-2">Change your Wallet Network</h6>
          <p className="text-sm">
            You are trying to deploy Krypton on a network that is not selected
          </p>
          <Button
            size="sm"
            variant="outlined"
            className="mt-4 border-white text-white mb-1"
            onClick={() => {
              switchNetwork(chain);
            }}
          >
            Change Network
          </Button>
        </Alert>
      )}

      <div className="flex justify-between">
        <Button
          size="md"
          variant="outlined"
          className="capitalize font-uni font-bold"
          onClick={() => {
            router.push("/wallet");
          }}
        >
          Cancel
        </Button>

        <Button
          size="md"
          className="capitalize font-uni font-bold"
          onClick={() => {
            if (!ChainConfig.find((c) => c.chainId.toString() === chain)) {
              toast.error("This Chain is not Currently Supported");
              return;
            }
            if (currentChain.id.toString() !== chain) {
              toast.error("Switch to the correct network");
              return;
            }
            if (!name) {
              toast.error("Enter a wallet name");
              return;
            }
            if (!isConnected) {
              toast.error("Connect your wallet");
              return;
            }
            dispatch(setActiveStep(1));
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

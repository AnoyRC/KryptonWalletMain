"use client";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Card,
} from "@material-tailwind/react";
import {
  ArrowPathRoundedSquareIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import { useState } from "react";
import { ChipsInId } from "@/components/ui/chainChips";

export default function WalletMenu() {
  const [openMenu, setOpenMenu] = useState(false);
  const address = "0x3C700d88616C9e186aed7dd59B2e7f60819bf863";
  const walletAddress = "0xDb1d125C9f7faE45d7CeE470d048670a85270f4D";
  return (
    <Menu
      open={openMenu}
      handler={setOpenMenu}
      allowHover
      animate={{
        mount: { y: 4 },
        unmount: { y: -24 },
      }}
      placement="bottom-end"
    >
      <MenuHandler>
        <Button
          variant="text"
          className="flex  mt-2 items-center gap-3 text-base font-normal capitalize tracking-normal font-uni outline-none"
        >
          Wallet{" "}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="hidden w-fit grid-cols-8 gap-4 overflow-visible lg:grid">
        <Card
          shadow={false}
          className="col-span-4 flex h-full w-full rounded-md p-4 outline-none max-w-xs space-y-10 bg-[rgb(255,248,248)]"
        >
          <div className=" space-y-2">
            <p className="font-uni text-lg font-bold">Wallet Actions</p>
            <p className="font-uni text-md">
              View all of your wallets and their balances.
            </p>
          </div>

          <Image
            src={"/images/main/dashboard/navbar/briefcase.png"}
            width={200}
            height={200}
            className="aspect-square mx-auto"
            alt="wallet"
          />
        </Card>

        <ul className="col-span-4 flex max-w-xs flex-col w-full items-end gap-1 outline-none">
          <Button
            size="sm"
            className="w-full my-2 capitalize text-lg font-uni -mb-1 flex gap-1 items-center justify-center"
            variant="outlined"
          >
            <ArrowPathRoundedSquareIcon className="h-5 w-5" />
            Change Network
          </Button>

          <Button size="sm" className="w-full my-2 capitalize text-lg font-uni">
            Connect
          </Button>

          <Card className="w-full shadow-none items-end gap-1 bg-purple-400/20 border-purple-400 border-[1px] p-2 px-4">
            <div className="flex w-full items-center justify-between text-center">
              <ChipsInId chain="1" />
              <p className="font-uni text-2xl font-extrabold">0.00 MATIC</p>
            </div>
            <p className="font-uni text-md flex gap-1 items-center">
              <DocumentDuplicateIcon className="h-4 w-4" />
              {address.slice(0, 6) + "..." + address.slice(-4)}
            </p>
          </Card>

          <Button size="sm" className="w-full mt-2 capitalize text-lg font-uni">
            Disconnect
          </Button>

          <div className="flex w-full items-center mt-2 mb-2 justify-center text-center gap-3">
            <div className="w-[20%] bg-black h-[1px]" /> Krypton Wallet
            <div className="w-[20%] bg-black h-[1px]" />
          </div>

          <Card className="w-full shadow-none items-end gap-1 bg-transparent border-blue-gray-200 border-[1px] p-2 px-4">
            <div className="flex w-full items-center justify-between text-center">
              <ChipsInId chain="3" />
              <p className="font-uni text-2xl font-extrabold">0.00 ARB</p>
            </div>
            <p className="font-uni text-md flex gap-1 items-center">
              <DocumentDuplicateIcon className="h-4 w-4" />
              {walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)}
            </p>
          </Card>
          <Button size="sm" className="w-full mt-2 capitalize text-lg font-uni">
            Back to Menu
          </Button>
        </ul>
      </MenuList>
    </Menu>
  );
}

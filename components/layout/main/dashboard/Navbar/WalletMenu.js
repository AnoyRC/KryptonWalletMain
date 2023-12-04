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
import {
  useAccount,
  useBalance,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function WalletMenu() {
  const [openMenu, setOpenMenu] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { switchNetwork } = useSwitchNetwork();
  const { data: walletBalance } = useBalance({
    address: address,
    watch: true,
  });
  const { data: kryptonBalance } = useBalance({
    address: searchParams.get("wallet")?.split(":")[1] || "0",
    watch: true,
  });

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
            width={175}
            height={175}
            className="aspect-square mx-auto"
            alt="wallet"
          />
        </Card>

        <ul className="col-span-4 flex max-w-xs flex-col w-full items-end gap-1 outline-none">
          {isConnected &&
            !(
              searchParams.get("wallet")?.split(":")[0] ===
                chain?.id.toString() &&
              (searchParams.get("wallet")?.split(":")[0] === "137" ||
                searchParams.get("wallet")?.split(":")[0] === "80001")
            ) && (
              <Button
                size="sm"
                className="w-full my-2 capitalize text-lg font-uni flex gap-1 items-center justify-center"
                variant="outlined"
                onClick={() => {
                  if (searchParams.get("wallet")) {
                    if (
                      searchParams.get("wallet")?.split(":")[0] === "137" ||
                      searchParams.get("wallet")?.split(":")[0] === "80001"
                    ) {
                      switchNetwork(searchParams.get("wallet")?.split(":")[0]);
                    } else {
                      toast.error("Network not supported");
                    }
                  }
                }}
              >
                <ArrowPathRoundedSquareIcon className="h-5 w-5" />
                Change Network
              </Button>
            )}

          {!isConnected && (
            <Button
              size="sm"
              className="w-full my-2 capitalize text-lg font-uni"
              onClick={() => router.push("/login")}
            >
              Connect
            </Button>
          )}

          {isConnected && (
            <Card className="w-full shadow-none items-end gap-1 bg-purple-400/20 border-purple-400 border-[1px] p-2 px-4">
              <div className="flex w-full items-center justify-between text-center">
                <ChipsInId chain={chain?.id.toString()} />
                <p className="font-uni text-2xl font-extrabold">
                  {Number(walletBalance?.formatted) > 1000
                    ? Number(walletBalance?.formatted).toFixed(0) / 1000 + "K"
                    : Number(walletBalance?.formatted) > 1000000
                    ? Number(walletBalance?.formatted).toFixed(0) / 1000000 +
                      "M"
                    : Number(walletBalance?.formatted).toFixed(2)}{" "}
                  {walletBalance?.symbol}
                </p>
              </div>
              <p
                className="font-uni text-md flex gap-1 items-center hover:cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(address);
                  toast.success("Copied to clipboard");
                }}
              >
                <DocumentDuplicateIcon className="h-4 w-4" />
                {address.slice(0, 6) + "..." + address.slice(-4)}
              </p>
            </Card>
          )}

          {isConnected && (
            <Button
              size="sm"
              className="w-full mt-2 capitalize text-lg font-uni"
              onClick={() => {
                disconnect();
                router.push("/login");
              }}
            >
              Disconnect
            </Button>
          )}

          <div className="flex w-full items-center mt-2 mb-2 justify-center text-center gap-3">
            <div className="w-[20%] bg-black h-[1px]" /> Krypton Wallet
            <div className="w-[20%] bg-black h-[1px]" />
          </div>

          <Card className="w-full shadow-none items-end gap-1 bg-transparent border-blue-gray-200 border-[1px] p-2 px-4">
            <div className="flex w-full items-center justify-between text-center">
              <ChipsInId
                chain={searchParams.get("wallet")?.split(":")[0] || "0"}
              />
              <p className="font-uni text-2xl font-extrabold">
                {Number(kryptonBalance?.formatted) > 1000
                  ? Number(kryptonBalance?.formatted).toFixed(0) / 1000 + "K"
                  : Number(kryptonBalance?.formatted) > 1000000
                  ? Number(kryptonBalance?.formatted).toFixed(0) / 1000000 + "M"
                  : Number(kryptonBalance?.formatted).toFixed(2)}{" "}
                {kryptonBalance?.symbol}
              </p>
            </div>
            <p
              className="font-uni text-md flex gap-1 items-center hover:cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(
                  searchParams.get("wallet")?.split(":")[1]
                );
                toast.success("Copied to clipboard");
              }}
            >
              <DocumentDuplicateIcon className="h-4 w-4" />
              {searchParams.get("wallet")?.split(":")[1].slice(0, 6) +
                "..." +
                searchParams.get("wallet")?.split(":")[1].slice(-4)}
            </p>
          </Card>
          <Button
            size="sm"
            className="w-full mt-2 capitalize text-lg font-uni"
            onClick={() => {
              router.push("/wallet");
            }}
          >
            Back to Menu
          </Button>
        </ul>
      </MenuList>
    </Menu>
  );
}

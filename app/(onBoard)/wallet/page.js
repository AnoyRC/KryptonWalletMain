"use client";
import GuardianWalletButton from "@/components/layout/onBoard/wallet/GuardianWalletButton";
import WalletButton from "@/components/layout/onBoard/wallet/WalletButton";
import { handleGuardianWalletDialog } from "@/redux/slice/setupSlice";
import {
  ArrowLeftOnRectangleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAccount, useDisconnect } from "wagmi";

export default function Setup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const address = "0x3C700d88616C9e186aed7dd59B2e7f60819bf863";

  const demoWallet = [
    {
      name: "Awesome Wallet",
      address: "0x3C700d88616C9e186aed7dd59B2e7f60819bf863",
      chain: "137",
    },
    {
      name: "Another Wallet",
      address: "0x3C700d88616C9e186aed7dd59B2e7f60819bf863",
      chain: "80001",
    },
  ];

  return (
    <>
      <CardHeader
        variant="gradient"
        color="gray"
        className="mt-4 grid h-20 place-items-center"
      >
        <h1 className="font-uni text-white text-3xl font-bold">Wallets</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        {!isConnected && (
          <Button
            size="lg"
            className="flex items-center justify-center -mt-2 gap-3 capitalize text-lg font-uni"
            onClick={() => {
              router.push("/login");
            }}
          >
            Connect
          </Button>
        )}
        {isConnected && (
          <>
            <div className="flex flex-col gap-4">
              {demoWallet.map((wallet, index) => (
                <WalletButton
                  key={index}
                  address={wallet.address}
                  chain={wallet.chain}
                  name={wallet.name}
                />
              ))}
            </div>
            <Button
              size="lg"
              className="flex items-center justify-center gap-3 capitalize text-lg font-uni"
              onClick={() => {
                router.push("/setup");
              }}
            >
              <PlusIcon className="w-6 h-6 text-white" />
            </Button>

            <div className="flex items-center justify-center text-center gap-3">
              <div className="w-[20%] bg-black h-[1px]" /> Guardian Wallets
              <div className="w-[20%] bg-black h-[1px]" />
            </div>

            <div className="flex flex-col gap-4">
              {demoWallet.map((wallet, index) => (
                <GuardianWalletButton
                  key={index}
                  address={wallet.address}
                  chain={wallet.chain}
                />
              ))}
            </div>

            <Button
              size="lg"
              className="flex items-center justify-center gap-3 capitalize text-lg font-uni"
              color="blue-gray"
              onClick={() => {
                dispatch(handleGuardianWalletDialog());
              }}
            >
              <PlusIcon className="w-6 h-6 text-white" />
            </Button>

            <Button
              size="lg"
              className="flex items-center justify-center -mt-1 gap-3 capitalize text-lg font-uni"
              onClick={() => {
                disconnect();
                router.push("/login");
              }}
            >
              <ArrowLeftOnRectangleIcon className="w-6 h-6 text-white" />
              Disconnect
            </Button>
          </>
        )}
      </CardBody>

      {isConnected && (
        <CardFooter className="flex flex-col gap-4 -mt-9 -mb-6 text-center">
          <Typography color="gray">
            Lost your Wallet{" "}
            <span
              className="text-blue-500 hover:cursor-pointer"
              onClick={() => {
                router.push("/initiate");
              }}
            >
              Initiate a Recovery
            </span>
          </Typography>
        </CardFooter>
      )}
    </>
  );
}

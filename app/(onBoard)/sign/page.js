"use client";
import {
  openDrawer,
  openInitiateDrawer,
  openMessageDrawer,
  setInitiateChainId,
  setInitiateWalletAddress,
} from "@/redux/slice/sigManagerSlice";
import {
  ArrowLeftOnRectangleIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  CardHeader,
  CardBody,
  Button,
  Input,
  Alert,
  Select,
  Option,
} from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useSelector } from "react-redux";
import { setChain } from "@/redux/slice/setupSlice";
import { MumbaiChip, PolygonChip } from "@/components/ui/chainChips";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChainConfig } from "@/lib/chainConfig";
import useDeployKrypton from "@/hooks/useDeployKrypton";
import {
  setFnArgs,
  setFnName,
  setSuccessMessage,
} from "@/redux/slice/walletSlice";
import { ethers } from "ethers";

export default function Sign() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isConnected } = useAccount();
  const [client, setClient] = useState(null);
  const searchParams = useSearchParams();
  const { checkWalletCode } = useDeployKrypton();
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    if (isConnected) {
      checkMessage();
    }
  }, [searchParams, isConnected]);

  const checkMessage = async () => {
    setIsInvalid(false);

    const message = searchParams.get("message");

    const id = message.split(":")[0];
    const chainId = message.split(":")[1];
    const walletAddress = message.split(":")[2];
    const payload = message.split(":")[3];

    const currentConfig = ChainConfig.find(
      (config) => config.chainId.toString() === chainId
    );

    if (!currentConfig) {
      toast.error("Invalid Chain Id");
      setIsInvalid(true);
      return;
    }

    const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);

    const walletCode = await provider.getCode(walletAddress);
    const walletExists = walletCode !== "0x";

    if (!walletExists) {
      toast.error("Invalid Wallet Address");
      setIsInvalid(true);
      return;
    }

    if (!payload) {
      toast.error("Invalid Payload");
      setIsInvalid(true);
      return;
    }

    if (!id) {
      toast.error("Invalid Id");
      setIsInvalid(true);
      return;
    }
  };

  return (
    client && (
      <>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mt-4 grid h-20 place-items-center"
        >
          <h1 className="font-uni text-white text-3xl font-bold">
            {searchParams.get("message") ? "Sign Request" : "Invalid Link"}
          </h1>
        </CardHeader>
        <CardBody className="flex flex-col -mt-2 gap-4">
          {isConnected && (
            <>
              {isInvalid && (
                <Alert
                  variant="gradient"
                  icon={<InformationCircleIcon className="h-7 w-7" />}
                  className="mb-2 mr-0"
                >
                  Invalid Link: The token may have expired or the link is
                  invalid. Ask the guardian to send a new link.
                </Alert>
              )}

              {!isInvalid && (
                <Button
                  size="lg"
                  className="flex items-center justify-center -mt-1 gap-3 mb-1 capitalize text-lg font-uni bg-black/80"
                  onClick={() => {
                    dispatch(openMessageDrawer());
                  }}
                >
                  Sign Message
                </Button>
              )}

              <Button
                size="lg"
                variant="outlined"
                className="flex items-center gap-3 -mt-2 capitalize text-lg font-uni"
                onClick={() => router.push("/wallet")}
              >
                <ArrowLeftOnRectangleIcon className="h-7 w-7" />
                Back To Wallet
              </Button>
            </>
          )}
          {!isConnected && (
            <Button
              size="lg"
              className="flex items-center justify-center -mt-2 gap-3 capitalize text-lg font-uni bg-black/80"
              onClick={() => {
                router.push("/login");
              }}
            >
              Connect Wallet
            </Button>
          )}
        </CardBody>
      </>
    )
  );
}

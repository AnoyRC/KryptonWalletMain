"use client";
import {
  openDrawer,
  openInitiateDrawer,
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

export default function Sign() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isConnected } = useAccount();
  const chain = useSelector((state) => state.setup.chain);
  const [walletAddress, setWalletAddress] = useState("");
  const { chain: currentChain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { checkWalletCode } = useDeployKrypton();
  const [client, setClient] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    setClient(true);
  }, []);

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
              <Alert
                variant="gradient"
                icon={<InformationCircleIcon className="h-7 w-7" />}
                className="mb-2 mr-0"
              >
                Invalid Link: The token may have expired or the link is invalid.
                Ask the guardian to send a new link.
              </Alert>

              <Button
                size="lg"
                className="flex items-center justify-center -mt-4 gap-3 mb-1 capitalize text-lg font-uni bg-black/80"
                onClick={async () => {
                  if (
                    !walletAddress ||
                    !walletAddress.startsWith("0x") ||
                    walletAddress.length !== 42
                  ) {
                    toast.error("Please enter a wallet address");
                    return;
                  }

                  const currentConfig = ChainConfig.find(
                    (c) => c.chainId.toString() === chain
                  );

                  if (!currentConfig) {
                    toast.error("Chain not yet Supported");
                    return;
                  }

                  const isCorrectChain =
                    currentChain.id === currentConfig.chainId;

                  if (!isCorrectChain) {
                    toast.error("Please switch to the correct chain");
                    return;
                  }

                  const isValidKrypton = await checkWalletCode(walletAddress);

                  if (!isValidKrypton) {
                    toast.error("Invalid Krypton Wallet");
                    return;
                  }

                  dispatch(openInitiateDrawer());
                  dispatch(setFnName("initiateRecovery"));
                  dispatch(setFnArgs([walletAddress]));
                  dispatch(setInitiateWalletAddress(walletAddress));
                  dispatch(setInitiateChainId(chain));
                  dispatch(setSuccessMessage("Recovery Initiated"));
                }}
              >
                Initiate Recovery
              </Button>

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

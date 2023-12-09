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
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useSelector } from "react-redux";
import { setChain } from "@/redux/slice/setupSlice";
import {
  BaseChip,
  CeloChip,
  MumbaiChip,
  PolygonChip,
  ScrollChip,
} from "@/components/ui/chainChips";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChainConfig } from "@/lib/chainConfig";
import useDeployKrypton from "@/hooks/useDeployKrypton";
import {
  setFnArgs,
  setFnName,
  setSuccessMessage,
} from "@/redux/slice/walletSlice";

export default function Setup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isConnected } = useAccount();
  const chain = useSelector((state) => state.setup.chain);
  const [walletAddress, setWalletAddress] = useState("");
  const { chain: currentChain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { checkWalletCode } = useDeployKrypton();
  const [client, setClient] = useState(null);

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
            2FA Recovery
          </h1>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {isConnected && (
            <>
              <h6 className="font-uni text-lg font-bold">Wallet Address</h6>
              <Input
                size="lg"
                placeholder="Enter Wallet Address"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />

              <h6 className="font-uni text-lg font-bold">Chain</h6>
              <Select
                variant="static"
                label=""
                containerProps={{
                  className: "-mt-5 mb-2 mb-4",
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
                <Option value="44787">
                  <CeloChip />
                </Option>
                <Option value="534351">
                  <ScrollChip />
                </Option>
              </Select>

              <Button
                size="lg"
                className="flex items-center justify-center -mt-2 gap-3 capitalize text-lg font-uni bg-black/80"
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

              <Alert
                variant="gradient"
                icon={<InformationCircleIcon className="h-7 w-7" />}
                className="mb-2 mr-0"
              >
                You can Initiate Recovery only if you have enabled 2FA. If you
                have not enabled 2FA, Guardians can initiate recovery for you.
              </Alert>

              {!(currentChain.id.toString() === chain) && (
                <Button
                  size="lg"
                  variant="outlined"
                  className="flex items-center gap-3 -mt-2 capitalize text-lg font-uni mb-2"
                  onClick={() => {
                    switchNetwork(Number(chain));
                  }}
                >
                  <ArrowPathIcon className="h-7 w-7" />
                  Change Network
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

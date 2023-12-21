"use client";

import { handleGuardianWalletDialog } from "@/redux/slice/setupSlice";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckIcon } from "@heroicons/react/24/outline";
import {
  MumbaiChip,
  BaseChip,
  ArbitrumChip,
  CeloChip,
  ScrollChip,
} from "@/components/ui/chainChips";
import { ethers } from "ethers";
import { ChainConfig } from "@/lib/chainConfig";
import Krypton from "@/lib/contracts/Krypton";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import {
  DataverseConnector,
  SYSTEM_CALL,
  WALLET,
  RESOURCE,
} from "@dataverse/dataverse-connector";
import { useDataverse } from "@/hooks/useDataverse";

const dataverseConnector = new DataverseConnector();
export function AddGuardianWalletDialog() {
  const guardianWalletDialog = useSelector(
    (state) => state.setup.guardianWalletDialog
  );
  const dispatch = useDispatch();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [chain, setChain] = useState("80001");
  const [address, setAddress] = useState("");
  const { address: walletAddress } = useAccount();
  const router = useRouter();
  const modelId = process.env.NEXT_PUBLIC_DATAVERSE_GUARDIAN_MODEL_ID;
  const appId = process.env.NEXT_PUBLIC_DATAVERSE_APP_ID;
  const { createCapability } = useDataverse();

  const addGuardianWallet = async () => {
    const res1 = await dataverseConnector.connectWallet({
      wallet: WALLET.METAMASK,
    });

    const pkh = await dataverseConnector.runOS({
      method: SYSTEM_CALL.createCapability,
      params: {
        appId,
        resource: RESOURCE.CERAMIC,
      },
    });

    console.log(res1);
    const res = await dataverseConnector.runOS({
      method: SYSTEM_CALL.createIndexFile,
      params: {
        modelId,
        fileName: "file.json",
        fileContent: {
          modelVersion: "0.0.1",
          name: "Guardian1",
          walletAddress: walletAddress,
          kryptonChainId: chain,
          kryptonGuardianId: address,
        },
      },
    });
    console.log(res);
  };

  const getData = async () => {
    const res1 = await dataverseConnector.connectWallet({
      wallet: WALLET.METAMASK,
    });

    const pkh = await dataverseConnector.runOS({
      method: SYSTEM_CALL.createCapability,
      params: {
        appId,
        resource: RESOURCE.CERAMIC,
      },
    });
    const res = await dataverseConnector.runOS({
      method: SYSTEM_CALL.loadFilesBy,
      params: {
        modelId: modelId,
        pkh: pkh,
      },
    });
    console.log(res);
  };

  const verifyGuardian = async () => {
    if (!address || address === "" || address === "0x" || address.length < 42) {
      alert("Please enter a wallet address");
      return;
    }

    setIsVerifying(true);

    const currentConfig = ChainConfig.find(
      (c) => c.chainId.toString() === chain
    );

    const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);

    const walletCode = await provider.getCode(address);

    if (walletCode === "0x") {
      alert("This Krypton Wallet does not exist");
      setIsVerifying(false);
      return;
    }

    const krypton = new ethers.Contract(address, Krypton.abi, provider);

    const isGuardian = await krypton.isGuardian(walletAddress);

    if (!isGuardian) {
      alert("This wallet is not a guardian");
      setIsVerifying(false);
      return;
    }

    //Add Guardian Wallet - Dataverse OS
    await addGuardianWallet();

    setIsVerifying(false);
    setIsVerified(true);
  };

  return (
    <>
      <Dialog
        size="xs"
        open={guardianWalletDialog}
        handler={() => {
          dispatch(handleGuardianWalletDialog());
        }}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          {!isVerifying && !isVerified && (
            <CardBody className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold font-uni">
                Add Guardian Wallet
              </h2>

              <h6 className="font-uni text-lg font-bold">Krypton Address</h6>
              <Input
                size="lg"
                placeholder="0x00"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

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
                onChange={(e) => setChain(e)}
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
                <Option value="421613">
                  <ArbitrumChip />
                </Option>
              </Select>
            </CardBody>
          )}
          <CardFooter className="pt-0 -mt-3">
            {!isVerifying && !isVerified && (
              <>
                <Button
                  size="lg"
                  onClick={() => {
                    verifyGuardian();
                  }}
                  fullWidth
                >
                  Verify
                </Button>
              </>
            )}

            {isVerifying && (
              <div className="w-full flex justify-center gap-2 mt-10">
                <h2 className="text-lg font-bold font-uni">Verifying</h2>
                <Image
                  src="/images/onboard/setup/loading.svg"
                  width={20}
                  height={20}
                  alt="loading"
                  className="opacity-50 animate-spin"
                />
              </div>
            )}

            {isVerified && (
              <>
                <div className="w-full flex justify-center gap-2 mt-10">
                  <h2 className="text-lg font-bold font-uni">
                    Verified and Added
                  </h2>
                  <CheckIcon className="text-black w-5 h-5 mt-1 animate-bounce" />
                </div>
                <Button
                  size="lg"
                  onClick={() => {
                    dispatch(handleGuardianWalletDialog());
                    setIsVerified(false);
                    setIsVerifying(false);
                    router.push(`/guardian?wallet=${chain}:${address}`);
                  }}
                  fullWidth
                  className="mt-3"
                >
                  Go to Dashboard
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

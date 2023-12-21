"use client";
import GuardianWalletButton from "@/components/layout/onBoard/wallet/GuardianWalletButton";
import WalletButton from "@/components/layout/onBoard/wallet/WalletButton";
import {
  handleGuardianWalletDialog,
  handleKryptonWalletDialog,
} from "@/redux/slice/setupSlice";
import {
  ArrowLeftOnRectangleIcon,
  PlusIcon,
  XCircleIcon,
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
import { useEffect, useState } from "react";
import {
  DataverseConnector,
  RESOURCE,
  SYSTEM_CALL,
  WALLET,
} from "@dataverse/dataverse-connector";
import { useDataverse } from "@/hooks/useDataverse";
import { Wallet } from "ethers";
import { objectToArray } from "@/lib/utils";

const dataverseConnector = new DataverseConnector();

export default function Setup() {
  const [guardianWallets, setGuardianWallets] = useState([]);
  const [kryptonWallets, setKryptonWallets] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { createCapability } = useDataverse();
  const appId = process.env.NEXT_PUBLIC_DATAVERSE_APP_ID;
  const guardianModelId = process.env.NEXT_PUBLIC_DATAVERSE_GUARDIAN_MODEL_ID;
  const userModelId = process.env.NEXT_PUBLIC_DATAVERSE_USER_MODEL_ID;

  const getData = async (modelId, pkh) => {
    const data = await dataverseConnector.runOS({
      method: SYSTEM_CALL.loadFilesBy,
      params: {
        modelId: modelId,
        pkh: pkh,
      },
    });
    //console.log(data)
    console.log(objectToArray(data));
    return objectToArray(data);
  };

  // Fetch all the Krypton Wallets, save it with this name to avoid any conflict
  //let kryptonWallets
  // const kryptonWallets = [
  //   {
  //     name: "Another Wallet",
  //     address: "0xc8248E8949A4b0B5bB4b11e8ab8CA525a6e232aa",
  //     chain: "80001",
  //   },
  // ];

  // Fetch all the Guardian Wallets, save it with this name to avoid any conflict
  // const guardianWallets = [
  //   {
  //     name: "Another Wallet",
  //     address: "0xc8248E8949A4b0B5bB4b11e8ab8CA525a6e232aa",
  //     chain: "80001",
  //   },
  // ];

  useEffect(() => {
    const getCapabilty = async () => {
      console.log(appId);
      const res = await dataverseConnector.connectWallet({
        wallet: WALLET.METAMASK,
      });
      const pkh = await dataverseConnector.runOS({
        method: SYSTEM_CALL.createCapability,
        params: {
          appId,
          resource: RESOURCE.CERAMIC,
          wallet: res.wallet,
        },
      });
      //console.log(pkh)
      const guardians = await getData(guardianModelId, pkh);
      setGuardianWallets(guardians);
      const users = await getData(userModelId, pkh);
      setKryptonWallets(users);
    };
    getCapabilty();
  }, []);

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
              {kryptonWallets.map((wallet, index) => (
                <WalletButton
                  key={index}
                  address={wallet.kryptonAddress}
                  chain={wallet.kryptonChainId}
                  name={wallet.kryptonName}
                />
              ))}

              {(!kryptonWallets || kryptonWallets.length === 0) && (
                <div className="flex items-center justify-center gap-3">
                  <XCircleIcon className="w-6 h-6 text-black" />
                  No Krypton Wallets Deployed
                </div>
              )}
            </div>
            <Button
              size="lg"
              className="flex items-center justify-center gap-3 capitalize text-lg font-uni"
              onClick={() => {
                dispatch(handleKryptonWalletDialog());
              }}
            >
              <PlusIcon className="w-6 h-6 text-white" />
            </Button>

            <div className="flex items-center justify-center text-center gap-3">
              <div className="w-[20%] bg-black h-[1px]" /> Guardian Wallets
              <div className="w-[20%] bg-black h-[1px]" />
            </div>

            <div className="flex flex-col gap-4">
              {guardianWallets.map((wallet, index) => (
                <GuardianWalletButton
                  key={index}
                  address={wallet.walletAddress}
                  chain={wallet.kryptonChainId}
                />
              ))}

              {(!guardianWallets || guardianWallets.length === 0) && (
                <div className="flex items-center justify-center gap-3">
                  <XCircleIcon className="w-6 h-6 text-black" />
                  Are you a Guardian? Add it here
                </div>
              )}
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

"use client";
import {
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAccount, useConnect } from "wagmi";
import {
  DataverseConnector,
  WALLET,
  RESOURCE,
  SYSTEM_CALL,
} from "@dataverse/dataverse-connector";
import { useEthersProvider } from "@/wagmi/EthersProvider";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [wallet, setWallet] = useState();
  const provider = useEthersProvider();

  useEffect(() => {
    if (isConnected) {
      //connectWallet();
      router.push("/wallet");
    }
  }, [isConnected]);

  // Add Connect functionalities for all the wallets with Dataverse OS
  const connectWallet = async (walletType, index) => {
    const dataverseConnector = new DataverseConnector();
    try {
      const appId = process.env.NEXT_PUBLIC_DATAVERSE_APP_ID;
      const res = await dataverseConnector.connectWallet({
        wallet: walletType,
      });
      console.log(res);
      const pkh = await dataverseConnector.runOS({
        method: SYSTEM_CALL.createCapability,
        params: {
          appId: appId,
          resource: RESOURCE.CERAMIC,
        },
      });
      console.log(pkh);
      connect({
        connector: connectors[index],
        //Metamask
      });

      setWallet(res.wallet);
      return res.address;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CardHeader
        variant="gradient"
        color="gray"
        className="mt-4 grid h-20 place-items-center"
      >
        <h1 className="font-uni text-white text-3xl font-bold">Connect</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        {!isConnected && (
          <>
            <Button
              size="lg"
              variant="outlined"
              className="flex items-center gap-3 capitalize text-lg font-uni"
              onClick={() =>
                connect({
                  connector: connectors[4],
                })
              }
              disabled
            >
              <Image
                src="/images/onboard/login/google.svg"
                width={30}
                height={30}
                alt="google"
              />
              Sign In with Social
            </Button>
            <div className="flex w-full justify-end items-center text-black -my-2">
              Powered by{" "}
              <Image
                src="/images/onboard/login/auth0.svg"
                width={15}
                height={15}
                alt="portis"
                className="ml-[5px]"
              />
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-full bg-black h-[1px]" /> or
              <div className="w-full bg-black h-[1px]" />
            </div>
            <Button
              size="lg"
              variant="outlined"
              className="flex items-center gap-3 capitalize text-lg font-uni"
              onClick={async () => {
                connectWallet(WALLET.METAMASK, 0);
                // connect({
                //   connector: connectors[0],
                //   //Metamask
                // });
              }}
            >
              <Image
                src="/images/onboard/login/metamask.svg"
                width={30}
                height={30}
                alt="metamask"
              />
              Metamask
            </Button>
            {/* <Button
              size="lg"
              variant="outlined"
              className="flex items-center gap-3 capitalize text-lg font-uni"
              onClick={() => {
                // connect({
                //   connector: connectors[1],
                //   //base wallet
                // })
                connectWallet(WALLET.COINBASE, 1);
              }}
            >
              <Image
                src="/images/onboard/login/coinbase.svg"
                width={30}
                height={30}
                alt="coinbase"
              />
              Coinbase
            </Button>
            <Button
              size="lg"
              variant="outlined"
              className="flex items-center gap-3 capitalize text-lg font-uni"
              onClick={() => {
                // connect({
                //   connector: connectors[2],
                //   //Wallet Connect
                // })
                connectWallet(WALLET.WALLETCONNECT, 2);
              }}
            >
              <Image
                src="/images/onboard/login/walletconnect.svg"
                width={30}
                height={30}
                alt="wallet connect"
              />
              Wallet Connect
            </Button> */}
            <div className="flex w-full justify-end items-center text-black -my-2">
              Powered by Dataverse OS
            </div>
          </>
        )}
      </CardBody>
      {!isConnected && (
        <CardFooter className="flex flex-col gap-4 -mt-7 text-center">
          <Typography color="gray">
            By connecting you agree to our{" "}
            <span className="text-blue-500">Terms of Service</span> and{" "}
            <span className="text-blue-500">Privacy Policy</span>
          </Typography>
        </CardFooter>
      )}
    </>
  );
}

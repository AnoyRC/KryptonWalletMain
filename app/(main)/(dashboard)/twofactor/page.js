"use client";
import {
  InformationCircleIcon,
  MinusIcon,
  PlusIcon,
  KeyIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import {
  Alert,
  Button,
  Card,
  CardHeader,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  openTwoFADrawer,
  setActiveStep,
  setSelectedTwoFactor,
  setTwoFactorAddress,
} from "@/redux/slice/setupSlice";
import { openDrawer } from "@/redux/slice/sigManagerSlice";
import useReadContract from "@/hooks/useReadContract";
import { useSearchParams } from "next/navigation";
import Krypton from "@/lib/contracts/Krypton";
import { useContractEvent } from "wagmi";
import useSendTransaction from "@/hooks/useSendTransaction";
import toast from "react-hot-toast";
import useKrypton from "@/hooks/useKrypton";

export default function General() {
  const [cooldown, setCooldown] = useState(30);
  const checked = true;
  const twoFactorAddress = useSelector((state) => state.setup.twoFactorAddress);
  const selectedTwoFactor = useSelector(
    (state) => state.setup.selectedTwoFactor
  );
  const dispatch = useDispatch();
  const { getTwoFactorCooldown } = useReadContract();
  const searchParams = useSearchParams();
  const { initiateTransaction } = useSendTransaction();
  const { prepareEnableTwoFactorAuth, executeTransaction } = useKrypton();
  const isOwner = useSelector((state) => state.wallet.isOwner);

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "TwoFactorCooldownChanged",
    listener(log) {
      getTwoFactorCooldown().then((res) => {
        setCooldown(Number(res) / 60);
      });
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  const status = useSelector((state) => state.wallet.status);

  const isTwoFactor = useSelector((state) => state.wallet.is2FA);

  const addCooldown = () => {
    setCooldown(cooldown + 10);
  };

  const substractCooldown = () => {
    setCooldown(cooldown - 10);
  };

  useEffect(() => {
    getTwoFactorCooldown().then((res) => {
      setCooldown(Number(res) / 60);
    });
  }, []);

  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mt-4 grid h-20 place-items-center mx-0 my-0"
        >
          <h1 className="font-uni text-white text-3xl font-bold">2FA</h1>
        </CardHeader>

        {!isTwoFactor && status !== "Recovery" && (
          <>
            {" "}
            <Alert
              className="bg-black/80"
              icon={<InformationCircleIcon className="h-6 w-6" />}
            >
              <p className="font-uni">
                2FA is a security feature that adds an extra layer of protection
                to your wallet.
              </p>
            </Alert>
          </>
        )}

        {isTwoFactor && status !== "Recovery" && (
          <>
            <h6 className="font-uni text-lg font-bold">2FA Cooldown</h6>
            <div className="flex w-full items-center justify-between ">
              <div className="flex items-center gap-5">
                <Button
                  onClick={substractCooldown}
                  className="px-4 bg-black/80"
                >
                  <MinusIcon className="w-6 h-6" />
                </Button>
                <p className="font-uni text-lg font-bold">{cooldown} minutes</p>
                <Button onClick={addCooldown} className="px-4 bg-black/80">
                  <PlusIcon className="w-6 h-6" />
                </Button>
              </div>
              <Button
                className=" text-white font-bold bg-black/80"
                size="lg"
                onClick={() => {
                  if (cooldown <= 0) {
                    toast.error("Cooldown cannot be less than 0");
                    return;
                  }

                  initiateTransaction("changeTwoFactorCooldown", [cooldown]);
                }}
                disabled={!isOwner}
              >
                Update
              </Button>
            </div>
            <Alert
              className="bg-black/80"
              icon={<InformationCircleIcon className="h-6 w-6" />}
            >
              <p className="font-uni">
                This is the time between consecutive 2FA requests.
              </p>
            </Alert>
          </>
        )}

        {status !== "Recovery" && (
          <>
            <Button
              size="lg"
              variant="outlined"
              className="flex items-center justify-between  capitalize text-lg font-uni"
              onClick={() => {
                dispatch(setSelectedTwoFactor(0));
                dispatch(openTwoFADrawer());
              }}
              disabled={twoFactorAddress ? true : false}
            >
              <div className="flex gap-3">
                <KeyIcon className="h-7 w-7" />
                Passkey
              </div>
              {twoFactorAddress && selectedTwoFactor === 0 && (
                <Checkbox checked={checked} onChange={() => {}} />
              )}
            </Button>
            <Button
              size="lg"
              variant="outlined"
              className="flex items-center justify-between capitalize text-lg font-uni"
              onClick={() => {
                dispatch(setSelectedTwoFactor(1));
                dispatch(openTwoFADrawer());
              }}
              disabled={twoFactorAddress ? true : false}
            >
              <div className="flex gap-3">
                <Image
                  src="/images/onboard/setup/polygonID.svg"
                  width={40}
                  height={45}
                  alt="google"
                  className="-ml-2"
                />
                Polygon ID
              </div>
              {twoFactorAddress && selectedTwoFactor === 1 && (
                <Checkbox checked={checked} onChange={() => {}} />
              )}
            </Button>
            <Button
              size="lg"
              variant="outlined"
              className="flex items-center  capitalize justify-between text-lg font-uni mb-1"
              onClick={() => {
                dispatch(setSelectedTwoFactor(2));
                dispatch(openTwoFADrawer());
              }}
              disabled={twoFactorAddress ? true : false}
            >
              <div className="flex gap-3">
                <CreditCardIcon className="h-7 w-7" />
                Aadhar Card
              </div>
              {twoFactorAddress && selectedTwoFactor === 2 && (
                <Checkbox checked={checked} onChange={() => {}} />
              )}
            </Button>
          </>
        )}

        {!isTwoFactor && status !== "Recovery" && (
          <>
            <Button
              className="w-full text-white font-bold bg-black/80"
              size="lg"
              onClick={async () => {
                const tx = await prepareEnableTwoFactorAuth(
                  searchParams.get("wallet").split(":")[1],
                  twoFactorAddress
                );
                await executeTransaction(
                  searchParams.get("wallet").split(":")[1],
                  searchParams.get("wallet").split(":")[0],
                  tx,
                  "2FA Enabled"
                );
                dispatch(setTwoFactorAddress(""));
              }}
              disabled={!isOwner}
            >
              Enable 2FA
            </Button>
          </>
        )}

        {isTwoFactor && status !== "Recovery" && (
          <Button
            className="w-full text-white font-bold -mt-2 bg-black/80"
            size="lg"
            onClick={async () => {
              if (!twoFactorAddress) {
                toast.error("No 2FA method selected");
                return;
              }

              await initiateTransaction("changeTwoFactor", [twoFactorAddress]);
              dispatch(setTwoFactorAddress(""));
            }}
            disabled={!isOwner}
          >
            Change Two Factor
          </Button>
        )}

        {twoFactorAddress && status !== "Recovery" && (
          <Button
            className="w-full text-white font-bold -mt-2 text-black/80"
            size="lg"
            variant="outlined"
            onClick={async () => {
              dispatch(setTwoFactorAddress(""));
            }}
          >
            Reset
          </Button>
        )}

        {status == "Recovery" && (
          <>
            {" "}
            <Alert
              className="bg-black/80"
              icon={<InformationCircleIcon className="h-6 w-6" />}
            >
              <p className="font-uni">
                Wallet is in Recovery, You can disable the ongoing recovery if
                it is not authorized by you.
              </p>
            </Alert>
          </>
        )}

        {status === "Recovery" && (
          <Button
            className="w-full text-white font-bold -mt-2 bg-black/80"
            size="lg"
            disabled={!isOwner}
            onClick={() => {
              initiateTransaction("cancelRecovery", []);
            }}
          >
            Stop Recovery
          </Button>
        )}
      </Card>
    </div>
  );
}

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
} from "@material-tailwind/react";
import { useState } from "react";
import Image from "next/image";

export default function General() {
  const [cooldown, setCooldown] = useState(30);

  const isTwoFactor = true;

  const addCooldown = () => {
    setCooldown(cooldown + 10);
  };

  const substractCooldown = () => {
    setCooldown(cooldown - 10);
  };

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

        {!isTwoFactor && (
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
            <Button
              className="w-full text-white font-bold bg-black/80"
              size="lg"
            >
              Enable 2FA
            </Button>
          </>
        )}

        {isTwoFactor && (
          <>
            {" "}
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
              <Button className=" text-white font-bold bg-black/80" size="lg">
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
            <Button
              size="lg"
              variant="outlined"
              className="flex items-center justify-between  capitalize text-lg font-uni"
            >
              <div className="flex gap-3">
                <KeyIcon className="h-7 w-7" />
                Passkey
              </div>
            </Button>
            <Button
              size="lg"
              variant="outlined"
              className="flex items-center justify-between capitalize text-lg font-uni"
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
            </Button>
            <Button
              size="lg"
              variant="outlined"
              className="flex items-center  capitalize justify-between text-lg font-uni mb-1"
            >
              <div className="flex gap-3">
                <CreditCardIcon className="h-7 w-7" />
                Aadhar Card
              </div>
            </Button>
            <Button
              className="w-full text-white font-bold bg-black/80"
              size="lg"
            >
              Change Two Factor
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}

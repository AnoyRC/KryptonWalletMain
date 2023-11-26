"use client";
import {
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";

export default function Login() {
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
        <Button
          size="lg"
          variant="outlined"
          className="flex items-center gap-3 capitalize text-lg font-uni"
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
        >
          <Image
            src="/images/onboard/login/metamask.svg"
            width={30}
            height={30}
            alt="metamask"
          />
          Metamask
        </Button>
        <Button
          size="lg"
          variant="outlined"
          className="flex items-center gap-3 capitalize text-lg font-uni"
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
        >
          <Image
            src="/images/onboard/login/walletconnect.svg"
            width={30}
            height={30}
            alt="wallet connect"
          />
          Wallet Connect
        </Button>
      </CardBody>
      <CardFooter className="flex flex-col gap-4 -mt-7 text-center">
        <Typography color="gray">
          By connecting you agree to our{" "}
          <span className="text-blue-500">Terms of Service</span> and{" "}
          <span className="text-blue-500">Privacy Policy</span>
        </Typography>
      </CardFooter>
    </>
  );
}

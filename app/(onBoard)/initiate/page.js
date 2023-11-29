"use client";
import { openDrawer } from "@/redux/slice/sigManagerSlice";
import { InformationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  CardHeader,
  CardBody,
  Button,
  Input,
  Alert,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";

export default function Setup() {
  const dispatch = useDispatch();

  return (
    <>
      <CardHeader
        variant="gradient"
        color="gray"
        className="mt-4 grid h-20 place-items-center"
      >
        <h1 className="font-uni text-white text-3xl font-bold">2FA Recovery</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <h6 className="font-uni text-lg font-bold">Wallet Address</h6>
        <Input
          size="lg"
          placeholder="Enter Wallet Address"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />

        <Button
          size="lg"
          className="flex items-center justify-center -mt-2 gap-3 capitalize text-lg font-uni bg-black/80"
          onClick={() => dispatch(openDrawer())}
        >
          Initiate Recovery
        </Button>

        <Alert
          variant="gradient"
          icon={<InformationCircleIcon className="h-7 w-7" />}
          className="mb-2 mr-0"
        >
          You can Initiate Recovery only if you have enabled 2FA. If you have
          not enabled 2FA, Guardians can initiate recovery for you.
        </Alert>

        <Button
          size="lg"
          className="flex items-center justify-center -mt-2 gap-3 capitalize text-lg font-uni bg-black/80"
        >
          Connect Wallet
        </Button>
      </CardBody>
    </>
  );
}

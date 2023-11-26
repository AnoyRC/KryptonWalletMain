"use client";
import { setActiveStep } from "@/redux/slice/setupSlice";
import { CreditCardIcon, KeyIcon } from "@heroicons/react/24/outline";
import { Button, Checkbox, Chip } from "@material-tailwind/react";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function Step3() {
  const dispatch = useDispatch();
  const checked = true;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="font-uni text-lg font-bold flex gap-2">
        2FA
        <Chip value="disabled"></Chip>
        {/* <Chip value="enabled"></Chip> */}
      </div>
      <Button
        size="lg"
        variant="outlined"
        className="flex items-center justify-between  capitalize text-lg font-uni"
      >
        <div className="flex gap-3">
          <KeyIcon className="h-7 w-7" />
          Passkey
        </div>
        <Checkbox checked={checked} />
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
        {/* <Checkbox checked={checked} /> */}
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
        {/* <Checkbox checked={checked} /> */}
      </Button>

      <div className="flex justify-between">
        <Button
          size="md"
          variant="outlined"
          className="capitalize font-uni font-bold"
          onClick={() => {
            dispatch(setActiveStep(1));
          }}
        >
          Prev
        </Button>

        <Button
          size="md"
          className="capitalize font-uni font-bold"
          onClick={() => {
            dispatch(setActiveStep(3));
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

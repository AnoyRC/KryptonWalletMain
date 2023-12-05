"use client";
import {
  openTwoFADrawer,
  setActiveStep,
  setSelectedTwoFactor,
  setTwoFactorAddress,
} from "@/redux/slice/setupSlice";
import {
  ArrowPathIcon,
  CreditCardIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { Button, Checkbox, Chip } from "@material-tailwind/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export default function Step3() {
  const dispatch = useDispatch();
  const checked = true;
  const twoFactorAddress = useSelector((state) => state.setup.twoFactorAddress);
  const selectedTwoFactor = useSelector(
    (state) => state.setup.selectedTwoFactor
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="font-uni text-lg font-bold flex justify-between items-center gap-2">
        <div className="flex gap-2 items-center">
          2FA
          {twoFactorAddress && <Chip value="enabled"></Chip>}
          {!twoFactorAddress && <Chip value="disabled"></Chip>}
        </div>
        {twoFactorAddress && (
          <Button
            size="sm"
            className="flex items-center py-[7px] px-3 gap-2  capitalize text-xs font-bold font-uni"
            onClick={() => {
              dispatch(setTwoFactorAddress(null));
            }}
          >
            <ArrowPathIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
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

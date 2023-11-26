"use client";
import {
  closeTwoFADrawer,
  setTwoFactorAddress,
} from "@/redux/slice/setupSlice";
import { Button, Input } from "@material-tailwind/react";
import { useDispatch } from "react-redux";

export default function Passkey() {
  const dispatch = useDispatch();
  return (
    <>
      <h6 className="font-uni text-lg font-bold text-black">Enter Passkey</h6>
      <Input
        size="lg"
        placeholder="XXX-XXX"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        type="password"
      />
      <h6 className="font-uni text-lg font-bold text-black">Confirm Passkey</h6>
      <Input
        size="lg"
        placeholder="XXX-XXX"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        type="password"
      />

      <Button
        className="-mt-1"
        onClick={() => {
          dispatch(setTwoFactorAddress("0x00"));
          dispatch(closeTwoFADrawer());
        }}
      >
        {" "}
        Confirm Passkey{" "}
      </Button>
    </>
  );
}

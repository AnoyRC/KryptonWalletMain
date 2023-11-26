"use client";
import {
  closeTwoFADrawer,
  setTwoFactorAddress,
} from "@/redux/slice/setupSlice";
import { Button, Input } from "@material-tailwind/react";
import { useDispatch } from "react-redux";

export default function Aadhar() {
  const dispatch = useDispatch();
  return (
    <>
      <h6 className="font-uni text-lg font-bold text-black">Upload Aadhar</h6>
      <Input
        size="lg"
        placeholder="XXX-XXX"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        type="file"
      />
      <h6 className="font-uni text-lg font-bold text-black">
        Upload Certificate
      </h6>
      <Input
        size="lg"
        placeholder="XXX-XXX"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2 "
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        type="file"
      />

      <Button
        className="-mt-1"
        onClick={() => {
          dispatch(setTwoFactorAddress("0x00"));
          dispatch(closeTwoFADrawer());
        }}
        size="lg"
      >
        {" "}
        Confirm Aadhar Card{" "}
      </Button>
    </>
  );
}

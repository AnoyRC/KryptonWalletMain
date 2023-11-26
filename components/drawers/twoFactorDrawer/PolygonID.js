"use client";
import {
  closeTwoFADrawer,
  setTwoFactorAddress,
} from "@/redux/slice/setupSlice";
import { Button, Input } from "@material-tailwind/react";
import { useDispatch } from "react-redux";

export default function PolygonID() {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        className="-mt-1"
        onClick={() => {
          dispatch(setTwoFactorAddress("0x00"));
          dispatch(closeTwoFADrawer());
        }}
        size="lg"
      >
        {" "}
        Confirm Polygon ID{" "}
      </Button>
    </>
  );
}

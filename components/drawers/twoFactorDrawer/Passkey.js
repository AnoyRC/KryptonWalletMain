"use client";
import useTwoFactor from "@/hooks/useTwoFactor";
import {
  closeTwoFADrawer,
  setTwoFactorAddress,
} from "@/redux/slice/setupSlice";
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Passkey() {
  const dispatch = useDispatch();
  const { createWalletFromSeed } = useTwoFactor();
  const [passkey, setPasskey] = useState("");
  const [confirmPasskey, setConfirmPasskey] = useState("");

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
        value={passkey}
        onChange={(e) => setPasskey(e.target.value)}
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
        value={confirmPasskey}
        onChange={(e) => setConfirmPasskey(e.target.value)}
      />

      <Button
        className="-mt-1"
        onClick={async () => {
          if (passkey.length < 6) {
            toast.error("Passkey must be at least 6 characters");
            return;
          }

          if (passkey !== confirmPasskey) {
            toast.error("Passkeys do not match");
            return;
          }

          const address = await createWalletFromSeed(passkey);
          dispatch(setTwoFactorAddress(address));
          dispatch(closeTwoFADrawer());
        }}
        size="lg"
      >
        {" "}
        Confirm Passkey{" "}
      </Button>
    </>
  );
}

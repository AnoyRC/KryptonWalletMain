"use client";

import { handleGuardianWalletDialog } from "@/redux/slice/setupSlice";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Image from "next/image";
import { CheckIcon } from "@heroicons/react/24/outline";

export function AddGuardianWalletDialog() {
  const guardianWalletDialog = useSelector(
    (state) => state.setup.guardianWalletDialog
  );
  const dispatch = useDispatch();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const demoCallback = () => {
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 2000);
  };

  return (
    <>
      <Dialog
        size="xs"
        open={guardianWalletDialog}
        handler={() => {
          dispatch(handleGuardianWalletDialog());
        }}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          {!isVerifying && !isVerified && (
            <CardBody className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold font-uni">
                Add Guardian Wallet
              </h2>

              <h6 className="font-uni text-lg font-bold">Wallet Address</h6>
              <Input
                size="lg"
                placeholder="0x00"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </CardBody>
          )}
          <CardFooter className="pt-0 -mt-3">
            {!isVerifying && !isVerified && (
              <Button
                size="lg"
                onClick={() => {
                  setIsVerifying(true);
                  demoCallback();
                }}
                fullWidth
              >
                Verify
              </Button>
            )}

            {isVerifying && (
              <div className="w-full flex justify-center gap-2 mt-10">
                <h2 className="text-lg font-bold font-uni">Verifying</h2>
                <Image
                  src="/images/onboard/setup/loading.svg"
                  width={20}
                  height={20}
                  alt="loading"
                  className="opacity-50 animate-spin"
                />
              </div>
            )}

            {isVerified && (
              <>
                <div className="w-full flex justify-center gap-2 mt-10">
                  <h2 className="text-lg font-bold font-uni">
                    Verified and Added
                  </h2>
                  <CheckIcon className="text-black w-5 h-5 mt-1 animate-bounce" />
                </div>
                <Button
                  size="lg"
                  onClick={() => {
                    dispatch(handleGuardianWalletDialog());
                    setIsVerified(false);
                    setIsVerifying(false);
                  }}
                  fullWidth
                  className="mt-3"
                >
                  Go to Dashboard
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

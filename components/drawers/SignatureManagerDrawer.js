"use client";

import {
  CreditCardIcon,
  KeyIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Drawer,
  IconButton,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Button,
} from "@material-tailwind/react";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";

import useSignPayload from "@/hooks/useSignPayload";
import useSendTransaction from "@/hooks/useSendTransaction";

import {
  setFnArgs,
  setFnName,
  setSuccessMessage,
} from "@/redux/slice/walletSlice";
import {
  closeDrawer,
  setSignature,
  closeInitiateDrawer,
} from "@/redux/slice/sigManagerSlice";

export default function SignatureManagerDrawer() {
  const dispatch = useDispatch();

  const [passkey, setPasskey] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const [anonAadhaar] = useAnonAadhaar();
  const { signMessage, signInitateMessage } = useSignPayload();
  const { use2FAsendWithSig, useNormalSendWithWallet } = useSendTransaction();

  const fnArgs = useSelector((state) => state.wallet.fnArgs);
  const fnName = useSelector((state) => state.wallet.fnName);
  const open = useSelector((state) => state.sigManager.drawer);
  const signature = useSelector((state) => state.sigManager.signature);
  const successMessage = useSelector((state) => state.wallet.successMessage);
  const initiate = useSelector((state) => state.sigManager.initiateDrawer);
  const initiateWalletAddress = useSelector(
    (state) => state.sigManager.initiateWalletAddress
  );
  const initiateChainId = useSelector(
    (state) => state.sigManager.intiateChainId
  );

  const handleAnonClick = async () => {
    if (!initiate)
      toast.promise(
        signMessage(`${anonAadhaar.pcd.proof.app_id}:${anonAadhaar.pcd.id}`),
        {
          loading: "Signing Message",
          success: "Message Signed",
          error: "Message Signing Failed",
        }
      );
    else
      toast.promise(
        signInitateMessage(
          `${anonAadhaar.pcd.proof.app_id}:${anonAadhaar.pcd.id}`,
          initiateWalletAddress,
          initiateChainId
        ),
        {
          loading: "Signing Message",
          success: "Message Signed",
          error: "Message Signing Failed",
        }
      );
  };

  const handleCloseDrawer = () => {
    dispatch(closeInitiateDrawer());
    dispatch(closeDrawer());
    dispatch(setFnName(""));
    dispatch(setFnArgs([]));
    dispatch(setSignature(""));
    dispatch(setSuccessMessage(""));

    toast.success("Transaction Cancelled");
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={() => {
          handleCloseDrawer();
        }}
        className="px-4 flex flex-col justify-between"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between pb-2">
            <div className="flex flex-col gap-[2px]">
              <h2 className="text-2xl font-uni text-black text-bold mt-5 font-bold">
                Signature Manager
              </h2>
              <p className="text-md font-uni text-black">
                Two Factor Ecosystem
              </p>
            </div>

            <IconButton
              variant="text"
              color="blue-gray"
              onClick={() => {
                handleCloseDrawer();
              }}
            >
              <XMarkIcon className="w-6 h-6" />
            </IconButton>
          </div>

          <div className="flex flex-col  gap-4">
            <Accordion open={activeTab === 0}>
              <AccordionHeader
                onClick={() => setActiveTab(0)}
                className="justify-start items-center"
              >
                <KeyIcon className="h-5 w-5 mr-2 mb-1" />
                Passkey
              </AccordionHeader>

              <AccordionBody className="flex flex-col gap-3">
                <h6 className="font-uni text-lg font-bold text-black">
                  Enter Passkey
                </h6>
                <p>
                  Enter the passkey you have set for your 2FA. Passkey is not
                  used for any other purpose.
                </p>

                <Input
                  size="lg"
                  placeholder="XXX-XXX"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                />

                <Button
                  className=""
                  size="md"
                  onClick={() => {
                    if (passkey.length < 6)
                      return toast.error(
                        "Passkey must be at least 6 characters long"
                      );

                    if (!initiate)
                      toast.promise(signMessage(passkey), {
                        loading: "Signing Message",
                        success: "Message Signed",
                        error: "Message Signing Failed",
                      });
                    else
                      toast.promise(
                        signInitateMessage(
                          passkey,
                          initiateWalletAddress,
                          initiateChainId
                        ),
                        {
                          loading: "Signing Message",
                          success: "Message Signed",
                          error: "Message Signing Failed",
                        }
                      );
                  }}
                >
                  Sign
                </Button>
              </AccordionBody>
            </Accordion>

            <Accordion open={activeTab === 1}>
              <AccordionHeader
                onClick={() => setActiveTab(1)}
                className="justify-start"
              >
                <Image
                  src="/images/onboard/setup/polygonID.svg"
                  width={35}
                  height={45}
                  alt="google"
                  className="-ml-2 opacity-70"
                />
                Polygon ID
              </AccordionHeader>

              <AccordionBody className="flex flex-col gap-3">
                <p>
                  Enter the Polygon ID you have set for your 2FA. Polygon ID is
                  not used for any other purpose.
                </p>
                <Button className="" size="md">
                  Sign
                </Button>
              </AccordionBody>
            </Accordion>

            <Accordion open={activeTab === 2}>
              <AccordionHeader
                onClick={() => setActiveTab(2)}
                className="justify-start"
              >
                <CreditCardIcon className="h-5 w-5 mr-2 mb-1" />
                Anon Aadhar
              </AccordionHeader>

              <AccordionBody className="flex flex-col gap-4">
                <p>
                  Upload your Marked Aadhar Card and Certificate to verify your
                  identity.
                </p>

                <div className="font-sans">
                  <LogInWithAnonAadhaar />
                </div>

                {anonAadhaar.status === "logged-in" && (
                  <Button className="mt-1" onClick={handleAnonClick} size="md">
                    Confirm Aadhar Card
                  </Button>
                )}
              </AccordionBody>
            </Accordion>
          </div>
        </div>

        <Button
          className="mb-4"
          size="lg"
          onClick={async () => {
            if (!initiate) {
              if (!signature)
                return toast.error("Please sign the message first");

              toast.promise(
                use2FAsendWithSig(fnName, fnArgs, successMessage, signature),
                {
                  loading: "Executing Transaction",
                  success: "Transaction Executed",
                  error: "Transaction Failed",
                }
              );

              dispatch(closeDrawer());
              dispatch(setFnName(""));
              dispatch(setFnArgs([]));
              dispatch(setSignature(""));
              dispatch(setSuccessMessage(""));
            } else {
              if (!signature)
                return toast.error("Please sign the message first");

              const combinedArgs = [...fnArgs, signature];

              toast.promise(
                useNormalSendWithWallet(
                  fnName,
                  combinedArgs,
                  initiateWalletAddress,
                  successMessage
                ),
                {
                  loading: "Executing Transaction",
                  success: "Transaction Executed",
                  error: "Transaction Failed",
                }
              );

              dispatch(closeInitiateDrawer());
              dispatch(closeDrawer());
              dispatch(setFnName(""));
              dispatch(setFnArgs([]));
              dispatch(setSignature(""));
              dispatch(setSuccessMessage(""));
            }
          }}
        >
          Execute Transaction
        </Button>
      </Drawer>
    </>
  );
}

'use client';

import { closeDrawer } from '@/redux/slice/sigManagerSlice';
import {
  CreditCardIcon,
  KeyIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  Drawer,
  IconButton,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Button,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Image from 'next/image';
import useSignPayload from '@/hooks/useSignPayload';
import useSendTransaction from '@/hooks/useSendTransaction';

export default function SignatureManagerDrawer() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.sigManager.drawer);
  const [activeTab, setActiveTab] = useState(0);
  const { signMessage } = useSignPayload();
  const [passkey, setPasskey] = useState('');
  const signature = useSelector((state) => state.sigManager.signature);
  const fnName = useSelector((state) => state.wallet.fnName);
  const fnArgs = useSelector((state) => state.wallet.fnArgs);
  const successMessage = useSelector((state) => state.wallet.successMessage);
  const { use2FAsendWithSig } = useSendTransaction();

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
    dispatch(setFnName(''));
    dispatch(setFnArgs([]));
    dispatch(setSignature(''));
    dispatch(setSuccessMessage(''));
    toast.success('Transaction Cancelled');
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
            {/* Passkey */}
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
                    className: 'before:content-none after:content-none',
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
                        'Passkey must be at least 6 characters long'
                      );
                    toast.promise(signMessage(passkey), {
                      loading: 'Signing Message',
                      success: 'Message Signed',
                      error: 'Message Signing Failed',
                    });
                  }}
                >
                  Sign
                </Button>
              </AccordionBody>
            </Accordion>

            {/* Polygon ID */}
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

            {/* Aadhar */}
            <Accordion open={activeTab === 2}>
              <AccordionHeader
                onClick={() => setActiveTab(2)}
                className="justify-start"
              >
                <CreditCardIcon className="h-5 w-5 mr-2 mb-1" />
                Anon Aadhar
              </AccordionHeader>
              <AccordionBody className="flex flex-col gap-3">
                <p>
                  Upload your Aadhar Card and Certificate to verify your
                  identity.
                </p>
                <h6 className="font-uni text-lg font-bold text-black">
                  Upload Aadhar
                </h6>
                <Input
                  size="lg"
                  placeholder="XXX-XXX"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
                  labelProps={{
                    className: 'before:content-none after:content-none',
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
                    className: 'before:content-none after:content-none',
                  }}
                  type="file"
                />

                <Button
                  className="-mt-1"
                  onClick={() => {
                    dispatch(setTwoFactorAddress('0x00'));
                    dispatch(closeTwoFADrawer());
                  }}
                  size="md"
                >
                  {' '}
                  Confirm Aadhar Card{' '}
                </Button>
              </AccordionBody>
            </Accordion>
          </div>
        </div>

        <Button
          className="mb-4"
          size="lg"
          onClick={async () => {
            if (!signature) return toast.error('Please sign the message first');

            toast.success('Executing Transaction');

            toast.promise(
              use2FAsendWithSig(fnName, fnArgs, successMessage, signature),
              {
                loading: 'Executing Transaction',
                success: 'Transaction Executed',
                error: 'Transaction Failed',
              }
            );

            dispatch(closeDrawer());
            dispatch(setFnName(''));
            dispatch(setFnArgs([]));
            dispatch(setSignature(''));
            dispatch(setSuccessMessage(''));
          }}
        >
          Execute Transaction
        </Button>
      </Drawer>
    </>
  );
}

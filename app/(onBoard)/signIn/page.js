'use client';

import { CardHeader, CardBody, Button, Alert } from '@material-tailwind/react';
import {
  ArrowLeftOnRectangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

import { useAccount } from 'wagmi';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import { toggleSignDrawer } from '@/redux/slice/sigManagerSlice';

export default function Setup() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isConnected } = useAccount();

  return (
    <>
      <CardHeader
        variant="gradient"
        color="gray"
        className="mt-4 grid h-20 place-items-center"
      >
        <h2 className="font-uni text-white text-3xl font-bold">Invalid Link</h2>
      </CardHeader>

      <CardBody className="flex flex-col gap-4">
        {isConnected && (
          <>
            <Button
              size="lg"
              className="flex items-center justify-center -mt-2 gap-3 capitalize text-lg font-uni bg-black/80"
              disabled
            >
              Sign Message
            </Button>

            <Alert
              variant="gradient"
              icon={<InformationCircleIcon className="h-7 w-7" />}
              className="mb-2 mr-0"
            >
              Invalid Link: The token may have expired or the link is invalid.
              Ask the guardian to send a new link.
            </Alert>

            <Button
              size="lg"
              variant="outlined"
              className="flex items-center gap-3 -mt-2 capitalize text-lg font-uni"
              onClick={() => router.push('/wallet')}
            >
              <ArrowLeftOnRectangleIcon className="h-7 w-7" />
              Back To Wallet
            </Button>
          </>
        )}
      </CardBody>
    </>
  );
}

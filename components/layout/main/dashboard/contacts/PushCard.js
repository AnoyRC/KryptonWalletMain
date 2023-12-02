'use client';

import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Button } from '@material-tailwind/react';
import { LockClosedIcon } from '@heroicons/react/24/outline';

import { usePush } from '@/hooks/usePush';

const PushCard = ({ setIsSigned }) => {
  const { initializePush } = usePush();
  const pushSign = useSelector((state) => state.contacts.pushSign);

  const handleClick = async () => {
    try {
      await initializePush();
      setIsSigned(true);
    } catch (e) {
      setIsSigned(false);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center w-full h-full py-6">
      <section className="flex justify-center h-full items-center flex-col">
        <Image
          src="/images/main/dashboard/contacts/pushLogo.svg"
          alt="Push protocol logo"
          width={110}
          height={42}
        />

        <h3 className="text-primary-white/60 font-bold text-2xl leading-normal mt-4">
          Push Protocol
        </h3>

        <p className="text-primary-white/60 max-w-xs text-center mt-1">
          Sign in to send and receive messages to your contacts using Push.
        </p>

        <Button
          size="lg"
          className="bg-[#dd44b9] font-uni disabled:opacity-50 disabled:cursor-default mt-8"
          disabled={pushSign !== null ? true : false}
          onClick={handleClick}
        >
          Click to Sign
        </Button>
      </section>

      <p className="flex text-sm gap-1 items-center">
        <LockClosedIcon className="w-4 h-4" />
        End to end encrypted
      </p>
    </div>
  );
};

export default PushCard;

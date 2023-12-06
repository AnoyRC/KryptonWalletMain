'use client';

import {
  closeTwoFADrawer,
  setTwoFactorAddress,
} from '@/redux/slice/setupSlice';
import { useDispatch } from 'react-redux';
import { LogInWithAnonAadhaar, useAnonAadhaar } from 'anon-aadhaar-react';
import { Button } from '@material-tailwind/react';
import useTwoFactor from '@/hooks/useTwoFactor';
import { useEffect } from 'react';

export default function Aadhar() {
  const dispatch = useDispatch();
  const [anonAadhaar] = useAnonAadhaar();
  const { createWalletFromSeed } = useTwoFactor();

  const handleClick = async () => {
    const address = await createWalletFromSeed(
      `${anonAadhaar.pcd.proof.app_id}:${anonAadhaar.pcd.id}`
    );

    dispatch(setTwoFactorAddress(address));
    dispatch(closeTwoFADrawer());
  };

  return (
    <>
      <div>
        <h3 className="font-uni text-xl font-bold text-black">
          Connect Aadhaar
        </h3>

        <p className="text-md font-uni text-black">
          Connect your Aadhaar to configure 2 factor auth.
        </p>
      </div>

      <div className="font-sans">
        <LogInWithAnonAadhaar />
      </div>

      {anonAadhaar.status === 'logged-in' && (
        <Button className="mt-2" onClick={handleClick} size="lg">
          Confirm Aadhaar
        </Button>
      )}
    </>
  );
}

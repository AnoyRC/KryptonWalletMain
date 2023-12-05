'use client';

import { AnonAadhaarProvider } from 'anon-aadhaar-react';

const AnonProvider = ({ children }) => {
  const appId = process.env.NEXT_PUBLIC_AADHAAR_APP_ID;

  return (
    <AnonAadhaarProvider _appId={appId} _testing={false}>
      {children}
    </AnonAadhaarProvider>
  );
};

export default AnonProvider;

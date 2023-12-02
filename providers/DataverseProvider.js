'use client';

import { DataverseContextProvider } from '@dataverse/hooks';

const DataverseProvider = ({ children }) => {
  return (
    typeof window !== 'undefined' && (
      <DataverseContextProvider>{children}</DataverseContextProvider>
    )
  );
};

export default DataverseProvider;

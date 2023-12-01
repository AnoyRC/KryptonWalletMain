'use client';

import { DataverseContextProvider } from '@dataverse/hooks';

const DataverseProvider = ({ children }) => {
  return <DataverseContextProvider>{children}</DataverseContextProvider>;
};

export default DataverseProvider;

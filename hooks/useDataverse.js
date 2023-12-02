'use client';

import { RESOURCE, SYSTEM_CALL } from '@dataverse/dataverse-connector';
import { DataverseConnector } from '@dataverse/dataverse-connector';

export function useDataverse() {
  const dataverseConnector = new DataverseConnector();
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const userModalId = process.env.NEXT_PUBLIC_USER_MODAL_ID;
  const guardianModalId = process.env.NEXT_PUBLIC_GUARDIAN_MODAL_ID;

  const createCapability = async () => {
    const pkh = await dataverseConnector.runOS({
      method: SYSTEM_CALL.createCapability,

      params: {
        appId,
        resource: RESOURCE.CERAMIC,
        wallet,
      },
    });

    return pkh;
  };

  const getUser = async (pkh) => {
    const user = await dataverseConnector.runOS({
      method: SYSTEM_CALL.loadStreamsBy,

      params: {
        userModalId,
        pkh,
      },
    });

    return user;
  };

  const createUser = async (
    walletAddress,
    kryptonName,
    kryptonAddress,
    kryptonChainId,
    kryptonGuardianId,
    subAddress,
    guardiansAddress
  ) => {
    const user = await dataverseConnector.runOS({
      method: SYSTEM_CALL.createStream,

      params: {
        userModalId,

        streamContent: {
          walletAddress,
          kryptonName,
          kryptonAddress,
          kryptonChainId,
          kryptonGuardianId,
          subAddress,
          guardiansAddress,
        },
      },
    });

    return user;
  };

  const updateUser = async (
    walletAddress,
    kryptonName,
    kryptonAddress,
    kryptonChainId,
    kryptonGuardianId,
    subAddress,
    guardiansAddress
  ) => {
    const user = await dataverseConnector.runOS({
      method: SYSTEM_CALL.updateStream,

      params: {
        streamId,

        streamContent: {
          walletAddress,
          kryptonName,
          kryptonAddress,
          kryptonChainId,
          kryptonGuardianId,
          subAddress,
          guardiansAddress,
        },
      },
    });

    return user;
  };

  const getGuardian = async (streamId) => {
    await dataverseConnector.runOS({
      method: SYSTEM_CALL.loadStream,
      params: streamId,
    });
  };

  const createGuardian = async (name, address) => {
    await dataverseConnector.runOS({
      method: SYSTEM_CALL.createStream,

      params: {
        guardianModalId,
        streamContent: {
          name,
          address,
        },
      },
    });
  };

  const updateGuardian = async (streamId, name, address) => {
    await dataverseConnector.runOS({
      method: SYSTEM_CALL.updateStream,

      params: {
        streamId,
        streamContent: {
          name,
          address,
        },
      },
    });
  };

  return {
    createCapability,
    getUser,
    createUser,
    updateUser,
    getGuardian,
    createGuardian,
    updateGuardian,
  };
}

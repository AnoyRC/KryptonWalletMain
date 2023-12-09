"use client";

import { useAccount } from "wagmi";
import axios from "axios";

export default function useServer() {
  const { address } = useAccount();

  const createKrypton = async (name, kryptonAddress, guardians) => {
    try {
      const AllGuardians = await Promise.all(
        guardians.map(async (guardian) => {
          const body = {
            address: kryptonAddress,
            walletAddress: address,
            name: guardian.name,
            guardianAddress: guardian.address,
          };

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/kryptonGuardian`,
            body
          );

          return res.data;
        })
      );

      const body = {
        address: kryptonAddress,
        walletAddress: address,
        kryptonName: name,
        kryptonAddress: kryptonAddress.split(":")[1],
        kryptonGuardianId: AllGuardians.map((guardian) => guardian._id),
      };

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/krypton/create`,
        body
      );

      const kryptonId = data._id;

      const mainBody = {
        address: kryptonAddress,
        walletAddress: address,
        id: address,
        kryptonWallet: [kryptonId],
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
        mainBody
      );

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateKryptonName = async (name, kryptonAddress, id) => {
    try {
      const body = {
        address: kryptonAddress,
        walletAddress: address,
        kryptonName: name,
      };

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/krypton/updateName/${id}`,
        body
      );

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateGuardianAddress = async (kryptonAddress, id, guardianAddress) => {
    try {
      const body = {
        address: kryptonAddress,
        walletAddress: address,
        guardianAddress: guardianAddress,
      };

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/kryptonGuardian/${id}/address`,
        body
      );

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return { createKrypton };
}

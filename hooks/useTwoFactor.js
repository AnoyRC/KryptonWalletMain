"use client";

import { keccak256 } from "viem";
import { privateKeyToAddress } from "viem/accounts";

export default function useTwoFactor() {
  const createWalletFromSeed = async (seed) => {
    const inputs = Array.isArray(seed) ? seed : [seed];
    const hash = inputs.reduce((acc, curr) => acc + curr, "");

    const account = privateKeyToAddress(keccak256(Buffer.from(hash)));
    return account;
  };

  return {
    createWalletFromSeed,
  };
}

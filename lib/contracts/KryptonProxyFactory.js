const KryptonProxyFactory = {
  address: "0xCd8f39c48132d3fEfFaF5Dc202B0e2a912D056F1",
  abi: [
    {
      inputs: [
        {
          internalType: "contract IEntryPoint",
          name: "_entryPoint",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "accountImplementation",
      outputs: [
        {
          internalType: "contract Krypton",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address[]",
          name: "guardianAddr",
          type: "address[]",
        },
        {
          internalType: "uint256",
          name: "threshold",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "salt",
          type: "uint256",
        },
      ],
      name: "createAccount",
      outputs: [
        {
          internalType: "contract Krypton",
          name: "ret",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address[]",
          name: "guardianAddr",
          type: "address[]",
        },
        {
          internalType: "uint256",
          name: "threshold",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "salt",
          type: "uint256",
        },
      ],
      name: "getAddress",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  inheritedFunctions: {},
};

export default KryptonProxyFactory;

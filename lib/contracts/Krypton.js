const Krypton = {
  address: "0xB1DEE490c6d402940CA3B48B773A272a57a56Be6",
  abi: [
    {
      inputs: [
        {
          internalType: "contract IEntryPoint",
          name: "anEntryPoint",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "previousAdmin",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "newAdmin",
          type: "address",
        },
      ],
      name: "AdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "by",
          type: "address",
        },
      ],
      name: "AvailabilityTimePeriodChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "beacon",
          type: "address",
        },
      ],
      name: "BeaconUpgraded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "by",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "newGuardian",
          type: "address",
        },
      ],
      name: "GuardianAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "by",
          type: "address",
        },
      ],
      name: "GuardianAvailabilityChecked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "guardian",
          type: "address",
        },
      ],
      name: "GuardianAvailable",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "by",
          type: "address",
        },
      ],
      name: "GuardianshipTransferCancelled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "newGuardian",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "oldGuardian",
          type: "address",
        },
      ],
      name: "GuardianshipTransferExecuted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "newGuardian",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "oldGuardian",
          type: "address",
        },
      ],
      name: "GuardianshipTransferInitiated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint8",
          name: "version",
          type: "uint8",
        },
      ],
      name: "Initialized",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "contract IEntryPoint",
          name: "entryPoint",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "KryptonInitialized",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "by",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "round",
          type: "uint256",
        },
      ],
      name: "RecoveryCancelled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "oldOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "round",
          type: "uint256",
        },
      ],
      name: "RecoveryExecuted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "by",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "newProposedOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "round",
          type: "uint256",
        },
      ],
      name: "RecoveryInitiated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "by",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "newProposedOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "round",
          type: "uint256",
        },
      ],
      name: "RecoverySupported",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "by",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "newThreshold",
          type: "uint256",
        },
      ],
      name: "ThresholdUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "by",
          type: "address",
        },
      ],
      name: "TwoFactorChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "by",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "cooldown",
          type: "uint256",
        },
      ],
      name: "TwoFactorCooldownChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "by",
          type: "address",
        },
      ],
      name: "TwoFactorEnabled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "implementation",
          type: "address",
        },
      ],
      name: "Upgraded",
      type: "event",
    },
    {
      inputs: [],
      name: "AvailabilityCheckTimePeriod",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "addDeposit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newGuardian",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "addGuardian",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "cancelGuardianshipTransfer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "cancelRecovery",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_days",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "changeAvalabilityTimePeriod",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_newTwoFactorOwner",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "changeTwoFactorAuth",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_cooldown",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "changeTwoFactorCooldown",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "currRecoveryRound",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_threshold",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "editThreshold",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_twoFactorOwner",
          type: "address",
        },
      ],
      name: "enableTwoFactorAuth",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "entryPoint",
      outputs: [
        {
          internalType: "contract IEntryPoint",
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
          name: "dest",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "func",
          type: "bytes",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "execute",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "dest",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "value",
          type: "uint256[]",
        },
        {
          internalType: "bytes[]",
          name: "func",
          type: "bytes[]",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "executeBatch",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "guardianList",
          type: "address[]",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "executeGuardianAvailabilityCheck",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "appellant",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "executeGuardianshipTransfer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
        {
          internalType: "address[]",
          name: "guardianList",
          type: "address[]",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "executeRecovery",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllGuardians",
      outputs: [
        {
          internalType: "bytes32[]",
          name: "",
          type: "bytes32[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getDeposit",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_messageHash",
          type: "bytes32",
        },
      ],
      name: "getEthSignedMessageHash",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_message",
          type: "string",
        },
      ],
      name: "getMessageHash",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "getNonce",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTimeBasedMsg",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "guardianChangeRequest",
      outputs: [
        {
          internalType: "address",
          name: "proposedGuardian",
          type: "address",
        },
        {
          internalType: "address",
          name: "guardianToChange",
          type: "address",
        },
        {
          internalType: "bool",
          name: "isUsed",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "guardianRecoveryRequest",
      outputs: [
        {
          internalType: "address",
          name: "proposedOwner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "recoveryRound",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "isUsed",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "guardianToRemoveTimestamp",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "inGuardianRequest",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "inRecovery",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "address[]",
          name: "guardianAddr",
          type: "address[]",
        },
        {
          internalType: "uint256",
          name: "_threshold",
          type: "uint256",
        },
      ],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_proposedOwner",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "initiateRecovery",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_guardian",
          type: "address",
        },
      ],
      name: "isGuardian",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "isTwoFactorEnabled",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "onERC1155BatchReceived",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "onERC1155Received",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "onERC721Received",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
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
    {
      inputs: [],
      name: "proxiableUUID",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "supportAvailability",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_proposedOwner",
          type: "address",
        },
      ],
      name: "supportRecovery",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "threshold",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "tokensReceived",
      outputs: [],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "guardianToChange",
          type: "address",
        },
        {
          internalType: "address",
          name: "newGuardian",
          type: "address",
        },
      ],
      name: "transferGuardianship",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "twoFactorCooldown",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "twoFactorOwner",
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
    {
      inputs: [
        {
          internalType: "address",
          name: "newImplementation",
          type: "address",
        },
      ],
      name: "upgradeTo",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newImplementation",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "upgradeToAndCall",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "nonce",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "initCode",
              type: "bytes",
            },
            {
              internalType: "bytes",
              name: "callData",
              type: "bytes",
            },
            {
              internalType: "uint256",
              name: "callGasLimit",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "verificationGasLimit",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "preVerificationGas",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "maxFeePerGas",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "maxPriorityFeePerGas",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "paymasterAndData",
              type: "bytes",
            },
            {
              internalType: "bytes",
              name: "signature",
              type: "bytes",
            },
          ],
          internalType: "struct UserOperation",
          name: "userOp",
          type: "tuple",
        },
        {
          internalType: "bytes32",
          name: "userOpHash",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "missingAccountFunds",
          type: "uint256",
        },
      ],
      name: "validateUserOp",
      outputs: [
        {
          internalType: "uint256",
          name: "validationData",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "verifyTwoFactor",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "withdrawAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdrawDepositTo",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ],
  inheritedFunctions: {
    onERC1155BatchReceived: "contracts/callback/TokenCallbackHandler.sol",
    onERC1155Received: "contracts/callback/TokenCallbackHandler.sol",
    onERC721Received: "contracts/callback/TokenCallbackHandler.sol",
    supportsInterface: "contracts/callback/TokenCallbackHandler.sol",
    tokensReceived: "contracts/callback/TokenCallbackHandler.sol",
    proxiableUUID: "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol",
    upgradeTo: "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol",
    upgradeToAndCall: "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol",
    AvailabilityCheckTimePeriod: "contracts/base/GuardianManager.sol",
    addGuardian: "contracts/base/GuardianManager.sol",
    cancelGuardianshipTransfer: "contracts/base/GuardianManager.sol",
    cancelRecovery: "contracts/base/GuardianManager.sol",
    changeAvalabilityTimePeriod: "contracts/base/GuardianManager.sol",
    changeTwoFactorAuth: "contracts/base/GuardianManager.sol",
    changeTwoFactorCooldown: "contracts/base/GuardianManager.sol",
    currRecoveryRound: "contracts/base/GuardianManager.sol",
    editThreshold: "contracts/base/GuardianManager.sol",
    enableTwoFactorAuth: "contracts/base/GuardianManager.sol",
    entryPoint: "contracts/base/GuardianManager.sol",
    executeGuardianAvailabilityCheck: "contracts/base/GuardianManager.sol",
    executeGuardianshipTransfer: "contracts/base/GuardianManager.sol",
    executeRecovery: "contracts/base/GuardianManager.sol",
    getAllGuardians: "contracts/base/GuardianManager.sol",
    getEthSignedMessageHash: "contracts/base/GuardianManager.sol",
    getMessageHash: "contracts/base/GuardianManager.sol",
    getNonce: "contracts/base/GuardianManager.sol",
    getTimeBasedMsg: "contracts/base/GuardianManager.sol",
    guardianChangeRequest: "contracts/base/GuardianManager.sol",
    guardianRecoveryRequest: "contracts/base/GuardianManager.sol",
    guardianToRemoveTimestamp: "contracts/base/GuardianManager.sol",
    inGuardianRequest: "contracts/base/GuardianManager.sol",
    inRecovery: "contracts/base/GuardianManager.sol",
    initialize: "contracts/base/GuardianManager.sol",
    initiateRecovery: "contracts/base/GuardianManager.sol",
    isGuardian: "contracts/base/GuardianManager.sol",
    isTwoFactorEnabled: "contracts/base/GuardianManager.sol",
    owner: "contracts/base/GuardianManager.sol",
    supportAvailability: "contracts/base/GuardianManager.sol",
    supportRecovery: "contracts/base/GuardianManager.sol",
    threshold: "contracts/base/GuardianManager.sol",
    transferGuardianship: "contracts/base/GuardianManager.sol",
    twoFactorCooldown: "contracts/base/GuardianManager.sol",
    twoFactorOwner: "contracts/base/GuardianManager.sol",
    validateUserOp: "contracts/base/GuardianManager.sol",
    verifyTwoFactor: "contracts/base/GuardianManager.sol",
  },
};

export default Krypton;

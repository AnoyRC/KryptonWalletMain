export const ChainConfig = [
  {
    name: "Mumbai",
    chainId: 80001,
    rpc: `https://polygon-mumbai.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    explorer: "https://mumbai.polygonscan.com/",
    color: "#8836c6",
    symbol: "MATIC",
    decimals: 18,
    isTestnet: true,
    tokens: [
      {
        name: "MATIC",
        isNative: true,
        address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
        feedId: "MATICUSDT",
        icon: "polygon",
        nativeName: "Polygon",
        decimals: 18,
      },
      {
        name: "USDC",
        isNative: false,
        address: "0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e",
        feedId: "USDCUSDT",
        icon: "usdc",
        nativeName: "USD Coin",
        decimals: 6,
      },
    ],
  },
];

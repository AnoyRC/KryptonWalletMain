export const ChainConfig = [
  {
    factory: "0xCd8f39c48132d3fEfFaF5Dc202B0e2a912D056F1",
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
        address: "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
        feedId: "USDCUSDT",
        icon: "usdc",
        nativeName: "USD Coin",
        decimals: 6,
      },
    ],
  },
];

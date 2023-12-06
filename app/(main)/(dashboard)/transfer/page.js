"use client";
import {
  ArrowsRightLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Card, Alert, Button, Select, Option } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChainConfig } from "@/lib/chainConfig";
import { useSearchParams } from "next/navigation";
import { useAccount, useBalance } from "wagmi";
import { createPublicClient, http } from "viem";
import useSendTransaction from "@/hooks/useSendTransaction";
import { BigNumber, ethers } from "ethers";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Tokens() {
  const [amount, setAmount] = useState("0.00");
  const [selected, setSelected] = useState("");
  const [recipient, setRecipient] = useState("");

  const [errorTitle, setErrorTitle] = useState("Invalid Recipient");
  const [errorDescription, setErrorDescription] = useState(
    "Please check the recipient address and try again."
  );
  const searchParams = useSearchParams();
  const [isError, setIsError] = useState(false);
  const currentConfig = ChainConfig.find(
    (chain) =>
      chain.chainId.toString() === searchParams.get("wallet")?.split(":")[0]
  );
  const { initiateTransaction } = useSendTransaction();
  const isOwner = useSelector((state) => state.wallet.isOwner);

  useEffect(() => {
    if (searchParams.get("wallet")) {
      setSelected(
        ChainConfig.find(
          (chain) =>
            chain.chainId.toString() ===
            searchParams.get("wallet")?.split(":")[0]
        )?.tokens[0].name
      );
    }
  }, [searchParams]);

  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-4">
            <h6 className="font-uni text-3xl text-black font-bold">Transfer</h6>
            <p className="font-uni text-lg text-black/60 -mt-3">
              Transfer your tokens to other wallets
            </p>
          </div>
          <Card className="flex gap-1 font-uni bg-black/80 text-white flex-row p-3">
            <Image
              src="/images/main/dashboard/swap/fuel.svg"
              width={20}
              height={20}
              alt="fuel"
            />
            0.000
          </Card>
        </div>
        <Card className="w-full flex flex-col p-6 py-8 gap-3 bg-black/80">
          <h6 className="font-uni text-lg text-white/60 ">You Send</h6>
          <div className="w-full flex items-center justify-between gap-3">
            <input
              className="w-full h-10 bg-transparent text-white outline-none font-extrabold text-2xl mt-[2px]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
            />

            <div className="[&>*]:min-w-0 w-[180px]">
              {ChainConfig.find(
                (chain) =>
                  chain.chainId.toString() ===
                  searchParams.get("wallet")?.split(":")[0]
              ) && (
                <Select
                  size="md"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  className="border-transparent text-white font-uni font-extrabold text-2xl py-0 "
                  containerProps={{
                    className: "pb-3 min-w-0 w-[180px]",
                  }}
                  value={selected}
                  onChange={(e) => setSelected(e)}
                >
                  {ChainConfig.find(
                    (chain) =>
                      chain.chainId.toString() ===
                      searchParams.get("wallet")?.split(":")[0]
                  )?.tokens.map((token) => (
                    <Option
                      key={token.name}
                      value={token.name}
                      className="flex items-center gap-2"
                    >
                      {token.name}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
          </div>

          <div className="flex w-full my-5 justify-center relative">
            <div className="bg-white/40 w-[90%] h-[1px]"></div>
          </div>

          <h6 className="font-uni text-lg text-white/60">To</h6>

          <div className="w-full flex items-center justify-between gap-3">
            <input
              className="w-full h-10 bg-transparent text-white outline-none font-extrabold text-2xl mt-[2px]"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter Recipient Address"
            />
          </div>
        </Card>

        <Button
          size="lg"
          className="bg-black/80"
          disabled={!isOwner}
          onClick={async () => {
            if (!recipient) {
              setIsError(true);
              setErrorTitle("Invalid Recipient");
              setErrorDescription(
                "Please check the recipient address and try again."
              );
              return;
            }

            if (Number(amount) <= 0) {
              setIsError(true);
              setErrorTitle("Invalid Amount");
              setErrorDescription("Please check the amount and try again.");
              return;
            }

            const publicClient = createPublicClient({
              transport: http(
                ChainConfig.find(
                  (chain) =>
                    chain.chainId.toString() ===
                    searchParams.get("wallet")?.split(":")[0]
                )?.rpc
              ),
              chain: ChainConfig.find(
                (chain) =>
                  chain.chainId.toString() ===
                  searchParams.get("wallet")?.split(":")[0]
              )?.chainId,
            });

            const selectedToken = currentConfig.tokens.find(
              (token) => token.name === selected
            );
            if (!selectedToken) return;

            if (selectedToken.isNative) {
              const balance = await publicClient.getBalance({
                address: searchParams.get("wallet")?.split(":")[1],
              });

              if (
                Number(balance) / 10 ** selectedToken.decimals <
                Number(amount)
              ) {
                setIsError(true);
                setErrorTitle("Insufficient Balance");
                setErrorDescription("Please check your balance and try again.");
                return;
              }

              setIsError(false);

              initiateTransaction(
                "execute",
                [recipient, ethers.utils.parseUnits(amount.toString()), "0x"],
                "Transferred Successfully"
              );
            } else {
              const tokenContract = new ethers.Contract(
                selectedToken.address,
                [
                  "function transfer(address to, uint256 amount) external returns (bool)",
                  "function balanceOf(address account) external view returns (uint256)",
                ],
                new ethers.providers.JsonRpcProvider(publicClient.transport.url)
              );

              const balance = await tokenContract.balanceOf(
                searchParams.get("wallet")?.split(":")[1]
              );

              console.log(
                (Number(amount) * 10 ** selectedToken.decimals).toString
              );

              if (
                Number(balance) / 10 ** selectedToken.decimals <
                Number(amount)
              ) {
                setIsError(true);
                setErrorTitle("Insufficient Balance");
                setErrorDescription("Please check your balance and try again.");
                return;
              }

              setIsError(false);

              initiateTransaction(
                "execute",
                [
                  tokenContract.address,
                  ethers.constants.Zero,
                  tokenContract.interface.encodeFunctionData("transfer", [
                    recipient,
                    BigNumber.from(
                      (Number(amount) * 10 ** selectedToken.decimals).toString()
                    ),
                  ]),
                ],
                "Transferred Successfully"
              );
            }
          }}
        >
          Transfer
        </Button>

        {isError && (
          <Alert
            variant="gradient"
            icon={<ExclamationTriangleIcon className="h-8 w-8" />}
            className="mb-2 mr-0"
          >
            <h6 className="font-bold text-lg mb-2">{errorTitle}</h6>
            <p className="text-sm">{errorDescription}</p>
          </Alert>
        )}
      </Card>
    </div>
  );
}

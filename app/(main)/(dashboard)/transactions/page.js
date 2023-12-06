"use client";
import TransactionButton from "@/components/layout/main/dashboard/transactions/TransactionButton";
import { ChainConfig } from "@/lib/chainConfig";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CovalentClient } from "@covalenthq/client-sdk";

export default function Transactions() {
  const searchParams = useSearchParams();
  const currentConfig = ChainConfig.find(
    (c) => c.chainId.toString() === searchParams.get("wallet").split(":")[0]
  );
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    if (!currentConfig) {
      return;
    }

    const client = new CovalentClient("cqt_rQH3kFYD6MqMJPkwyqJJqmfJbWJx");

    let AllTransactions = [];

    try {
      for await (const resp of client.TransactionService.getAllTransactionsForAddress(
        currentConfig.covalentChainName,
        searchParams.get("wallet").split(":")[1]
      )) {
        AllTransactions.push(resp);
      }

      console.log(AllTransactions);
      setTransactions(AllTransactions);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (searchParams.get("wallet")) {
      getTransactions();
    }
  }, [searchParams]);

  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <CardHeader
          variant="gradient"
          color="gray"
          className="w-full py-6 mx-0 my-0"
        >
          <h1 className="font-uni text-white text-3xl font-bold text-center">
            Transactions
          </h1>
        </CardHeader>

        <CardBody className="flex flex-col gap-4 py-0 px-1 h-96 overflow-x-hidden overflow-y-scroll hide-scroll">
          {transactions.map((transaction, index) => {
            return (
              <TransactionButton
                pubKey={transaction.from_address}
                amount={
                  Number(transaction.value) / 10 ** currentConfig.decimals
                }
                symbol={currentConfig.symbol}
                type={transaction.type}
                date={transaction.block_signed_at.getTime()}
                key={index}
                to={transaction.to_address}
                scanUrl={transaction.explorers[0].url}
              />
            );
          })}
        </CardBody>
      </Card>
    </div>
  );
}

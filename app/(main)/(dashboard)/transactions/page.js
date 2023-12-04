"use client";
import TransactionButton from "@/components/layout/main/dashboard/transactions/TransactionButton";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";

const transactions = [
  {
    pubKey: "0xeR1pg7TgpQLaiH29ifs9Uz",
    Amount: "34.1205",
    type: "send",
    date: "1701689239",
    symbol: "MATIC",
  },
  {
    pubKey: "0xeR1pg7TgpQLaiH29ifs9Uz",
    Amount: "34.12",
    type: "send",
    date: "1680237770",
    symbol: "MATIC",
  },
  {
    pubKey: "0xeR1pg7TgpQLaiH29ifs9Uz",
    Amount: "34.1205 ",
    type: "receive",
    date: "1680237770",
    symbol: "USDT",
  },
  {
    pubKey: "0xeR1pg7TgpQLaiH29ifs9Uz",
    Amount: "34.1205",
    type: "send",
    date: "1701689239",
    symbol: "MATIC",
  },
  {
    pubKey: "0xeR1pg7TgpQLaiH29ifs9Uz",
    Amount: "34.12",
    type: "send",
    date: "1680237770",
    symbol: "MATIC",
  },
  {
    pubKey: "0xeR1pg7TgpQLaiH29ifs9Uz",
    Amount: "34.1205 ",
    type: "receive",
    date: "1680237770",
    symbol: "USDT",
  },
  {
    pubKey: "0xeR1pg7TgpQLaiH29ifs9Uz",
    Amount: "34.1205",
    type: "send",
    date: "1701689239",
    symbol: "MATIC",
  },
  {
    pubKey: "0xeR1pg7TgpQLaiH29ifs9Uz",
    Amount: "34.12",
    type: "send",
    date: "1680237770",
    symbol: "MATIC",
  },
  {
    pubKey: "0xeR1pg7TgpQLaiH29ifs9Uz",
    Amount: "34.1205 ",
    type: "receive",
    date: "1680237770",
    symbol: "USDT",
  },
];

export default function Transactions() {
  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mt-4 grid h-20 place-items-center mx-0 my-0"
        >
          <h1 className="font-uni text-white text-3xl font-bold">
            Transactions
          </h1>
        </CardHeader>

        <CardBody className="flex flex-col gap-4 p-0 ml-1 h-96 overflow-x-hidden overflow-y-scroll">
          {transactions.map((transaction, index) => {
            return (
              <TransactionButton
                pubKey={transaction.pubKey}
                amount={transaction.Amount}
                symbol={transaction.symbol}
                type={transaction.type}
                date={transaction.date}
                key={index}
              />
            );
          })}
        </CardBody>
      </Card>
    </div>
  );
}

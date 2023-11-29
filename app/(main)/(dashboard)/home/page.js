"use client";
import StatusCard from "@/components/layout/guardian/StatusCard";
import {
  ArrowUpRightIcon,
  ArrowsRightLeftIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  PaperAirplaneIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import Image from "next/image";

export default function Home() {
  const status = "Good";
  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <StatusCard status={status} />
        <CardHeader
          variant="gradient"
          color="gray"
          className="mt-4 flex flex-col p-4 mx-0 my-0"
        >
          <div className="flex justify-between items-center">
            <h1 className="font-uni text-white/80 text-2xl font-extrabold">
              Your Balance
            </h1>
            <div className="flex gap-2 items-center">
              <Popover>
                <PopoverHandler>
                  <QrCodeIcon className="h-8 w-8 hover:cursor-pointer" />
                </PopoverHandler>
                <PopoverContent className="z-10">
                  <Image
                    src="/images/main/dashboard/home/sampleqr.png"
                    width={200}
                    height={200}
                    alt="QR Code"
                  />
                </PopoverContent>
              </Popover>
              <DocumentDuplicateIcon className="h-8 w-8 hover:cursor-pointer" />
            </div>
          </div>

          <p className="font-uni text-7xl flex gap-1 font-extrabold mt-2 items-center">
            <CurrencyDollarIcon className="h-16 w-16" />
            0.356
          </p>
        </CardHeader>

        <CardBody className="py-0 px-0 pb-1">
          <h2 className="text-4xl font-extrabold">Quick Links</h2>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex gap-4 items-center hover:cursor-pointer hover:underline underline-offset-4">
              <ArrowUpRightIcon className="h-8 w-8" />
              <p className="font-uni text-2xl font-bold">Transfer</p>
            </div>
            <div className="flex gap-4 items-center hover:cursor-pointer hover:underline underline-offset-4">
              <PaperAirplaneIcon className="h-8 w-8" />
              <p className="font-uni text-2xl font-bold">Transactions</p>
            </div>
            <div className="flex gap-4 items-center hover:cursor-pointer hover:underline underline-offset-4">
              <ArrowsRightLeftIcon className="h-8 w-8" />
              <p className="font-uni text-2xl font-bold">Swap</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

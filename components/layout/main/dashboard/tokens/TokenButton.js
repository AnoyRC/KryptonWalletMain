"use client";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setNativeBalance } from "@/redux/slice/balanceSlice";

export default function TokenButton({
  id,
  wallet,
  chainId,
  Name,
  Symbol,
  Icon,
  feedId,
  isNative,
  address,
}) {
  const { data: balance } = useBalance({
    address: wallet,
    token: isNative ? null : address,
    chainId: Number(chainId),
    watch: true,
  });
  const dispatch = useDispatch();
  const nativeBalance = useSelector((state) => state.balance.nativeBalance);

  useEffect(() => {
    fetchNativeBalance();
  }, [balance]);

  const fetchNativeBalance = async () => {
    const response = await axios.get(
      "https://api4.binance.com/api/v3/avgPrice?symbol=" + feedId
    );
    dispatch(
      setNativeBalance({
        index: id,
        value:
          response.data.price * (balance?.formatted ? balance?.formatted : 0),
      })
    );
  };

  return (
    <Button
      size="lg"
      variant="outlined"
      className="flex flex-col  gap-3 capitalize text-lg text-left font-uni "
    >
      <div className="flex items-center gap-2">
        <Image
          src={"/images/main/dashboard/tokens/" + Icon + ".svg"}
          width={20}
          height={30}
          alt="logo"
        />
        {Name}
      </div>
      <div className="flex items-end justify-between font-extrabold -mt-2 text-3xl">
        {balance?.formatted
          ? Number(balance?.formatted) > 1000
            ? Number(balance?.formatted).toFixed(0) / 1000 + "K"
            : Number(balance?.formatted) > 1000000
            ? Number(balance?.formatted).toFixed(0) / 1000000 + "M"
            : Number(balance?.formatted).toFixed(2)
          : "0"}{" "}
        {Symbol}
        <div className="flex items-center font-extrabold text-black/70 text-xl">
          <CurrencyDollarIcon className="h-6 w-6 mr-1" />
          {nativeBalance[id]
            ? Number(nativeBalance[id]) > 1000
              ? Number(nativeBalance[id]).toFixed(0) / 1000 + "K"
              : Number(nativeBalance[id]) > 1000000
              ? Number(nativeBalance[id]).toFixed(0) / 1000000 + "M"
              : Number(nativeBalance[id]).toFixed(2)
            : "0"}
        </div>
      </div>
    </Button>
  );
}

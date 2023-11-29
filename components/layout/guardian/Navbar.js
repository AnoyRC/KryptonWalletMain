import Link from "next/link";
import WalletMenu from "../main/dashboard/Navbar/WalletMenu";

export default function Navbar() {
  return (
    <div className="w-full flex justify-between font-fhtotal items-center h-[80px]">
      <div className="flex items-center">
        <p className="text-5xl text-black font-fhtotal font-bold mr-5">
          Guardian
        </p>

        <div className="flex items-center mt-2 ml-7">
          <Link
            href={"/wallet"}
            id=":RkrqukqH2:"
            variant="text"
            className="align-middle select-none text-center transition-all mr-4 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 px-6 rounded-lg text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 flex items-center gap-3 text-base font-normal capitalize tracking-normal font-uni outline-none"
          >
            Back To Menu{" "}
          </Link>
        </div>
      </div>
      <WalletMenu />
    </div>
  );
}

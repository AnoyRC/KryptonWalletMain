"use client";
import Link from "next/link";
import CustomMenu from "./Navbar/CustomMenu";
import WalletMenu from "./Navbar/WalletMenu";
import { useSearchParams } from "next/navigation";

export default function Navbar() {
  const searchParams = useSearchParams();

  const SubMenuHeading = [
    {
      heading: "Your Account Options",
      paragraph:
        "Check what you've spent, chat securely, and handle guardian requests effortlessly.",
    },
    {
      heading: "Wallet Utilities",
      paragraph:
        "Move money between wallets and trade tokens effortlessly. Your assets, your call.",
    },
    {
      heading: "Account Setting",
      paragraph:
        "Customize your experience and amp up security with Two-Factor Authentication.",
    },
  ];

  const UtilityMenu = [
    {
      title: "Transfer",
      description: "Transfer your funds to another wallet.",
      link: `/transfer?wallet=${searchParams.get("wallet")}`,
    },
    {
      title: "Swap",
      description: "Swap your tokens for another.",
      link: `/swap?wallet=${searchParams.get("wallet")}`,
    },
    {
      title: "Tokens",
      description: "View all of your tokens.",
      link: `/tokens?wallet=${searchParams.get("wallet")}`,
    },
  ];

  const AccountMenu = [
    {
      title: "Transactions",
      description: "View your transactions.",
      link: `/transactions?wallet=${searchParams.get("wallet")}`,
    },
    {
      title: "Chats",
      description: "View your chats.",
      link: `/contacts?wallet=${searchParams.get("wallet")}`,
    },
    {
      title: "Requests",
      description: "View all of your guardian requests and recovery requests",
      link: `/requests?wallet=${searchParams.get("wallet")}`,
    },
  ];

  const SettingsMenu = [
    {
      title: "General",
      description: "Change your general settings.",
      link: `/general?wallet=${searchParams.get("wallet")}`,
    },
    {
      title: "2FA",
      description: "Enable / Change your 2FA settings.",
      link: `/twofactor?wallet=${searchParams.get("wallet")}`,
    },
    {
      title: "Guardians",
      description: "Manage your guardians.",
      link: `/guardians?wallet=${searchParams.get("wallet")}`,
    },
  ];

  return (
    <div className="w-full flex justify-between font-fhtotal items-center h-[80px]">
      <div className="flex items-center">
        <p className="text-5xl text-black font-fhtotal font-bold mr-5">
          Krypton
        </p>

        <div className="flex items-center mt-2 ml-7">
          <Link
            href={`/home?wallet=${searchParams.get("wallet")}`}
            id=":RkrqukqH2:"
            variant="text"
            className="align-middle select-none text-center transition-all mr-4 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 px-6 rounded-lg text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 flex items-center gap-3 text-base font-normal capitalize tracking-normal font-uni outline-none"
          >
            Home{" "}
          </Link>

          <CustomMenu
            title="Accounts"
            subMenu={SubMenuHeading[0]}
            menuItems={AccountMenu}
            image="account"
          />
          <CustomMenu
            title="Utilities"
            subMenu={SubMenuHeading[1]}
            menuItems={UtilityMenu}
            image="utilities"
          />
          <CustomMenu
            title="Settings"
            subMenu={SubMenuHeading[2]}
            menuItems={SettingsMenu}
            image="setting"
          />
        </div>
      </div>
      <WalletMenu />
    </div>
  );
}

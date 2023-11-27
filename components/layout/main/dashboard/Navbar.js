"use client";
import CustomMenu from "./Navbar/CustomMenu";
import { Button } from "@material-tailwind/react";

const UtilityMenu = [
  {
    title: "Transfer",
    description: "Transfer your funds to another wallet.",
  },
  {
    title: "Swap",
    description: "Swap your tokens for another.",
  },
];

const AccountMenu = [
  {
    title: "Transactions",
    description: "View your transactions.",
  },
  {
    title: "Chats",
    description: "View your chats.",
  },
  {
    title: "Requests",
    description: "View all of your guardian requests and recovery requests",
  },
];

const SettingsMenu = [
  {
    title: "General",
    description: "Change your general settings.",
  },
  {
    title: "2FA",
    description: "Enable / Change your 2FA settings.",
  },
];

export default function Navbar() {
  return (
    <div className="w-full flex justify-between font-fhtotal items-center h-[80px]">
      <div className="flex items-center">
        <h1 className="text-5xl text-black font-fhtotal font-bold mr-5">
          Krypton
        </h1>
        <div className="flex items-center mt-2 ml-7">
          <Button
            variant="text"
            className="flex items-center gap-3 text-base mr-4 font-normal capitalize tracking-normal font-uni outline-none"
          >
            Home{" "}
          </Button>
          <CustomMenu title="Utilities" menuItems={UtilityMenu} image="logo1" />
          <CustomMenu title="Accounts" menuItems={AccountMenu} image="logo2" />
          <CustomMenu title="Settings" menuItems={SettingsMenu} image="logo3" />
        </div>
      </div>
    </div>
  );
}

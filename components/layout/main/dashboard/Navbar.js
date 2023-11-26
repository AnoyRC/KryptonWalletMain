import CustomMenu from "./Navbar/CustomMenu";

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
        <div className="flex items-center mt-2 ml-5">
          <CustomMenu
            title="Utilities"
            menuItems={UtilityMenu}
            sceneLink={
              "https://prod.spline.design/hl0V1EihIzWfPCO0/scene.splinecode"
            }
          />
          <CustomMenu
            title="Accounts"
            menuItems={AccountMenu}
            sceneLink={
              "https://prod.spline.design/hl0V1EihIzWfPCO0/scene.splinecode"
            }
          />
          <CustomMenu
            title="Settings"
            menuItems={SettingsMenu}
            sceneLink={
              "https://prod.spline.design/hl0V1EihIzWfPCO0/scene.splinecode"
            }
          />
        </div>
      </div>
    </div>
  );
}

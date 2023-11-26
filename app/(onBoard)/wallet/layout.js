import { AddGuardianWalletDialog } from "@/components/dialogs/AddGuardianWalletDialog";

export const metadata = {
  title: "Krypton | Wallet",
  description: "By Bankless DAO",
};

export default function LoginLayout({ children }) {
  return (
    <>
      <AddGuardianWalletDialog />
      {children}
    </>
  );
}

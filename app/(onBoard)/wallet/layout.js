import { AddGuardianWalletDialog } from "@/components/dialogs/AddGuardianWalletDialog";
import { AddKryptonWalletDialog } from "@/components/dialogs/AddKryptonWalletDialog";

export const metadata = {
  title: "Krypton | Wallet",
  description: "By Bankless DAO",
};

export default function LoginLayout({ children }) {
  return (
    <>
      {children}
      <AddGuardianWalletDialog />
      <AddKryptonWalletDialog />
    </>
  );
}

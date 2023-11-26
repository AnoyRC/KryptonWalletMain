import TwoFacterDrawer from "@/components/drawers/TwoFactorDrawer";
import OnBoardContainer from "@/components/layout/onBoard/onBoardContainer";

export const metadata = {
  title: "Krypton | Login",
  description: "By Bankless DAO",
};

export default function OnBoardLayout({ children }) {
  return (
    <>
      <TwoFacterDrawer />
      <OnBoardContainer>{children}</OnBoardContainer>
    </>
  );
}

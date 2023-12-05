import GuardianHolder from "@/components/layout/guardian/GuardianHolder";
import Navbar from "@/components/layout/guardian/Navbar";
import StatusProvider from "@/providers/StatusProvider";

export const metadata = {
  title: "Krypton | Guardian",
  description: "By Bankless DAO",
};

export default function GuardianLayout({ children }) {
  return (
    <StatusProvider>
      <div className="w-full 2xl:px-[18%] h-screen px-5 flex flex-col">
        <Navbar />
        <GuardianHolder>{children}</GuardianHolder>
      </div>
    </StatusProvider>
  );
}

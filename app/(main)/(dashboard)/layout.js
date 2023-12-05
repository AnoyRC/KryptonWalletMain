import DashboardHolder from "@/components/layout/main/dashboard/DashboardHolder";
import Navbar from "@/components/layout/main/dashboard/Navbar";
import StatusProvider from "@/providers/StatusProvider";

export const metadata = {
  title: "Krypton",
  description: "By Bankless DAO",
};

export default function LandingLayout({ children }) {
  return (
    <StatusProvider>
      <div className="w-full h-screen flex flex-col">
        <Navbar />
        <DashboardHolder>{children}</DashboardHolder>
      </div>
    </StatusProvider>
  );
}

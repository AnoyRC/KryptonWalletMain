import Navbar from "@/components/layout/main/dashboard/Navbar";

export const metadata = {
  title: "Krypton",
  description: "By Bankless DAO",
};

export default function LandingLayout({ children }) {
  return (
    <div className="w-full flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}

import AddContactsModal from "@/components/modal/AddContactsModal";

export const metadata = {
  title: "Krypton | Contacts",
  description: "By Bankless DAO",
};

export default function LandingLayout({ children }) {
  return (
    <>
      {children}
      <AddContactsModal />
    </>
  );
}

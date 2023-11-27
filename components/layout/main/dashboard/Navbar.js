import Link from 'next/link';
import CustomMenu from './Navbar/CustomMenu';

const UtilityMenu = [
  {
    title: 'Transfer',
    description: 'Transfer your funds to another wallet.',
  },
  {
    title: 'Swap',
    description: 'Swap your tokens for another.',
  },
];

const AccountMenu = [
  {
    title: 'Transactions',
    description: 'View your transactions.',
  },
  {
    title: 'Chats',
    description: 'View your chats.',
  },
  {
    title: 'Requests',
    description: 'View all of your guardian requests and recovery requests',
  },
];

const SettingsMenu = [
  {
    title: 'General',
    description: 'Change your general settings.',
  },
  {
    title: '2FA',
    description: 'Enable / Change your 2FA settings.',
  },
];

export default function Navbar() {
  return (
    <div className="w-full flex justify-between font-fhtotal items-center h-[80px]">
      <div className="flex items-center">
        <p className="text-5xl text-black font-fhtotal font-bold mr-5">
          Krypton
        </p>

        <div className="flex items-center mt-2 ml-7">
          <Link
            href={'/home'}
            id=":RkrqukqH2:"
            variant="text"
            className="align-middle select-none text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 px-6 rounded-lg text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 flex items-center gap-3 text-base font-normal capitalize tracking-normal font-uni outline-none"
          >
            Home{' '}
          </Link>

          <CustomMenu
            title="Accounts"
            menuItems={AccountMenu}
            image="account"
          />
          <CustomMenu
            title="Utilities"
            menuItems={UtilityMenu}
            image="utilities"
          />
          <CustomMenu
            title="Settings"
            menuItems={SettingsMenu}
            image="setting"
          />
        </div>
      </div>
    </div>
  );
}

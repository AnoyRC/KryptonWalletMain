import { ChevronRightIcon } from '@heroicons/react/24/outline';

const ContactsItem = () => {
  return (
    <li className="flex justify-between items-center border-b borde-gray-200 px-2 hover:bg-gray-50 cursor-pointer rounded-lg">
      <div className="flex items-center my-2">
        <div className="w-10 h-10 bg-red-200 rounded-full mr-3"></div>

        <div>
          <h3 className="text-base font-bold text-black">John Doe</h3>

          <p className="text-xs">0x8gSy...pp6</p>
        </div>
      </div>

      <ChevronRightIcon className="h-5 w-5 text-black" />
    </li>
  );
};

export default ContactsItem;

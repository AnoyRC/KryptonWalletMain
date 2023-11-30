'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import Contacts from './Contacts';
import AddContactsBtn from './AddContactsBtn';

const ContactsBody = () => {
  return (
    <div className="h-full">
      <div className="flex items-center rounded-full bg-[#fffaf9] border border-gray-200 mb-3">
        <div className="flex justify-center items-center rounded-full px-3 py-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-primary-white" />

          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-base ml-3 w-full text-primary-white"
          />
        </div>
      </div>

      <div className="px-2 py-1 h-full flex flex-col overflow-hidden relative">
        <div className="flex items-center justify-between w-full mb-3">
          <h2 className="text-2xl font-bold text-black">Contacts</h2>
          <AddContactsBtn />
        </div>

        <div className="overflow-y-auto mb-20 hide-scroll">
          <Contacts />
        </div>
      </div>
    </div>
  );
};

export default ContactsBody;

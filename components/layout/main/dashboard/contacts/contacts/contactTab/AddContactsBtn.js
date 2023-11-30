'use client';

import { Button } from '@material-tailwind/react';

import { UserPlusIcon } from '@heroicons/react/24/outline';

const AddContactsBtn = () => {
  return (
    <Button className="p-2.5 rounded-full bg-[#ffd5b1] shadow-none hover:shadow-sm">
      <UserPlusIcon className="h-4 w-4 text-black" />
    </Button>
  );
};

export default AddContactsBtn;

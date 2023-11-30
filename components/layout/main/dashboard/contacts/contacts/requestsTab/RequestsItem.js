'use client';

import { Button } from '@material-tailwind/react';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const RequestsItem = () => {
  return (
    <div className="flex justify-between border-b borde-gray-200 px-2 py-3 hover:bg-gray-50">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-red-200 rounded-full mr-3"></div>

        <div>
          <h3 className="text-base font-bold text-black">John Doe</h3>

          <p className="text-xs">0x8gSy...pp6</p>
        </div>
      </div>

      <div className="flex items-center">
        <Button className="bg-transparent border-2 border-green-500/20 p-1.5 rounded-full text-primary-blue mr-2 shadow-none hover:shadow-sm">
          <CheckIcon className="h-4 w-4 text-green-500" />
        </Button>

        <Button className="border-2 border-red-500/20 bg-red-500/20 rounded-full text-primary-blue p-1.5 shadow-none hover:shadow-sm">
          <XMarkIcon className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default RequestsItem;

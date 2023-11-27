'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { CardHeader, Input } from '@material-tailwind/react';

const TransactionHeader = () => {
  return (
    <CardHeader floated={false} shadow={false} className="rounded-none">
      <div className="flex mb-6 items-center justify-between gap-8 font-uni">
        <div>
          <h2 className="text-black font-bold text-xl">Transaction list</h2>

          <p>See information about all transactions</p>
        </div>

        <div className="w-full md:w-72">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
    </CardHeader>
  );
};
export default TransactionHeader;

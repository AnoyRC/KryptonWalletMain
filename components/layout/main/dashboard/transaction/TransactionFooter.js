'use client';

import { Button, CardFooter } from '@material-tailwind/react';

const TransactionFooter = () => {
  return (
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      <p className="font-uni text-base">Page 1 of 10</p>

      <div className="flex gap-2">
        <Button variant="outlined" size="sm" className="font-uni">
          Previous
        </Button>

        <Button variant="outlined" size="sm" className="font-uni">
          Next
        </Button>
      </div>
    </CardFooter>
  );
};

export default TransactionFooter;

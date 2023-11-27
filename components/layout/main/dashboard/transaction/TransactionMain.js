'use client';

import { Typography, CardBody } from '@material-tailwind/react';

import TransactionsBody from './TransactionsBody';

const TransactionMain = ({ tableHead, tableRows }) => {
  return (
    <CardBody className="p-0 flex flex-1 overflow-scroll">
      <table className="w-full min-w-max table-auto text-left relative mt-0">
        <thead className="sticky top-0 my-1 z-20">
          <tr>
            {tableHead.map((head) => (
              <th key={head} className="bg-gray-100 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>

        <TransactionsBody tableRows={tableRows} />
      </table>
    </CardBody>
  );
};

export default TransactionMain;

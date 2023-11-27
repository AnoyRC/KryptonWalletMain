'use client';

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import {
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';

const TransactionsBody = ({ tableRows }) => {
  return (
    <tbody className="">
      {tableRows.map(({ img, name, pubKey, Amount, type, date }, index) => {
        const isLast = index === tableRows.length - 1;
        const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

        const newDate = new Date(Number(date) * 1000);

        const formattedDate = newDate.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });

        const formattedTime = newDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        });

        return (
          <tr key={name}>
            <td className={classes}>
              <div className="flex items-center gap-3">
                <Avatar src={img} alt={name} size="sm" />
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>

                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {pubKey.slice(0, 6) + '...' + pubKey.slice(-4)}
                  </Typography>
                </div>
              </div>
            </td>

            <td className={classes}>
              <div className="flex flex-col">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {Amount}
                </Typography>
              </div>
            </td>

            <td className={classes}>
              <div className="w-max">
                <Chip
                  variant="ghost"
                  size="sm"
                  value={type === 'send' ? 'Send' : 'Received'}
                  className={
                    type === 'send'
                      ? 'text-red-500 bg-red-500/10'
                      : 'text-green-500 bg-green-500/10'
                  }
                />
              </div>
            </td>

            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {formattedDate}
              </Typography>

              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {formattedTime}
              </Typography>
            </td>

            <td className={classes}>
              <Tooltip
                content="Open Transaction"
                animate={{
                  mount: { opacity: 1, y: 0, scale: 1 },
                  unmount: { opacity: 0, y: 25, scale: 0 },
                }}
              >
                <IconButton variant="text">
                  <ChevronRightIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TransactionsBody;

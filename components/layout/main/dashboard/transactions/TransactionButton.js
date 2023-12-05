'use client';

import { Button } from '@material-tailwind/react';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

export default function TransactionButton({
  pubKey,
  amount,
  symbol,
  type,
  date,
}) {
  function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  }

  return (
    <div className="w-full">
      <Button
        size="lg"
        variant="outlined"
        className="flex w-full flex-col gap-1 capitalize text-lg text-left font-uni"
        onClick={() => console.log('clicked')}
      >
        <div className="flex items-center gap-2">
          {type === 'send' ? (
            <>
              <ArrowUpRightIcon className="h-6 w-6 mr-1" />
              <p>to {pubKey.slice(0, 6) + '...' + pubKey.slice(-4)}</p>
            </>
          ) : (
            <>
              <ArrowUpRightIcon className="h-6 w-6 mr-1 transform rotate-180" />
              <p>from {pubKey.slice(0, 6) + '...' + pubKey.slice(-4)}</p>
            </>
          )}
        </div>

        <div className="flex items-end justify-between font-extrabold text-3xl w-full">
          <div className="flex items-center gap-2">
            {Number(amount) > 1000
              ? Number(amount).toFixed(0) / 1000 + 'K'
              : Number(amount) > 1000000
              ? Number(amount).toFixed(0) / 1000000 + 'M'
              : Number(amount).toFixed(2)}{' '}
            {symbol}
          </div>

          <div className="flex items-center font-bold text-black/70 text-xl">
            {timeDifference(Date.now(), Number(date) * 1000)}
          </div>
        </div>
      </Button>
    </div>
  );
}

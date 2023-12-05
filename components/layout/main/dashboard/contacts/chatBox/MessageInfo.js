'use client';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@material-tailwind/react';

const MessageInfo = ({ message }) => {
  return (
    <Tooltip
      placement="top"
      content={
        <div className="w-60">
          <p className="font-medium break-all">
            Sent From: {message.split('::')[0]}
          </p>
        </div>
      }
      className="bg-gray-900"
    >
      <InformationCircleIcon className="text-gray-900 h-4 w-4 mt-0.5" />
    </Tooltip>
  );
};

export default MessageInfo;

'use client';

import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

import MessageInput from './MessageInput';

const SendMessageContainer = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      <div className="rounded-full bg-red-200 h-11 w-11"></div>

      <div className="flex flex-1 items-center rounded-full bg-[#fffaf9] pl-5 border border-gray-200 py-1">
        <ChatBubbleLeftIcon className="w-5 h-5" />

        <MessageInput />
      </div>
    </div>
  );
};

export default SendMessageContainer;

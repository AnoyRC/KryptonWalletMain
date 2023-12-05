import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

import MessageInput from './MessageInput';

const SendMessageContainer = () => {
  return (
    <div className="flex items-center">
      <div className="flex flex-1 items-center rounded-full bg-[#fffaf9] pl-5 border border-gray-200 py-1">
        <ChatBubbleLeftIcon className="w-5 h-5" />

        <MessageInput />
      </div>
    </div>
  );
};

export default SendMessageContainer;

'use client';

import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  return (
    <form className="w-full flex justify-between pr-1 gap-2">
      <input
        type="text"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-transparent flex-1 pl-4 text-black focus:outline-none text-primary-white placeholder:text-gray-700"
      />

      <button
        type="submit"
        className="rounded-full flex justify-center items-center bg-[#ffd5b1] py-1.5 pl-2 pr-1"
      >
        <PaperAirplaneIcon className="h-6 w-6" />
      </button>
    </form>
  );
};

export default MessageInput;

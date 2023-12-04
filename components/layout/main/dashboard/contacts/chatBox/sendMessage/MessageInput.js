'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const currentContact = useSelector((state) => state.contacts.currentContact);
  const pushSign = useSelector((state) => state.contacts.pushSign);

  const sendMessage = async () => {
    if (!pushSign || !message.trim()) return;

    const aliceMessagesBob = await pushSign.chat.send(
      `chatId:${currentContact.chatId}`,
      {
        content: message,
        type: 'Text',
      }
    );

    setMessage('');
  };

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
        onClick={sendMessage}
      >
        <PaperAirplaneIcon className="h-6 w-6" />
      </button>
    </form>
  );
};

export default MessageInput;

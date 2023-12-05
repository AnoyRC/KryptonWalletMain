'use client';

import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';

const MessageInput = () => {
  const searchParams = useSearchParams();

  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  const pushSign = useSelector((state) => state.contacts.pushSign);
  const currentContact = useSelector((state) => state.contacts.currentContact);

  const pubKey = searchParams.get('wallet');

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!pushSign || !message.trim()) return;

    if (disabled) return;

    try {
      setDisabled(true);

      await pushSign.chat.send(currentContact.did.split(':')[1], {
        content: `${pubKey}::${message}`,
        type: 'Text',
      });

      setMessage('');
      setDisabled(false);
    } catch (err) {
      toast.error('Error sending message');
    }
  };

  return (
    <form className="w-full flex justify-between pr-1 gap-2">
      <input
        type="text"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        className="bg-transparent flex-1 pl-4 text-black focus:outline-none text-primary-white placeholder:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      />

      <button
        type="submit"
        className={`rounded-full flex justify-center items-center bg-[#ffd5b1] ${
          disabled ? 'p-1.5 cursor-not-allowed' : 'py-1.5 pl-2 pr-1'
        }`}
        onClick={(e) => sendMessage(e)}
      >
        {disabled ? (
          <Image
            src="/images/onboard/setup/loading.svg"
            alt="Loading spinner"
            width={20}
            height={20}
            className="animate-spin opacity-60"
          />
        ) : (
          <PaperAirplaneIcon className="h-5 w-5 text-primary-white" />
        )}
      </button>
    </form>
  );
};

export default MessageInput;

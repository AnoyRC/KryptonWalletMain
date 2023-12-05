'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { updateMessages } from '@/redux/slice/contactsSlice';

const MessageInput = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const pushSign = useSelector((state) => state.contacts.pushSign);
  const currentContact = useSelector((state) => state.contacts.currentContact);

  const pubKey = currentContact.did.split(':')[1];

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!pushSign || !message.trim()) return;

    const messagePush = await pushSign.chat.send(
      currentContact.did.split(':')[1],
      {
        content: `${pubKey}::${message}`,
        type: 'Text',
      }
    );

    const filteredMessage = {
      fromDID: messagePush.fromDID,
      timestamp: messagePush.timestamp,
      messageContent: `${pubKey}::${message}`,
      messageType: messagePush.messageType,
    };

    dispatch(updateMessages(filteredMessage));

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
        onClick={(e) => sendMessage(e)}
      >
        <PaperAirplaneIcon className="h-6 w-6" />
      </button>
    </form>
  );
};

export default MessageInput;

'use client';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import ChatHeader from './header/ChatHeader';
import SendMessageContainer from './sendMessage/SendMessageContainer';

const ChatBox = () => {
  const currentContact = useSelector((state) => state.contacts.currentContact);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, [currentContact]);

  return (
    <>
      <ChatHeader currentContact={currentContact} />

      <section className="px-5 py-2 h-full flex flex-col gap-3">
        <div className="flex flex-1 w-full bg-blue-gray-100"></div>
        <SendMessageContainer />
      </section>
    </>
  );
};

export default ChatBox;

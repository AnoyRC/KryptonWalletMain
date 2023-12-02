'use client';

import { useAccount } from 'wagmi';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useEthersSigner } from '@/wagmi/EthersSigner';

import ContactsItem from './ContactsItem';

const Contacts = () => {
  const pushSign = useSelector((state) => state.contacts.pushSign);

  const signer = useEthersSigner();
  const { isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const initializeChats = async () => {
      const aliceChatsLists = await pushSign.chat.list('CHATS');
      setChats(aliceChatsLists);
      setIsLoading(false);
    };

    if (isConnected && signer && pushSign) {
      initializeChats();
    }
  }, [pushSign, isConnected, signer]);

  return (
    <div className="relative flex-1">
      {isLoading ? (
        <p className="text-primary-white/60">Loading...</p>
      ) : chats.length === 0 ? (
        <p className="text-primary-white/60 py-2 text-center bg-gray-100 rounded-lg mt-2">
          No contacts to show
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {chats.map((chat) => (
            <ContactsItem key={chat} chat={chat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;

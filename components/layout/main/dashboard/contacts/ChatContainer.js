'use client';

import { Card } from '@material-tailwind/react';

import { useAccount } from 'wagmi';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useEthersSigner } from '@/wagmi/EthersSigner';

import { usePush } from '@/hooks/usePush';

import PushCard from './PushCard';
import ChatBox from './chatBox/ChatBox';
import ChatBackground from './ChatBackground';

const ChatContainer = () => {
  const currentContact = useSelector((state) => state.contacts.currentContact);
  const signer = useEthersSigner();
  const { isConnected } = useAccount();
  const { initializePush } = usePush();

  const [isSigned, setIsSigned] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initializePush();
        setIsSigned(true);
      } catch (e) {
        setIsSigned(false);
      }
    };

    if (isConnected && signer) {
      initialize();
    }
  }, [isConnected, signer]);

  return (
    <Card className="h-full flex-1">
      {isSigned ? (
        currentContact ? (
          <ChatBox />
        ) : (
          <ChatBackground />
        )
      ) : (
        <PushCard setIsSigned={setIsSigned} />
      )}
    </Card>
  );
};

export default ChatContainer;

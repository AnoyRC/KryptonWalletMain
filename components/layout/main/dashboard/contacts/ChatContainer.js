"use client";

import { Card } from "@material-tailwind/react";

import { useAccount } from "wagmi";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useEthersSigner } from "@/wagmi/EthersSigner";

import { usePush } from "@/hooks/usePush";

import PushCard from "./PushCard";
import ChatBox from "./chatBox/ChatBox";
import ChatBackground from "./ChatBackground";

const ChatContainer = () => {
  const signer = useEthersSigner();
  const { isConnected } = useAccount();
  const { initializePush } = usePush();

  const currentContact = useSelector((state) => state.contacts.currentContact);
  const pushSign = useSelector((state) => state.contacts.pushSign);

  useEffect(() => {
    if (isConnected && signer && !pushSign) {
      initializePush();
    }
  }, [isConnected, signer]);

  return (
    <Card className="h-full flex-1 font-uni">
      {pushSign ? (
        currentContact ? (
          <ChatBox />
        ) : (
          <ChatBackground />
        )
      ) : (
        <PushCard />
      )}
    </Card>
  );
};

export default ChatContainer;

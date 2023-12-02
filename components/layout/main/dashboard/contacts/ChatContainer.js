"use client";

import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

import ChatBackground from "./ChatBackground";
import ChatBox from "./chatBox/ChatBox";
import { Card } from "@material-tailwind/react";
import { useEthersSigner } from "@/wagmi/EthersSigner";
import { useAccount, useWalletClient } from "wagmi";

const ChatContainer = () => {
  const currentContact = useSelector((state) => state.contacts.currentContact);
  const signer = useEthersSigner();
  const { isConnected } = useAccount();

  useEffect(() => {
    const initializeUser = async () => {
      const user = await PushAPI.initialize(signer, {
        env: CONSTANTS.ENV.STAGING,
      });

      const stream = await user.initStream(
        [
          CONSTANTS.STREAM.CHAT,
          CONSTANTS.STREAM.CHAT_OPS,
          CONSTANTS.STREAM.NOTIF,
          CONSTANTS.STREAM.CONNECT,
          CONSTANTS.STREAM.DISCONNECT,
        ],
        {}
      );

      stream.on(CONSTANTS.STREAM.CONNECT, (a) => {
        console.log("Stream Connected");
      });

      await stream.connect();

      stream.on(CONSTANTS.STREAM.DISCONNECT, () => {
        console.log("Stream Disconnected");
      });

      stream.on(CONSTANTS.STREAM.CHAT, (data) => {
        console.log(data);
      });

      stream.on(CONSTANTS.STREAM.CHAT_OPS, (data) => {
        console.log(data);
      });
    };

    if (isConnected && signer) {
      initializeUser();
    }
  }, [isConnected, signer]);

  return (
    <Card className="h-full flex-1">
      {currentContact ? <ChatBox /> : <ChatBackground />}
    </Card>
  );
};

export default ChatContainer;

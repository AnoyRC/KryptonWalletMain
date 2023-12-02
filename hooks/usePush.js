// const [message, setMessage] = useState('');
// const [messages, setMessages] = useState([]);
// const [userSigner, setUserSigner] = useState(null);

// useEffect(() => {
//   const initializeUser = async () => {
//     const wallet = ethers.Wallet.createRandom();
//     const signer = await PushAPI.initialize(wallet, {
//       env: CONSTANTS.ENV.STAGING,
//     });
//     setUserSigner(signer);

//     const stream = await signer.initStream(
//       [
//         CONSTANTS.STREAM.CHAT,
//         CONSTANTS.STREAM.CHAT_OPS,
//         CONSTANTS.STREAM.NOTIF,
//         CONSTANTS.STREAM.CONNECT,
//         CONSTANTS.STREAM.DISCONNECT,
//       ],
//       {}
//     );

//     stream.on(CONSTANTS.STREAM.CONNECT, (a) => {
//       console.log('Stream Connected');
//     });

//     await stream.connect();

//     stream.on(CONSTANTS.STREAM.DISCONNECT, () => {
//       console.log('Stream Disconnected');
//     });

//     stream.on(CONSTANTS.STREAM.CHAT, (data) => {
//       console.log(data);
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     stream.on(CONSTANTS.STREAM.CHAT_OPS, (data) => {
//       console.log(data);
//     });
//   };

//   initializeUser();
// }, []);

// const bobWalletAddress = '0x99A08ac6254dcf7ccc37CeC662aeba8eFA666666';

// const sendMessage = async () => {
//   if (!userSigner || !message.trim()) return;

//   const aliceMessagesBob = await userSigner.chat.send(bobWalletAddress, {
//     content: message,
//   });
//   console.log(aliceMessagesBob);

//   setMessages((prevMessages) => [...prevMessages, aliceMessagesBob]);

//   const aliceChatsLists = await userSigner.chat.list('CHATS');
//   console.log(aliceChatsLists);

//   const aliceChatHistoryWithBob = await userSigner.chat.history(
//     bobWalletAddress
//   );
//   console.log(aliceChatHistoryWithBob);

//   const aliceChats = await userSigner.chat.latest(bobWalletAddress);
//   console.log(aliceChats);

//   setMessage('');
//   console.log(messages);
// };

// const handleKeyPress = (event) => {
//   if (event.key === 'Enter' && !event.shiftKey) {
//     event.preventDefault();
//     sendMessage();
//   }
// };

'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEthersSigner } from '@/wagmi/EthersSigner';
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';

import { setPushSign } from '@/redux/slice/contactsSlice';

export function usePush() {
  const signer = useEthersSigner();
  const dispatch = useDispatch();

  const pushSign = useSelector((state) => state.contacts.pushSign);

  const initializePush = async () => {
    const user = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });

    dispatch(setPushSign(user));

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
      console.log('Stream Connected');
    });

    await stream.connect();

    stream.on(CONSTANTS.STREAM.DISCONNECT, () => {
      console.log('Stream Disconnected');
    });

    stream.on(CONSTANTS.STREAM.CHAT, (data) => {
      console.log(data);
    });

    stream.on(CONSTANTS.STREAM.CHAT_OPS, (data) => {
      console.log(data);
    });
  };

  const getChats = async () => {
    const chats = await pushSign.chat.list('CHATS');
    console.log(chats);
  };

  // const getChatHistory = async (address) => {
  //   const chatHistory = await pushSign.chat.history(address);
  //   console.log(chatHistory);
  // };

  // const getLatestChat = async (address) => {
  //   const latestChat = await pushSign.chat.latest(address);
  //   console.log(latestChat);
  // };

  // const sendMessage = async (address, message) => {
  //   const sentMessage = await pushSign.chat.send(address, {
  //     content: message,
  //   });
  //   console.log(sentMessage);
  // };

  return {
    initializePush,
    getChats,
    // getChatHistory,
    // getLatestChat,
    // sendMessage,
  };
}

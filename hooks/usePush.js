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

  return {
    initializePush,
  };
}

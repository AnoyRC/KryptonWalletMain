'use strict';

import { ChevronRightIcon } from '@heroicons/react/24/outline';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentContact } from '@/redux/slice/contactsSlice';

const ContactsItem = ({ chat }) => {
  let flag = true;

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const messages = useSelector((state) => state.contacts.messages);
  const pushSign = useSelector((state) => state.contacts.pushSign);
  const currentContact = useSelector((state) => state.contacts.currentContact);

  const pubKey = chat.did.split(':')[1];

  const handleClick = () => {
    dispatch(setCurrentContact(chat));
  };

  useEffect(() => {
    const fetchMessage = async () => {
      const latestMessage = await pushSign.chat.latest(pubKey);

      setMessage(
        latestMessage[0].messageContent.split('::')[1] ||
          latestMessage[0].messageContent
      );
    };

    if (currentContact?.did.split(':')[1] === pubKey || flag) {
      flag = false;
      fetchMessage();
    }
  }, [messages]);

  return (
    <>
      <li
        className="flex justify-between items-center border-b borde-gray-200 px-2 hover:bg-gray-50 cursor-pointer rounded-lg"
        onClick={handleClick}
      >
        <div className="flex items-center my-2">
          <div className="w-10 h-10 bg-red-200 rounded-full mr-3 overflow-hidden">
            <Image
              src={chat.profilePicture}
              alt="profile picture"
              width={40}
              height={40}
            />
          </div>

          <div>
            <h3 className="text-base font-bold text-black">
              {pubKey.slice(0, 8)}...
              {pubKey.slice(-4)}
            </h3>

            {/* <div className="text-xs font-medium w-24 hide-scroll overflow-hidden whitespace-nowrap text-ellipsis">
              {message}
            </div> */}

            <div className="text-xs font-medium w-24 hide-scroll overflow-hidden whitespace-nowrap scroll-on-hover">
              <p>{message}</p>
            </div>
          </div>
        </div>

        <ChevronRightIcon className="h-5 w-5 text-black" />
      </li>
    </>
  );
};

export default ContactsItem;

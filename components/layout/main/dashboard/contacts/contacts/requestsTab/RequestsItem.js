'use client';

import { Button } from '@material-tailwind/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

import Image from 'next/image';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { setRecentContact } from '@/redux/slice/contactsSlice';

const RequestsItem = ({ request, initializeRequests }) => {
  const dispatch = useDispatch();
  const pubKey = request.did.split(':')[1];

  const pushSign = useSelector((state) => state.contacts.pushSign);

  const handleAcceptRequest = async () => {
    const acceptRequest = await pushSign.chat.accept(pubKey);

    initializeRequests();
    toast.success('Request accepted');

    dispatch(setRecentContact(acceptRequest));
  };

  const handleRejectRequest = async () => {
    await pushSign.chat.reject(pubKey);

    initializeRequests();
    toast.success('Request rejected');
  };

  return (
    <div className="flex justify-between border-b borde-gray-200 px-2 py-3 hover:bg-gray-50">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
          <Image
            src={request.profilePicture}
            width={40}
            height={40}
            alt="Profile"
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-black">
            {pubKey.slice(0, 6)}...{pubKey.slice(-4)}
          </h3>

          <p className="text-xs">{request.msg.messageContent}</p>
        </div>
      </div>

      <div className="flex items-center">
        <Button
          className="bg-transparent border-2 border-green-500/20 p-1.5 rounded-full text-primary-blue mr-2 shadow-none hover:shadow-sm"
          onClick={handleAcceptRequest}
        >
          <CheckIcon className="h-4 w-4 text-green-500" />
        </Button>

        <Button
          className="border-2 border-red-500/20 bg-red-500/20 rounded-full text-primary-blue p-1.5 shadow-none hover:shadow-sm"
          onClick={handleRejectRequest}
        >
          <XMarkIcon className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default RequestsItem;

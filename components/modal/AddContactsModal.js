'use client';

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { toggleAddContactModal } from '@/redux/slice/modalsSlice';
import { useState } from 'react';

const AddContactsModal = () => {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.modals.openAddContact);
  const pushSign = useSelector((state) => state.contacts.pushSign);

  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleOpen = () => {
    dispatch(toggleAddContactModal(!open));
  };

  const handleSendRequest = async () => {
    await pushSign.chat.send(address, {
      type: 'Text',
      content: message,
    });

    dispatch(toggleAddContactModal(false));
    toast.success('Request sent successfully');
  };

  return (
    <Dialog open={open} size="xs" handler={handleOpen}>
      <DialogHeader className="flex items-center justify-between">
        <h3 className="mb-1">New message to @ </h3>

        <XMarkIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => dispatch(toggleAddContactModal(false))}
        />
      </DialogHeader>

      <DialogBody>
        <p className="mb-10 -mt-7 text-sm max-w-[70%]">
          Write the Pubkey and a Connect message to send request.
        </p>

        <div className="grid gap-6">
          <Input
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            label="Public Key"
            required
          />
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            label="Connect message"
            required
          />
        </div>
      </DialogBody>

      <DialogFooter className="space-x-2">
        <Button
          variant="outlined"
          color="red"
          onClick={() => dispatch(toggleAddContactModal(false))}
        >
          cancel
        </Button>

        <Button variant="gradient" color="gray" onClick={handleSendRequest}>
          send request
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddContactsModal;

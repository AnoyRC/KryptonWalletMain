'use client';

import { Button } from '@material-tailwind/react';
import { UserPlusIcon } from '@heroicons/react/24/outline';

import { useDispatch } from 'react-redux';

import { toggleAddContactModal } from '@/redux/slice/modalsSlice';

const AddContactsBtn = () => {
  const dispatch = useDispatch();

  return (
    <Button
      className="p-2.5 rounded-full bg-[#ffd5b1]"
      onClick={() => dispatch(toggleAddContactModal(true))}
    >
      <UserPlusIcon className="h-4 w-4 text-black" />
    </Button>
  );
};

export default AddContactsBtn;

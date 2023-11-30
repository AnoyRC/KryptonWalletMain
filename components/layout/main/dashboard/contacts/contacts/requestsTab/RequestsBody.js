'use client';

import AddContactsBtn from '../contactTab/AddContactsBtn';
import Requests from './Requests';

const RequestsBody = () => {
  return (
    <div className="h-full">
      <div className="px-2 h-full flex flex-col overflow-hidden relative">
        <div className="flex items-center justify-between w-full mb-3">
          <h2 className="text-2xl font-bold text-black">Requests</h2>
          <AddContactsBtn />
        </div>

        <section className="overflow-y-auto mb-5 hide-scroll">
          <Requests />
        </section>
      </div>
    </div>
  );
};

export default RequestsBody;

'use client';

import ChatContainer from '@/components/layout/main/dashboard/contacts/ChatContainer';
import ContactsContainer from '@/components/layout/main/dashboard/contacts/ContactsContainer';

function Chat() {
  return (
    <div className="flex h-[calc(100vh-80px)] z-10 gap-2">
      <ContactsContainer />
      <ChatContainer />
    </div>
  );
}

export default Chat;

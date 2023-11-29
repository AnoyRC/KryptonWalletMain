import { Card } from '@material-tailwind/react';
import SendMessageContainer from './chatBox/sendMessage/SendMessageContainer';
import ChatHeader from './chatBox/header/ChatHeader';

const ChatContainer = () => {
  return (
    <Card className="h-full flex-1">
      <ChatHeader />

      <section className="px-5 py-2 h-full flex flex-col gap-3">
        <div className="flex flex-1 w-full bg-blue-gray-100"></div>
        <SendMessageContainer />
      </section>
    </Card>
  );
};

export default ChatContainer;

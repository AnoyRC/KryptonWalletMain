'use client';

import { useSelector } from 'react-redux';

const MessageWithDate = ({ message, previousMessage }) => {
  const pushSign = useSelector((state) => state.contacts.pushSign);

  const messageDate = new Date(message.timestamp).toLocaleDateString();
  const messageTime = new Date(message.timestamp).toLocaleTimeString();

  const previousMessageDate = previousMessage
    ? new Date(previousMessage.timestamp).toLocaleDateString()
    : null;

  const pubKey = message.fromDID.split(':')[1];

  return (
    <div>
      {messageDate !== previousMessageDate && (
        <div className="text-center text-xs font-medium text-gray-400 my-2 font-sans">
          {messageDate}
        </div>
      )}

      <div
        className={`flex ${
          pubKey === pushSign.account ? 'justify-end' : 'justify-start'
        }`}
      >
        <div
          className={`text-sm text-primary-black px-4 py-2 rounded-3xl font-medium w-fit ${
            pubKey === pushSign.account
              ? 'bg-[#ffecec] rounded-tr-none'
              : 'bg-gray-200 rounded-tl-none'
          }`}
        >
          <p className="max-w-[260px]">
            {message.messageContent.split('::')[1] || message.messageContent}
          </p>
          <div className="text-xs text-gray-500 prevent-select">
            {messageTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageWithDate;

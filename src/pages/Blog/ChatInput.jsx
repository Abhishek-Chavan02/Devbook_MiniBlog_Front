import React from "react";
import { PencilAltIcon, PaperAirplaneIcon } from "@heroicons/react/solid";

const ChatInput = ({ message, setMessage, onSendMessage, onOpenCreatePost }) => {
  return (
    <div className="flex-shrink-0 bg-white border-t p-4 flex flex-wrap gap-2 items-center mb-10 shadow-md">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 min-w-[150px] border p-2 rounded"
      />
      <PaperAirplaneIcon
        className="h-6 w-6 text-blue-500 cursor-pointer"
        onClick={onSendMessage}
      />
      <PencilAltIcon
        className="h-6 w-6 text-green-500 cursor-pointer"
        onClick={onOpenCreatePost}
      />
    </div>
  );
};

export default ChatInput;

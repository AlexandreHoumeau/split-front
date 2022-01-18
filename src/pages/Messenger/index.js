import React, { useEffect } from "react";
import Contacts from "./Contacts";
import MessagesView from "./MessagesView";
import { useParams } from "react-router-dom";

const Messenger = () => {
  let { conversationId } = useParams();

  useEffect(() => {}, []);
  return (
    <div className="px-10 w-full py-4 flex justify-center items-center flex-grow">
      <div style={{ minHeight: '100%' }} className="grid grid-cols-8 space-x-8">
        <div className="col-span-2 h-full mb-20">
          <Contacts />
        </div>

        <div className="col-span-6 w-full h-full">
          {conversationId ? (
            <MessagesView conversationId={conversationId}  />
          ) : (
            <div className="flex justify-center">
              <div className="text-gray-400 italic">
                Selectionne une conversation
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Messenger;

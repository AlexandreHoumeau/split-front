import React, { useEffect } from "react";
import Contacts from "./Contacts";
import MessagesView from "./MessagesView";
import { useParams } from "react-router-dom";

const Messenger = (props) => {
  let { conversationId } = useParams();

  useEffect(() => {}, []);
  return (
    <div className="px-14 py-4">
      <div className="grid grid-cols-8 space-x-8">
        <div className="col-span-2">
          <Contacts />
        </div>

        <div className="col-span-6 h-full">
          {conversationId ? (
            <MessagesView />
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

import { SendIcon } from "assets/icons";
import { API_DOMAIN } from "config";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "services/api";
import { io } from "socket.io-client";

const MessagesView = ({ conversationId }) => {
  const [newMessage, setNewMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const socket = io(API_DOMAIN, {
    extraHeaders: {
      Authorization: localStorage.getItem("authToken"),
    },
  });

  useEffect(() => {
    fetchConversation();
    socket.on(conversationId, (value) => {
      const data = {
        content: value.newMessage
      }
      conversation.messages?.push(data)
    });
  }, [conversationId]);

  const fetchConversation = async () => {
    const data = await api.axios.get("/v1/conversation", {
      params: {
        conversationId,
      },
    });
    if (data.conversation) {
      setConversation(data.conversation);
    }
  };

  const submitMessage = (e) => {
    e.preventDefault();
    if (!newMessage?.length) return;

    const value = {
      conversationId,
      newMessage,
    };
    // api.axios.post(`${API_DOMAIN}/v1/conversation/message`, value)
    // .finally(() => {
    // socket.on("connection", () => {
    //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    // });

    socket.emit('chat', value);

    setNewMessage('');
    // })
  };

  return (
    <div className="bg-white flex flex-col flex-grow h-full shadow-lg rounded-xl font-gibson">
      <div className="bg-gray-50 rounded-t-xl py-5 px-5">
        <div className="text-dark-500 text-xl font-semibold">
          Alexandre Houmeau
        </div>
      </div>

      <div className="h-full mb-8">
        {/* MESSAGE VIEW */}
        <div className="h-full p-5 flex-1">
          {conversation?.messages?.map((message) => (
            <div key={message._id}>{message.content}</div>
          ))}
        </div>
      </div>
      <div className="mt-auto px-8 mb-8">
        <form
          onSubmit={submitMessage}
          className="border flex border-gray-200 px-3 py-2 rounded-full"
        >
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full select-none outline-none"
            placeholder="Ecrivez votre message ici"
          />
          <div className="">
            <div
              onClick={submitMessage}
              className="bg-primary-500 cursor-pointer px-3 py-2 rounded-full"
            >
              <SendIcon width="20px" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessagesView;

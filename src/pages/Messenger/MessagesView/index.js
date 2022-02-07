import React, { useState, useEffect, useRef } from "react";

import classNames from "classnames";
import { connect } from "react-redux";

import { SendIcon } from "assets/icons";

import api from "services/api";
import socket from "services/socket";
import moment from "moment";

const MessagesView = ({ conversationId, user }) => {
  const [newMessage, setNewMessage] = useState("");
  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchConversation = async () => {
    const { conversation } = await api.axios.get("/v1/conversation", {
      params: {
        conversationId,
      },
    });
    if (conversation) {
      setConversation(conversation);
      setMessages(conversation.messages);
    }
  };
  
  useEffect(() => {
    scrollToBottom()
  }, [messages]);


  useEffect(() => {
    socket.on(conversationId, (message) => {
      if (
        message._sender === user._id ||
        message.conversationId !== conversationId
      )
        return;
      setMessages((oldArray) => [...oldArray, message]);
    });
  }, []);

  useEffect(() => {
    fetchConversation();
  }, [conversationId]);

  const submitMessage = (e) => {
    e.preventDefault();
    if (!newMessage?.length) return;

    const value = {
      conversationId,
      content: newMessage,
      _sender: user._id,
    };

    conversation.messages.push(value);

    socket.emit("chat", value);
    setNewMessage("");
    // })
  };

  return (
    <div className="bg-white flex flex-col flex-grow h-full shadow-lg rounded-xl font-gibson">
      <div className="bg-gray-50 rounded-t-xl py-5 px-5">
        <div className="text-dark-500 text-xl font-semibold">
          Mettre le nom de la personne
        </div>
      </div>

      <div style={{ height: "69vh" }} className="overflow-y-auto">
        {/* MESSAGE VIEW */}
        <div className="p-5 bg-white">
          {messages?.map((message, index) =>
            message._sender === user._id ? (
              <div key={index}>
                <div className="flex justify-end">
                  <div
                    className={classNames(
                      "bg-primary m-px w-max text-white rounded-l-lg p-3",
                      messages[index - 1]?._sender !== user._id
                        ? "rounded-t-lg"
                        : "",
                      messages[index + 1]?._sender !== user._id
                        ? "rounded-b-lg"
                        : ""
                    )}
                  >
                    <div>{message.content}</div>
                  </div>
                </div>
                {messages[index + 1]?._sender !== user._id ? (
                  <div className="text-right text-xs font-semibold text-gray-400 mr-1 mt-1">
                    {moment(message._sendtAt).format("hh:mm")}
                  </div>
                ) : null}
              </div>
            ) : (
              <div key={index}>
                <div className="flex justify-start" key={index}>
                  <div
                    className={classNames(
                      "bg-secondary m-px w-max text-white rounded-r-lg p-3",
                      messages[index - 1]?._sender !==
                        conversation._users.find((u) => u !== user._id)
                        ? "rounded-t-lg"
                        : "",
                      messages[index + 1]?._sender !==
                        conversation._users.find((u) => u !== user._id)
                        ? "rounded-b-lg"
                        : ""
                    )}
                  >
                    <div>{message.content}</div>
                  </div>
                </div>
                {messages[index + 1]?._sender !==
                conversation._users.find((u) => u !== user._id) ? (
                  <div className="text-left text-xs font-semibold text-gray-400 ml-1 mt-1">
                    {moment(message._sendtAt).format("hh:mm")}
                  </div>
                ) : null}
              </div>
            )
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="mt-auto px-8 mb-8">
        <form
          onSubmit={submitMessage}
          className="border flex border-gray-200 px-3 py-2 rounded-full"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full select-none outline-none"
            placeholder="Ecrivez votre message ici"
          />
          <div className=".submit-button">
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

const mapStateToProps = (state) => ({
  user: state.Auth.user,
});

export default connect(mapStateToProps)(MessagesView);

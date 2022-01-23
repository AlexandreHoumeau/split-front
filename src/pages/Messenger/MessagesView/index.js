import { SendIcon } from "assets/icons";
import classNames from "classnames";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import api from "services/api";
import socket from "services/socket";
import manager from "services/socket";

const MessagesView = ({ conversationId, user }) => {
  const [newMessage, setNewMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const fetchConversation = async () => {
    await api.axios
      .get("/v1/conversation", {
        params: {
          conversationId,
        },
      })
      .then((data) => {
        if (data?.conversation) {
          setConversation(data.conversation);
        }

        const newConversation = data.conversation

        // socket.on(conversationId, (message) => {
        //   if (message._sender === user._id) return;
        //   newConversation.messages?.push(message);
        //   setConversation(newConversation);
        // });

        socket.on('new_msg', (message) => {
          console.log(message)
          if (message._sender === user._id) return;
          newConversation.messages?.push(message);
          setConversation(newConversation);
        });
      });
  };

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

      <div className="h-full mb-8">
        {/* MESSAGE VIEW */}
        <div className="h-full p-5 flex-1">
          {conversation?.messages?.map((message, index) =>
            message._sender === user._id ? (
              <div className="flex justify-end" key={index}>
                <div
                  className={classNames(
                    "bg-primary m-px w-max text-white rounded-l-lg p-3",
                    conversation.messages[index - 1]?._sender !== user._id
                      ? "rounded-t-lg"
                      : "",
                    conversation.messages[index + 1]?._sender !== user._id
                      ? "rounded-b-lg"
                      : ""
                  )}
                >
                  <div>{message.content}</div>
                </div>
              </div>
            ) : (
              <div className="flex justify-start" key={index}>
                <div
                  className={classNames(
                    "bg-secondary m-px w-max text-white rounded-r-lg p-3",
                    conversation.messages[index - 1]?._sender !== user._id
                      ? "rounded-b-lg"
                      : "",
                    conversation.messages[index + 1]?._sender !== user._id
                      ? "rounded-t-lg"
                      : ""
                  )}
                >
                  <div>{message.content}</div>
                </div>
              </div>            )
          )}
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

const mapStateToProps = (state) => ({
  user: state.Auth.user,
});

export default connect(mapStateToProps)(MessagesView);

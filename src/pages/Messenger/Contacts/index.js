import classNames from "classnames";
import Avatar from "components/ui/Avatar";
import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import api from "services/api";
import socket from "services/socket";
import UserCard from "./list";

const Contacts = ({ user }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState();
  const history = useHistory();

  const selectConversation = (conversationId) => {
    setSelectedConversation(conversationId);
    history.push(`/app/messenger/${conversationId}`);
    
    const foundContact = contacts.find((c) => c.conversationId === conversationId)

    if (foundContact) {
      let newArr = [...contacts]
      setContacts([])
      if (!foundContact?.lastMessage?.seenBy?.includes(user._id)) {
        const indexConversation = contacts.findIndex((c) => c.conversationId === conversationId)
        newArr[indexConversation]?.lastMessage?.seenBy?.push(user._id)
        setContacts(newArr)
      }
    }
  };

  const fetchContacts = async () => {
    const data = await api.axios.get("/v1/conversation/contact");

    if (data.contacts) {
      setContacts(data.contacts);
      if (data.contacts[0]?.conversationId) {
        selectConversation(data.contacts[0]?.conversationId);
      }
    }
  };

  const onlineUser = () => {
    socket.on("users", (user) => {
      if (contacts.map((c) => c._id === user.id)) {

         const tmp = contacts.map((c) => {
          if (c._id === user.id) {
            c.online = true
          }
        });
      }
    });
  };

  useEffect(() => {
    fetchContacts();
    onlineUser();
  }, []);

  return (
    <div className="bg-white max-h-full flex-1 shadow-lg rounded-xl px-10 py-9 font-gibson">
      <div className="flex">
        <Avatar displayTag={true} picture={user.picture} />
        <div className="ml-3">
          <div className="text-lg text-dark-500 font-semibold">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-primary-500">Connecté(e)</div>
        </div>
      </div>

      <div className="my-5 flex">
        <div className="text-dark-500 font-semibold">Vos discussions</div>
      </div>
      <div className="bg-gray-300 w-full h-px" />

      <div className="mt-5 overflow-y-scroll h-full">
        {!contacts?.length ? (
          <div className="italic text-gray-400 text-center">
            Vous n'avez pas de conversation
          </div>
        ) : (
          contacts.map((contact, index) => (
            <div
              onClick={() => selectConversation(contact.conversationId)}
              key={contact._id}
            >
              <div
                className={classNames(
                  "cursor-pointer p-2 rounded-xl transform duration-300",
                  selectedConversation === contact.conversationId
                    ? "bg-gray-100 border-gray-300"
                    : ""
                )}
              >
                <UserCard contact={contact} />
              </div>
              {index + 1 < contacts.length && (
                <div className="bg-gray-300 my-3 w-full h-px" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.Auth.user,
});

export default connect(mapStateToProps)(Contacts);

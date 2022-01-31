import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import classNames from "classnames";

import api from "services/api";
import socket from "services/socket";

import Avatar from "components/ui/Avatar";

const Contacts = ({ user }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState();
  const history = useHistory();

  const selectConversation = (conversationId) => {
    setSelectedConversation(conversationId);
    history.push(`/app/messenger/${conversationId}`);

    const foundContact = contacts.find(
      (c) => c.conversationId === conversationId
    );
    if (foundContact) {
      let newArr = [...contacts];
      if (!foundContact?.lastMessage?.seenBy?.includes(user._id)) {
        const indexConversation = contacts.findIndex(
          (c) => c.conversationId === conversationId
        );
        newArr[indexConversation]?.lastMessage?.seenBy?.push(user._id);
        setContacts([...newArr]);
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

  useEffect(() => {
    contacts.forEach((contact) => {
      socket.on(contact.conversationId, (msg, seenBy) => {

        const foundContact = contacts.find(
          (c) => c.conversationId === contact.conversationId
        );
        if (foundContact) {
          let newArr = [...contacts];
          const indexConversation = contacts.findIndex(
            (c) => c.conversationId === contact.conversationId
          );
          newArr[indexConversation].lastMessage = {
            content: msg.content,
            seenBy: seenBy,
          }
          setContacts([...newArr])
        }
      });
    });
  }, [contacts]);

  useEffect(() => {
    fetchContacts();
    // onlineUser();
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
                {/* <UserCard contact={contact} seenBy={contact.lastMessage.seenBy} /> */}
                <div>
                  <div className="flex">
                    <Avatar
                      displayTag={false}
                      size="14"
                      picture={contact?.picture}
                    />
                    <div className="ml-2 font-gibson">
                      <div className="font-semibold text-lg text-dark-500">
                        {contact?.firstName}
                      </div>
                      {contact?.lastMessage ? (
                        <div
                          className={classNames(
                            contact?.lastMessage.seenBy.includes(user._id)
                              ? "text-gray-400"
                              : "font-semibold",
                            "text-sm"
                          )}
                        >
                          {contact?.lastMessage.content.substring(0, 20)}...
                        </div>
                      ) : (
                        <div className="text-gray-400 italic">
                          Aucun message envoyé
                        </div>
                      )}
                    </div>
                    <div>{contact?.lastMessage?._sentAt}</div>
                  </div>
                </div>
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

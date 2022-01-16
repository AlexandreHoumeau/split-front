import Avatar from "components/ui/Avatar";
import React from "react";

const UserCard = ({ contact }) => {
  return (
    <div>
      <div className="flex">
        <Avatar displayTag={false} size="14" picture={contact.picture} />
        <div className="ml-2">
          <div className="font-semibold text-lg text-dark-500">{contact.firstName}</div>
          {contact.lastMessage ? (
            <div>{contact.lastMessage.content}</div>
          ) : (
            <div className="text-gray-400 italic">Aucun message envoyé</div>
          )}
        </div>
        <div>
          {contact.lastMessage?._sentAt}
        </div>
      </div>
    </div>
  );
};

export default UserCard;

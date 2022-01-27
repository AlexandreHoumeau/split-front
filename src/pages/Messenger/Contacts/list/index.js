import classNames from "classnames";
import Avatar from "components/ui/Avatar";
import { connect } from "react-redux";
import React from "react";

const UserCard = ({ contact, user }) => {
  console.log(user)
  return (
    <div>
      <div className="flex">
        <Avatar displayTag={false} size="14" picture={contact.picture} />
        <div className="ml-2 font-gibson">
          <div className="font-semibold text-lg text-dark-500">{contact.firstName}</div>
          {contact.lastMessage ? (
            <div className={classNames(contact.lastMessage.seenBy.includes(user._id) ? 'text-gray-400' : 'font-semibold', 'text-sm')}>{contact.lastMessage.content.substring(0, 18)}...</div>
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
const mapStateToProps = (state) => ({
  user: state.Auth.user
})
export default connect(mapStateToProps)(UserCard);

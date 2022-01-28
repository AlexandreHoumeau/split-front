import classNames from "classnames";
import Avatar from "components/ui/Avatar";
import { connect } from "react-redux";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const UserCard = ({ contact, user }) => {
  const [card, setCard] = useState()

  useEffect(() => {
    setCard(contact)
    console.log('Update card')
  }, [contact, contact?.lastMessage])

  return (
    <div>
      <div className="flex">
        <Avatar displayTag={false} size="14" picture={card?.picture} />
        <div className="ml-2 font-gibson">
          <div className="font-semibold text-lg text-dark-500">{card?.firstName}</div>
          {card?.lastMessage ? (
            <div className={classNames(card?.lastMessage.seenBy.includes(user._id) ? 'text-gray-400' : 'font-semibold', 'text-sm')}>{card?.lastMessage.content.substring(0, 18)}...</div>
          ) : (
            <div className="text-gray-400 italic">Aucun message envoyé</div>
          )}
        </div>
        <div>
          {card?.lastMessage?._sentAt}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.Auth.user
})
export default connect(mapStateToProps)(UserCard);

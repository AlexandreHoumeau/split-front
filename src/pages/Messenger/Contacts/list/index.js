import Avatar from 'components/ui/Avatar'
import React from 'react'

const UserCard = ({ contact }) => {
  console.log(contact)
  return (
    <div>
      <div className="flex">
        <Avatar picture={contact.picture} />
      </div>
    </div>
  )
}

export default UserCard

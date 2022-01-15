import Avatar from "components/ui/Avatar";
import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import api from "services/api";
import UserCard from "./list";

const Contacts = ({ user }) => {
  const [contacts, setContacts] = useState([])

  const fetchContacts = async () => {
    const data = await api.axios.get('/v1/conversation/contact')
    console.log(data)

    if (data.contacts) {
      setContacts(data.contacts)
    }
  }
  useEffect(() => {
    fetchContacts()
  }, [])

  return (
    <div className="bg-white shadow-lg rounded-xl px-10 py-9 font-gibson">
      <div className="flex">
        <Avatar picture={user.picture} />
        <div className="ml-3">
          <div className="text-lg text-dark-500 font-semibold">{user.firstName} {user.lastName}</div>
          <div className="text-primary-500">Connecté(e)</div>
        </div>
      </div>

      <div className="my-5 flex">
        <div className="text-dark-500 font-semibold">Vos discussions</div>
      </div>
      <div className="bg-gray-300 w-full h-px" />

      <div className="mt-5">
        {!contacts?.length ? (
          <div className="italic text-gray-400 text-center">Vous n'avez pas de conversation</div>
        ): (
          contacts.map((contact) => (
            <UserCard contact={contact} />
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

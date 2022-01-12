import Avatar from "components/ui/Avatar";
import React from "react";
import { connect } from "react-redux";

const Contacts = ({ user }) => {
  console.log(user);
  return (
    <div className="bg-white rounded-xl px-10 py-9 font-gibson">
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.Auth.user,
});

export default connect(mapStateToProps)(Contacts);

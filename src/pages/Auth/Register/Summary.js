import React from "react";
import { connect } from "react-redux";

const Summary = ({ profile }) => {
  return (
    <div>
      {profile === "student" ? (
        <>
          <h1 className="font-gibson font-semibold text-3xl">
            Merci de t'être enregistré !
          </h1>
          <p className="font-gibson font-light text-2xl">
            Tu peux maintenant aller te connecter sur cette <a href="/login" className="text-primary-500">page</a>!
          </p>
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.register.profile,
});
export default connect(mapStateToProps)(Summary);

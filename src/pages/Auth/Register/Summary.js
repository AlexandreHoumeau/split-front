import React from "react";
import { connect } from "react-redux";

const Summary = ({ profile, recap }) => {
  return (
    <div>
      {profile === "student" ? (
        <>
          <h1 className="font-gibson font-semibold text-3xl">
            Merci de t'être enregistré !
          </h1>
          <p className="font-gibson font-light text-2xl">
            Tu peux maintenant aller te connecter sur cette{" "}
            <a href="/login" className="text-primary-500">
              page
            </a>
            !
          </p>
        </>
      ) : (
        <div>
          <h1 className="text-3xl font-gibson font-bold mb-4">
            Récpatilulatif
          </h1>
          <p className="w-2/3 text-md mb-8 font-light text-dark-500 font-gibson tracking-wide">
            Voici toutes les informations que tu nous a passé.
          </p>

          <h2 className="text-xl font-gibson text-dark-500 font-bold mb-4">
            Informations de base
          </h2>
            <p className="w-2/3 text-md mb-2 text-dark-300 font-gibson">
              {recap.firstName} {recap.lastName}
            </p>
          <p className="w-2/3 text-md mb-8 font-light text-dark-300 font-gibson">
            {recap.email}
          </p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.register.profile,
  recap: state.register,
});
export default connect(mapStateToProps)(Summary);

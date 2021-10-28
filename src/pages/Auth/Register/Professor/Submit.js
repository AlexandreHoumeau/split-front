import React from "react";
import { useHistory } from "react-router";

const Submit = () => {
  const history = useHistory();

  return (
    <div>
      <h1 className="text-3xl font-gibson font-bold mb-4 cursor-pointer">
        Bravo tu as réussi à t'inscrire !!
      </h1>
      <p className="w-2/3 text-md mb-8 font-light text-dark-700 font-gibson tracking-wide cursor-pointer">
        Tu peux maintenant aller te connecter en cliquant sur le bouton juste en
        dessous.
      </p>
      <div
        onClick={() => history.push("/login")}
        className="flex justify-center"
      >
        <button
          className={`bg-primary-500 text-gray-100 font-gibson py-4 px-10 rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outlineshadow-lg`}
        >
          Aller se connecter
        </button>
      </div>
    </div>
  );
};

export default Submit;

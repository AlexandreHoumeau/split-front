import { setStep, setBio } from "actions/register.action";
import { connect } from "react-redux";
import React from "react";
import { useState } from "react";

const Bio = ({ setStep, setBio, info }) => {
  const [bio, setInformations] = useState(info || "");

  const handleSubmit = () => {
    setBio(bio);
    setStep("about");
  };
  return (
    <div>
      <h1 className="text-3xl font-gibson font-semibold mb-5 text-dark-500">
        Ta spécialité numéro 1
      </h1>
      <p className="text-xl font-gibson mb-5 text-dark-500">
        Dis nous ce que tu fais le mieux en 1 ou 2 mots MAX
      </p>

      <div>
        <input
          value={bio}
          onChange={(e) => setInformations(e.target.value)}
          className="w-full border-2 text-dark-500 font-gibson rounded p-2 border-primary-500"
          placeholder="Github, Post Linkedin, Adobe…"
        />
        <div className="flex justify-end">
          {/* <p className="font-gibson text-dark-300">
            {bio.split(" ").length - 1}/40
          </p> */}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => handleSubmit()}
          disabled={bio.length < 1}
          className={`${
            bio.length < 1 ? "bg-primary-300" : "bg-primary-500"
          } text-gray-100 mt-10 font-gibson py-4 px-10 rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outlineshadow-lg`}
        >
          Valider
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  info: state.register.bio,
});

export default connect(mapStateToProps, { setStep, setBio })(Bio);

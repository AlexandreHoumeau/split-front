import React, { useState } from "react";
import { setStep, setExperience } from "actions/register.action";
import { connect } from "react-redux";

const Exp = ({ setStep, setExperience, experience }) => {
  const [exp, setExp] = useState(experience || "");

  const handleSubmit = () => {
    setExperience(exp);
    setStep("location");
  };

  return (
    <div>
      <h1 className="text-3xl font-gibson font-semibold mb-5 text-dark-500">
        À propos de ton expérience ...
      </h1>
      <p className="text-xl font-gibson mb-5 text-dark-500">
        Raconte nous tes expérience, il faut que les Jedi s'inspire de ton
        parcours.
      </p>

      <div>
        <textarea
          value={exp}
          onChange={(e) => setExp(e.target.value)}
          className="w-full h-48 border-2 text-dark-500 font-gibson rounded p-2 border-primary-500"
          placeholder="Github, Post Linkedin, Adobe…"
        />
        <div className="flex justify-end">
          <p className="font-gibson text-dark-300">
            {exp.split(" ").length - 1}/40
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => handleSubmit()}
          disabled={exp.split(" ").length - 1 < 40}
          className={`${
            exp.split(" ").length - 1 < 40 ? "bg-primary-300" : "bg-primary-500"
          } text-gray-100 mt-10 font-gibson py-4 px-10 rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outlineshadow-lg`}
        >
          Valider
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  experience: state.register.exp,
});

export default connect(mapStateToProps, { setStep, setExperience })(Exp);

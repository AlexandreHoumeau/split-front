import React, { useState } from "react";
import { setStep, setAboutText } from "actions/register.action";
import { connect } from "react-redux";

const About = ({ setAboutText, setStep, aboutYou }) => {
  const [about, setAbout] = useState(aboutYou || "");

  const handleSubmit = () => {
    setAboutText(about);
    setStep("exp");
  };

  return (
    <div>
      <h1 className="text-3xl font-gibson font-semibold mb-5 text-dark-500">
        À propos de toi ...
      </h1>
      <p className="text-xl font-gibson mb-5 text-dark-500">
        Cette descritpion de toi sera celle affichée sur ta miniature.
      </p>

      <div>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full h-48 border-2 text-dark-500 font-gibson rounded p-2 border-primary-500"
          placeholder="Github, Post Linkedin, Adobe…"
        />
        <div className="flex justify-end">
          <p className="font-gibson text-dark-300">
            {about.split(" ").length - 1}/40
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => handleSubmit()}
          disabled={about.split(" ").length - 1 < 40}
          className={`${
            about.split(" ").length - 1 < 40
              ? "bg-primary-300"
              : "bg-primary-500"
          } text-gray-100 mt-10 font-gibson py-4 px-10 rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outlineshadow-lg`}
        >
          Valider
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  aboutYou: state.register.about,
});

export default connect(mapStateToProps, { setStep, setAboutText })(About);

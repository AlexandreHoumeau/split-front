import React, { useRef } from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import Informations from "./BasicInformations";
const Register = ({ step, profile }) => {
  const displayView = () => {
    switch (step) {
      case "profile":
        return <Profile />;
      case "informations":
        return <Informations />;
      default:
        return <Profile />;
    }
  };

  return (
    <div>
      {step !== "profile" ? (
        <div
          className={`min-h-screen ${
            profile === "student" ? "bg-primary-400" : "bg-secondary-400"
          } flex justify-center items-center`}
        >
          <div
            className={`absolute w-60 h-60 rounded-xl ${
              profile === "student" ? "bg-primary-300" : "bg-secondary-300"
            } -top-5 -left-16 z-0 transform rotate-45 hidden md:block`}
          ></div>
          <div
            className={`absolute w-48 h-48 rounded-xl ${
              profile === "student" ? "bg-primary-300" : "bg-secondary-300"
            } -bottom-6 -right-10 transform rotate-12 hidden md:block`}
          ></div>
          <div className="py-12 px-10 lg:px-24 bg-white rounded-2xl shadow-xl z-20">
            <div className="relative mb-5 flex-1 w-full pt-1 mr-16">
              <div className="relative pt-1">
                <div className="flex justify-between mb-2 items-center">
                  <div>
                    <span
                      className={`text-xs mr-2 font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                        profile === "student"
                          ? "text-primary-500 bg-primary-300"
                          : "text-secondary-500 bg-secondary-300"
                      }`}
                    >
                      Inscription en cours
                    </span>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs font-semibold inline-block ${
                        profile === "student"
                          ? "text-primary-500"
                          : "text-secondary-500"
                      }`}
                    >
                      30%
                    </span>
                  </div>
                </div>
                <div
                  className={`overflow-hidden h-2 mb-4 text-xs flex rounded w-full ${
                    profile === "student"
                      ? "bg-primary-300"
                      : "bg-secondary-300"
                  }`}
                >
                  <div
                    style={{ width: "30%" }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      profile === "student"
                        ? "bg-primary-500"
                        : "bg-secondary-500"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
            {displayView()}
          </div>
          <div
            className={`w-40 h-40 absolute ${
              profile === "student" ? "bg-primary-300" : "bg-secondary-300"
            } rounded-full top-0 right-12 hidden md:block`}
          />
          <div
            className={`w-20 h-40 absolute ${
              profile === "student" ? "bg-primary-300" : "bg-secondary-300"
            } rounded-full bottom-20 left-10 transform rotate-45 hidden md:block`}
          ></div>
        </div>
      ) : (
        displayView()
      )}
    </div>
  );
};
const mapStatesToProps = (state) => ({
  step: state.register.step,
  profile: state.register.profile,
});
export default connect(mapStatesToProps, null)(Register);

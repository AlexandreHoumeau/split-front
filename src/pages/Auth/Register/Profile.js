import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { setStep, setProfile } from "actions/register.action";
import { connect } from "react-redux";

const Profile = ({ setStep, setProfile }) => {
  const [jedi, setJedi] = useState(false);
  const [padawan, setPadawan] = useState(false);

  const handleSubmit = async (profile) => {
    await setStep('informations')
    await setProfile(profile)
  }
  return (
    <div className="flex flex-1">
      <div className="flex-1 lg:mt-0 justify-center flex items-center">
        <div className="">
          <h2
            className="text-4xl lg:w-3/4 font-gibson text-dark-500 font-semibold lg:text-left xl:text-4xl
                xl:text-bold"
          >
            Dites nous ce que vous voulez faire
          </h2>
          <div
            onMouseEnter={() => setJedi(true)}
            onMouseLeave={() => setJedi(false)}
            onClick={() => handleSubmit('student')}
            className={`${
              jedi ? " lg:p-12" : ""
            } transition-all p-5 cursor-pointer lg:p-10 m-5 bg-primary-400  duration-300 shadow hover:shadow-lg  my-20 rounded-lg`}
          >
            <h2
              className={`text-white font-semibold font-gibson text-2xl transition-all duration-300`}
            >
              Je veux être formé
            </h2>
            <div className="flex justify-between">
              <div className="">
                <p
                  className={`${
                    jedi ? "text-white" : "text-white"
                  } transition-all font-gibson font-light duration-300 text-2xl`}
                >
                  La voie du Jedi
                </p>
                <div className="hidden lg:block">
                  <p
                    className={`${
                      jedi ? "text-white" : "text-white"
                    } transition-all font-gibson mt-2 duration-300 leading-6 text-xl font-light`}
                  >
                    Il peut choisir des cours et donner des cours cours et
                    donner
                    <br />
                    Lorem ipsum dolor sit
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            onMouseEnter={() => setPadawan(true)}
            onMouseLeave={() => setPadawan(false)}
            onClick={() => handleSubmit('teacher')}
            className={`${
              padawan ? "lg:p-12" : ""
            } transition-all cursor-pointer duration-300 lg:p-10 p-5 m-5 bg-secondary-400 shadow hover:shadow-lg my-5 rounded-lg`}
          >
            <h2
              className={`text-white font-semibold font-gibson text-2xl transition-all duration-300`}
            >
              Je veux donner une formation
            </h2>
            <div className="flex justify-between">
              <div>
                <p
                  className={`${
                    padawan ? "text-white" : "text-white"
                  } transition-all font-gibson font-light duration-300 text-2xl`}
                >
                  La voie du padawan
                </p>
                <div className="hidden lg:block">
                  <p
                    className={`${
                      padawan ? "text-white" : "text-white"
                    } transition-all font-gibson mt-2 duration-300 leading-6 text-xl font-light`}
                  >
                    Il peut choisir des cours et donner des cours cours et
                    donner
                    <br />
                    Lorem ipsum dolor sit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`hidden lg:flex items-center justify-center transition-all duration-300 ${
          jedi ? "bg-primary-400" : padawan ? "bg-secondary-400" : "bg-gray-100"
        } lg:w-1/3 h-screen`}
      >
        <div>
          {jedi ? (
            <Player
              autoplay
              loop
              src="https://assets4.lottiefiles.com/packages/lf20_gomzks5q.json"
              className={`transition-all ${
                jedi ? "opacity-100" : "opacity-0"
              } duration-500`}
            />
          ) : padawan ? (
            <Player
              autoplay
              loop
              speed={1.5}
              src="https://assets4.lottiefiles.com/private_files/lf30_rysgr4xj.json"
              className={`transition-all ${
                padawan ? "opacity-100" : "opacity-0"
              } duration-500`}
            />
          ) : (
            <Player
              autoplay
              loop
              src="https://assets7.lottiefiles.com/packages/lf20_gduz3izv.json"
              className={`transition-all duration-500`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(null, {setProfile, setStep})(Profile);

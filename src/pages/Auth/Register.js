import React from "react";
import { RightOutlined } from "@ant-design/icons";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useState } from "react";

const Register = () => {
  const [jedi, setJedi] = useState(false);
  const [padawan, setPadawan] = useState(false);
  return (
    <div className="lg:flex">
      <div className="flex-1 mt-10 lg:mt-0 justify-center flex items-center">
        <div className="">
          <h2
            className="text-4xl lg:w-3/4 text-dark-500 font-display font-bold lg:text-left xl:text-4xl
                xl:text-bold"
          >
            Dites nous ce que vous voulez faire
          </h2>

          <div
            onMouseEnter={() => setJedi(true)}
            onMouseLeave={() => setJedi(false)}
            className={`${
              jedi ? "bg-primary-400 p-10" : "bg-white"
            } transition-all duration-300 shadow hover:shadow-lg p-5 my-5 rounded-lg`}
          >
            <h2
              className={`${
                jedi ? "text-white" : "text-black"
              } font-bold transition-all duration-300`}
            >
              La voie du Jedi
            </h2>
            <div className="flex justify-between">
              <div>
                <p
                  className={`${
                    jedi ? "text-white" : "text-black"
                  } transition-all duration-300`}
                >
                  Le Jedi ici est un élève formé par des padwan, des professeurs
                </p>
                <p
                  className={`${
                    jedi ? "text-white" : "text-black"
                  } transition-all duration-300`}
                >
                  Il peut choisir pleins de cours différents
                </p>
              </div>
              <RightOutlined
                className={`${
                  jedi ? "text-white" : "text-black"
                } transition-all duration-300`}
              />
            </div>
          </div>

          <div
            onMouseEnter={() => setPadawan(true)}
            onMouseLeave={() => setPadawan(false)}
            className={`${
              padawan ? "bg-secondary-400 p-10" : "bg-white"
            } transition-all duration-300 shadow hover:shadow-lg p-5 my-5 rounded-lg`}
          >
            <h2
              className={`${
                padawan ? "text-white text-xl" : "text-black"
              } font-bold transition-all duration-300`}
            >
              La voie du Padawan
            </h2>
            <div className="flex justify-between">
              <div>
                <p
                  className={`${
                    padawan ? "text-white" : "text-black"
                  } transition-all duration-300`}
                >
                  Le Padawan ici est un professeur qui forme des Jedis, des
                  élèves
                </p>
                <p
                  className={`${
                    padawan ? "text-white" : "text-black"
                  } transition-all duration-300`}
                >
                  Il peut choisir des cours et donner des cours
                </p>
              </div>
              <RightOutlined
                className={`${
                  padawan ? "text-white" : "text-black"
                } transition-all duration-300`}
              />
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
            >
              <Controls
                visible={false}
                buttons={["play", "repeat", "frame", "debug"]}
              />
            </Player>
          ) : padawan ? (
            <Player
              autoplay
              loop
              src="https://assets7.lottiefiles.com/packages/lf20_9dmzmwdm.json"
              className={`transition-all ${
                padawan ? "opacity-100" : "opacity-0"
              } duration-500`}
            >
              <Controls
                visible={false}
                buttons={["play", "repeat", "frame", "debug"]}
              />
            </Player>
          ) : (
            <Player
              autoplay
              loop
              src="https://assets7.lottiefiles.com/packages/lf20_gduz3izv.json"
              className={`transition-all duration-500`}
            >
              <Controls
                visible={false}
                buttons={["play", "repeat", "frame", "debug"]}
              />
            </Player>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;

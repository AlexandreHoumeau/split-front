import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const Loader = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className="absolute z-50 top-0 left-0 w-full h-full">
        <div className="backdrop-filter backdrop-blur-sm w-full h-full flex justify-center" />
        <div className="left-0 right-0 absolute">
          <Player
            autoplay
            loop
            src={require('assets/animations/loader.json')}
            className=" w-1/2 z-50"
          >
            <Controls
              visible={false}
              buttons={["play", "repeat", "frame", "debug"]}
            />
          </Player>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Loader;

import React from "react";
import Dev from "assets/images/dev.png";
import Marketing from "assets/images/marketing.png";
import Design from "assets/images/design.png";
import { connect } from "react-redux";
import { setSector, setStep } from "actions/register.action";

const Sector = () => {
  const handleSubmit = (value) => {
    setSector(value)
    setStep('sectorDetails')
  }

  return (
    <div>
      <h1 className="text-3xl font-gibson font-semibold mb-10">
        Quel est ton domaine ?
      </h1>
      <div onClick={() => handleSubmit('developper')} className="bg-white rounded hover:shadow-lg shadow duration-300 transition-all w-full py-10 px-16 mb-8 cursor-pointer relative">
        <img src={Dev} alt="dev" className="absolute w-20 -left-9 top-3" />
        <h2 className="font-gibson text-dark-500 text-2xl">Développement</h2>
      </div>

      <div onClick={() => handleSubmit('marketing')} className="bg-white rounded hover:shadow-lg shadow duration-300 transition-all w-full py-10 px-16 mb-8 cursor-pointer relative">
        <img src={Design} alt="dev" className="absolute w-20 -left-9 top-3" />
        <h2 className="font-gibson text-dark-500 text-2xl">
          Design
        </h2>
      </div>

      <div onClick={() => handleSubmit('martketing')} className="bg-white rounded hover:shadow-lg shadow duration-300 transition-all w-full py-10 px-16 mb-8 cursor-pointer relative">
        <img src={Marketing} alt="dev" className="absolute w-20 -left-9 top-3" />
        <h2 className="font-gibson text-dark-500 text-2xl">
          Marketing digital
        </h2>
      </div>
    </div>
  );
};

export default connect(null, {setSector, setStep})(Sector);

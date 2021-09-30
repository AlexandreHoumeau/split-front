import { setLocationInformations, setStep } from "actions/register.action";
import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import Arrondissement from "utils/json/arrondissement.json";

const Location = ({ setStep, setLocationInformations }) => {
  const [presentiel, setPresentiel] = useState(false);
  const [location, setLocation] = useState(null);
  const [remote, setRemote] = useState(false);

  const handleSubmit = () => {
    const newValue = {
      presentiel,
      location,
      remote
    }
    setLocationInformations(newValue)
    setStep('phone')
  }
  return (
    <div>
      <h1 className="text-3xl font-gibson font-bold mb-4 cursor-pointer">
        Ou ça ?
      </h1>
      <p className="w-2/3 text-md mb-8 font-light text-dark-500 font-gibson tracking-wide cursor-pointer">
        Tu habite à Tataouine ou dans le fin fond de la creuse ? Pas de soucis
        tu peux aussi faire tes cours en visio !
      </p>

      <div className="mb-10">
        <div className="">
          <label className="font-gibson text-1xl flex items-center">
            <input
              type="checkbox"
              checked={presentiel}
              onChange={() => setPresentiel(!presentiel)}
              className="form-checkbox text-primary-300 h-6 w-6"
            />
            <span className="ml-2 text-dark-500">
              Donner tes formations directement depuis Tataouine (en présentiel)
            </span>
          </label>
        </div>
        {presentiel ? (
          <div className="mt-5 ml-8">
            <p className="text-md mb-2 text-dark-500 font-gibson tracking-wide cursor-pointer">
              Dis nous dans quelle arrondissement tu peux donner des formations
            </p>
            <Select
              closeMenuOnSelect={false}
              styles={customStyles}
              value={location}
              isMulti
              onChange={(value) => setLocation(value)}
              options={Arrondissement}
            />
          </div>
        ) : null}
        <div className="mt-10">
          <label className="font-gibson text-1xl flex items-center">
            <input
              type="checkbox"
              checked={remote}
              onChange={() => setRemote(!remote)}
              className="form-checkbox text-primary-300 h-6 w-6"
            />
            <span className="ml-2 cursor-pointer text-dark-500">
              Donner tes formations depuis ton vaisseau (visioconférence)
            </span>
          </label>
        </div>
      </div>
      <button
        onClick={() => handleSubmit()}
        className={`
         text-gray-100 bg-primary-500 mt-10 font-gibson p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outlineshadow-lg`}
      >
        Valider
      </button>
    </div>
  );
};
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    color: '#6C62FF',
    fontWeight: 'bold',
    padding: 20,
  }),
};

export default connect(null, {setLocationInformations, setStep})(Location);

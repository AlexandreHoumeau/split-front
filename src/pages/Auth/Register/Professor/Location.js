import React from "react";

const Location = () => {
  return (
    <div>
      <h1 className="text-3xl font-gibson font-bold mb-4 cursor-pointer">
        Ou ça ?
      </h1>
      <p className="w-2/3 text-md mb-8 font-light text-dark-700 font-gibson tracking-wide cursor-pointer">
        Tu habite à Tataouine ou dans le fin fond de la creuse ? Pas de soucis
        tu peux aussi faire tes cours en visio !
      </p>

      <div className="">
        <div className="mb-10">
          <label className="font-gibson text-1xl flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-primary-300 h-6 w-6"
            />
            <span class="ml-2">
              Donner tes formations directement depuis Tataouine (en présentiel)
            </span>
          </label>
        </div>
        <div className="">
          <label className="font-gibson text-1xl flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-primary-300 h-6 w-6"
            />
            <span class="ml-2">
              Donner tes formations depuis ton vaisseau (visioconférence)
            </span>
          </label>
        </div>
      </div>
      <button
        // onClick={() => handleSubmit()}
        // disabled={exp.split(" ").length - 1 < 40}
        className={`
         text-gray-100 bg-primary-500 mt-10 font-gibson p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outlineshadow-lg`}
      >
        Valider
      </button>
    </div>
  );
};

export default Location;

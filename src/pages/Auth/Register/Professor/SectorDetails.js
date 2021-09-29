import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";
import { setSectorDetails, setStep } from "actions/register.action";

const details = {
  developper: ["Développement front", "Dev back", "Devops", "Base de données"],
  market: [
    "Rédaction de contenu",
    "Posts sur les réseaux sociaux",
    "Emailing",
    "Créer une roadmap",
  ],
  design: [
    "Maitriser des logiciels de conception",
    "Préparer et animer des test utilisateurs",
    "Réaliser un workflow",
    "Créer des wireframes",
    "Règles d’usages d’UI/UX",
  ],
};

const SectorDetails = ({ sector, setStep, setSectorDetails }) => {
  const [sectors, setSectors] = useState([]);
  const [newSector, setNewSector] = useState("");

  const handleClick = (element) => {
    if (sectors.includes(element)) {
      setSectors(sectors.filter((sec) => sec !== element));
    } else {
      setSectors([...sectors, element]);
    }
  };

  const addSector = (e) => {
    e.preventDefault();
    console.log(newSector);
    details[sector].push(newSector);
    setSectors([...sectors, newSector]);
    setNewSector("");
  };

  const handleSubmit = () => {
    setSectorDetails(sectors);
    setStep('bio');
  }

  return (
    <div>
      <h1 className="text-3xl font-gibson font-semibold mb-5 text-dark-500">
        Un peu plus de détails…
      </h1>
      <div className="flex flex-wrap">
        {details[sector].map((element) => (
          <div
            onClick={() => handleClick(element)}
            className={`bg-white flex justify-between ${
              sectors.includes(element)
                ? "bg-primary-500 text-white"
                : "text-dark-500"
            } items-center shadow-md rounded m-2 p-2 cursor-pointer`}
          >
            <PlusCircleOutlined />
            <h2 className="font-gibson ml-2 text-2xl font-normal">{element}</h2>
          </div>
        ))}
      </div>
      <div className="mt-10 mb-5 text-3xl font-semibold font-gibson text-dark-500">
        <h2>D'autres idées en tête ?</h2>
        <form onSubmit={(e) => addSector(e)}>
          <input
            className="w-full font-gibson text-lg py-2 border-b border-dark-300 focus:outline-none focus:border-primary-500"
            id="email"
            name="email"
            value={newSector}
            onChange={(e) => setNewSector(e.target.value)}
            placeholder="Compétences en plus"
          />
        </form>
        <div className="mt-5 justify-center flex">
          <button
            onClick={() => handleSubmit()}
            className={`${
              !sectors?.length ? "bg-primary-300" : "bg-primary-500"
            } text-gray-100 text-base mt-10 font-gibson p-4 w-full rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outlineshadow-lg`}
            >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sector: state.register.sector,
});

export default connect(mapStateToProps, {setStep, setSectorDetails})(SectorDetails);

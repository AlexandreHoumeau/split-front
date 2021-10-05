import React from "react";
import { connect } from "react-redux";

const Summary = ({ profile, recap }) => {
  console.log(recap);
  const handleSubmit = () => {
    
  };
  return (
    <div>
      {profile === "student" ? (
        <>
          <h1 className="font-gibson font-semibold text-3xl">
            Merci de t'être enregistré !
          </h1>
          <p className="font-gibson font-light text-2xl">
            Tu peux maintenant aller te connecter sur cette{" "}
            <a href="/login" className="text-primary-500">
              page
            </a>
            !
          </p>
        </>
      ) : (
        <div>
          <h1 className="text-3xl font-gibson font-bold mb-4">Récapitulatif</h1>
          <p className="w-2/3 text-md mb-8 font-light text-dark-500 font-gibson tracking-wide">
            Voici à quoi ressemblera ton profil
          </p>
          <div className="flex justify-start">
            <div className="w-1/4">
              <img
                src={recap.photo[0].data_url}
                alt="avatar"
                className="rounded-l-3xl"
              />
            </div>
            <div className="flex">
              <div className="bg-gray-50 p-5 rounded-r-3xl shadow">
                <p className="mb-1 text-xl font-semibold text-dark-300 font-gibson">
                  {recap.firstName} - {recap.lastName}
                </p>
                <p className="mb-2 text-xl font-normal text-dark-300 font-gibson">
                  {recap.bio}
                </p>
                <div className="flex mt-10">
                  <div className="py-1 px-5 bg-dark-500 rounded-full">
                    <p className="text-white font-semibold font-gibson">
                      Paris
                    </p>
                  </div>
                  <div className="py-1 ml-2 px-5 bg-dark-500 rounded-full">
                    <p className="text-white font-semibold font-gibson">
                      Visio
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-10">
            <div className="bg-gray-50 shadow px-10 py-5 rounded-3xl">
              <ul className="list-disc">
                {recap.details.map((element) => (
                  <li className="font-gibson text-xl text-dark-500">
                    {element}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex mt-10">
            <div className="bg-gray-50 shadow px-10 py-5 rounded-3xl">
              <ul className="list-disc">
                <li className="font-gibson text-xl text-dark-500">
                  {recap.email}
                </li>
                <li className="font-gibson text-xl text-dark-500">
                  {recap.firstName}
                </li>
                <li className="font-gibson text-xl text-dark-500">
                  {recap.lastName}
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className={`bg-primary-500 text-gray-100 text-lg mt-10 font-gibson py-4 px-10 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outlineshadow-lg`}
            >
              Valider
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.register.profile,
  recap: state.register,
});
export default connect(mapStateToProps)(Summary);

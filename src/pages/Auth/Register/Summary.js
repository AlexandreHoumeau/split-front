import React from "react";
import { connect } from "react-redux";
import { setStep } from "actions/register.action";

const Summary = ({ profile, recap, setStep }) => {
  const handleSubmit = () => {
    setStep("email")
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
          <div className="bg-white shadow-md h-96 mx-3 rounded-3xl flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-3/5">
            <img
              className="h-1/2 w-full sm:h-full sm:w-1/2 object-cover"
              src={recap.photo[0].data_url}
              alt="profile_picture"
            />
            <div className="flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2">
              <div className="flex flex-col justify-start items-baseline">
                <h1 className="text-lg font-normal mb-0 text-gray-600 font-sans">
                  {recap.firstName} - {recap.lastName}
                </h1>
                <span className="text-md font-gibson font-semibold text-primary-300 mt-0">
                  {recap.bio}
                </span>
              </div>
              <div className="flex mt-10 w-full">
                {recap.location?.presentiel && (
                  <div className="py-1 px-4 mr-3 bg-primary-300 rounded-full">
                    <p className="text-white font-semibold font-gibson">
                      Paris
                    </p>
                  </div>
                )}
                {recap.location?.presentiel && (
                  <div className="py-1 mr-5 px-4 bg-secondary-400 rounded-full">
                    <p className="text-white font-semibold font-gibson">
                      Visio
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex mt-10">
            <div className="bg-white shadow-md px-10 py-5 rounded-3xl">
              <ul className="list-disc">
                {recap.details.map((element) => (
                  <li className="font-gibson text-xl text-dark-500">
                    {element}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {recap.about && (
            <div className="flex mt-10 h-48">
              <div className="bg-white shadow-md px-10 py-5 overflow-scroll rounded-3xl">
                <h1 className="text-xl font-gibson font-semibold mb-4">
                  À propos de toi
                </h1>
                <p>{recap.about}</p>
              </div>
            </div>
          )}

          {recap.exp && (
            <div className="flex mt-10 h-48">
              <div className="bg-white shadow-md px-10 py-5 overflow-scroll rounded-3xl">
                <h1 className="text-xl font-gibson font-semibold mb-4">
                  À propos de tes expericences
                </h1>
                <p>{recap.exp}</p>
              </div>
            </div>
          )}

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
export default connect(mapStateToProps, { setStep })(Summary);

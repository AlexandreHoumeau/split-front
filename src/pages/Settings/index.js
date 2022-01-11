import React from "react";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="xl:px-32 xl:py-16 px-8 py-4">
      <div className="font-gibson text-2xl mb-14 text-dark-500">
        Ton profil : <span className="font-semibold">Julie Dupont</span>
      </div>
      <div className="font-gibson text-2xl mb-4 font-semibold text-dark-500">
        Ton compte
      </div>
      <div className="md:grid grid-cols-4  space-x-6">
        <div className="col-span-3">
          <div className="bg-white flex space-x-6 rounded-3xl p-6">
            <Link
              to={{ pathname: "settings/informations" }}
              className="bg-blueGray-100 cursor-pointer w-full rounded-3xl py-16 px-10"
            >
              <div className="font-gibson text-2xl text-primary-500 font-semibold">
                Infos personnelles
              </div>
              <div className="font-gibson text-dark-500 text-xl">
                Informations personnelles type identité, adresse mail, numéro de
                téléphone…
              </div>
            </Link>

            <Link
              to={{ pathname: "settings/notifications" }}
              className="bg-blueGray-100 cursor-pointer w-full rounded-3xl py-16 px-10"
            >
              <div className="font-gibson text-2xl text-primary-500 font-semibold">
                Notifications
              </div>
              <div className="font-gibson text-dark-500 text-xl">
                Préférences de notification, comment tu souhaites être contacté…
              </div>
            </Link>
          </div>

          <div className="font-gibson text-2xl mb-4 font-semibold text-dark-500 mt-12">
            Sécurité et paiement
          </div>
          <div className="bg-white flex space-x-6 rounded-3xl p-6">
            <Link
              to={{ pathname: "settings/payment" }}
              className="bg-blueGray-100 cursor-pointer w-full rounded-3xl py-16 px-10"
            >
              <div className="font-gibson text-2xl text-primary-500 font-semibold">
                Paiements et virements
              </div>
              <div className="font-gibson text-dark-500 text-xl">
                Moyen de paiement, mode de paiement et versements…
              </div>
            </Link>

            <Link to={{pathname: 'settings/password'}} className="bg-blueGray-100 cursor-pointer w-full rounded-3xl py-16 px-10">
              <div className="font-gibson text-2xl text-primary-500 font-semibold">
                Mot de passe
              </div>
              <div className="font-gibson text-dark-500 text-xl">
                Mise à jour de mot de passe
              </div>
            </Link>
          </div>
        </div>

        <div>
          <div className="bg-white shadow-lg rounded-3xl py-6 px-4">
            <div className="font-gibson text-2xl text-primary-500 mb-4 font-semibold">
              Quelles informations sont communiquées aux autres utilisateurs ?
            </div>
            <div className="font-gibson text-dark-500 text-xl">
              Nous ne communiquons tes coordonnées seulement après la
              confirmation de réservation d’une formation. Les utilisateurs ont
              accès à ton département, tes avis et les informations que tu as
              complétées dans ton profil. (A propos, expérience…)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Switch } from "@headlessui/react";
import classNames from "classnames";
import { connect } from "react-redux";

import { ArrowLeftIcon } from "assets/icons";
import Button from "components/ui/button";

import api from "services/api";
import { getUserData } from "store/actions";

const Notifications = ({ user, getUserData }) => {
  const history = useHistory();

  const [informations, setInformations] = useState({
    smsMessenger: user.notifications?.smsMessenger || false,
    emailMessenger: user.notifications?.emailMessenger || false,
    smsReminder: user.notifications?.smsReminder || false,
    emailReminder: user.notifications?.emailReminder || false,
    smsPromote: user.notifications?.smsPromote || false,
    emailPromote: user.notifications?.emailPromote || false,
  });

  useEffect(() => {
    getUserData();
  }, []);

  const handleSubmit = () => {
    const newData = {
      notifications: {
        ...informations,
      },
    };
    api.axios.put("/v1/auth/me", newData).then((res) => {
      getUserData();
    });
  };

  const renderSwitch = (label, state, value) => (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label
          className={classNames(
            label === "SMS" ? "mr-6" : "mr-4",
            "font-gibson text-dark-500"
          )}
        >
          {label}
        </Switch.Label>
        <Switch
          checked={value}
          onChange={(bool) =>
            setInformations({ ...informations, [state]: bool })
          }
          className={`${
            informations[state] ? "bg-primary-500" : "bg-gray-200"
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <span
            className={`${
              informations[state] ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );

  return (
    <div>
      <div className="p-5 flex items-center" onClick={() => history.goBack()}>
        <ArrowLeftIcon />
        <div className="text-secondary-500 ml-2 cursor-pointer font-gibson font-semibold text-xl">
          Retour
        </div>
      </div>

      <div className="xl:px-32 xl:py-16 px-8 py-4">
        <div className="font-gibson font-semibold text-2xl mb-5 text-dark-500">
          Notifications
        </div>
        <div className="lg:grid items-start grid-cols-4 space-x-8">
          <div className="bg-white col-span-3 rounded-3xl p-6">
            <div className="">
              <div className="font-gibson font-semibold text-xl text-dark-500">
                Messagerie
              </div>

              <div className="font-gibson text-base  text-dark-500">
                Lorsqu’un utilisateur t’envoie un message ou que tu reçois une
                réservation
              </div>
              <div className="mt-4">
                <div className="">
                  {renderSwitch(
                    "Email",
                    "emailMessenger",
                    informations.emailMessenger
                  )}
                </div>
                <div className="w-1/3 my-4 h-px bg-gray-400" />
                <div className="">
                  {renderSwitch(
                    "SMS",
                    "smsMessenger",
                    informations.smsMessenger
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="font-gibson font-semibold text-xl text-dark-500">
                Rappels
              </div>
              <div className="font-gibson text-base  text-dark-500">
                Rappels des horaires de formations réservées, des demandes
                d’avis
              </div>
              <div className="mt-4">
                <div className="">
                  {renderSwitch(
                    "Email",
                    "emailReminder",
                    informations.emailReminder
                  )}
                </div>
                <div className="w-1/3 my-4 h-px bg-gray-400" />
                <div className="">
                  {renderSwitch("SMS", "smsReminder", informations.smsReminder)}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="font-gibson font-semibold text-xl text-dark-500">
                Promotions et newsletter
              </div>

              <div className="font-gibson text-base  text-dark-500">
                Coupons, infos promotionnelles et newsletter par email
              </div>
              <div className="mt-4">
                <div className="">
                  {renderSwitch(
                    "Email",
                    "emailPromote",
                    informations.emailPromote
                  )}
                </div>
                <div className="w-1/3 my-4 h-px bg-gray-400" />
                <div className="">
                  {renderSwitch("SMS", "smsPromote", informations.smsPromote)}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <Button
                action={handleSubmit}
                text="Mettre à jour"
                type="primary"
              />
            </div>
          </div>
          <div className="bg-white hidden xl:block h-auto shadow-lg rounded-3xl py-6 px-4">
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

const mapStateToProps = (state) => ({
  user: state.Auth.user,
});

export default connect(mapStateToProps, { getUserData })(Notifications);

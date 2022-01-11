import { ArrowLeftIcon } from "assets/icons";
import Button from "components/ui/button";
import React, { useState } from "react";
import { useHistory } from "react-router";
import CheckoutForm from "./NewCard";
import { useEffect } from "react";

const Payments = () => {
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.getElementById("root").style.filter = "blur(5px)";
    } else {
      document.getElementById("root").style.filter = "none";
    }
  }, [isOpen]);

  const history = useHistory();

  return (
    <>
      <div className="p-5 flex items-center" onClick={() => history.goBack()}>
        <ArrowLeftIcon />
        <div className="text-secondary-500 ml-2 cursor-pointer font-gibson font-semibold text-xl">
          Retour
        </div>
      </div>

      <div className="xl:px-32 xl:py-16 px-8 py-4">
        <div className="flex justify-between">
          <div className="font-gibson font-semibold text-2xl mb-5 text-dark-500">
            Mode de paiement
          </div>
        </div>

        <div className="2xl:grid items-start grid-cols-4 space-x-8">
          <div className="bg-white col-span-3 rounded-3xl p-6">
            <div></div>

            <div className="flex justify-center">
              <Button
                text="Ajouter un mode de paiment"
                type="primary"
                action={() => setIsOpen(true)}
              />
            </div>
          </div>
          <div className="bg-white hidden 2xl:block h-auto shadow-lg rounded-3xl py-6 px-4">
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
      <CheckoutForm isOpen={isOpen} setIsOpen={(value) => setIsOpen(value)} />
    </>
  );
};

export default Payments;

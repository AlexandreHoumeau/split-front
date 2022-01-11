import React from "react";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";

import { ArrowLeftIcon } from "assets/icons";
import Input from "components/settings/input";
import Button from "components/ui/button";
import api from "services/api";

const Password = () => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(
        "Merci de renseigner le mot de passe actuel"
      ),
      newPassword: Yup.string()
        .min(8, "Ton mot de passe dpot faire plus de 8  caractères")
        .required("Merci de renseigner le nouveau mot de passe"),
    }),

    onSubmit: async (values, { resetForm }) => {
      api.axios.put('/v1/auth/password', values)
      resetForm()
    }
  });

  return (
    <>
      <div className="p-5 flex items-center" onClick={() => history.goBack()}>
        <ArrowLeftIcon />
        <div className="text-secondary-500 ml-2 cursor-pointer font-gibson font-semibold text-xl">
          Retour
        </div>
      </div>

      <div className="xl:px-32 xl:py-16 px-8 py-4">
        <div className="font-gibson font-semibold text-2xl mb-5 text-dark-500">
          Mot de passe
        </div>

        <div className="lg:grid items-start grid-cols-4 space-x-8">
          <div className="bg-white col-span-3 rounded-3xl p-6">
            <form className="" onSubmit={formik.handleSubmit}>
              <div className="lg:grid items-start grid-cols-2 space-x-8">
                <div>
                  <Input
                    type="password"
                    id="currentPassword"
                    label="Mot de passe actuel"
                    labelClass="text-lg mb-2"
                    value={formik.values.currentPassword}
                    handleBlur={formik.handleBlur}
                    error={
                      formik.touched.currentPassword &&
                      formik.errors.currentPassword
                        ? formik.errors.currentPassword
                        : null
                    }
                    handleChange={formik.handleChange}
                    placeholder="Rentrez votre mot de passe"
                  />
                  <small className="font-gibson text-gray-400">
                    Le mot de passe doit contenir minimum 6 caractères
                  </small>
                </div>

                <div>
                  <Input
                    type="password"
                    id="newPassword"
                    labelClass="text-lg mb-2"
                    label="Nouveau mot de passe"
                    value={formik.values.newPassword}
                    handleBlur={formik.handleBlur}
                    error={
                      formik.touched.newPassword && formik.errors.newPassword
                        ? formik.errors.newPassword
                        : null
                    }
                    handleChange={formik.handleChange}
                    placeholder="Rentrez votre nouveau mot de passe"
                  />{" "}
                </div>
              </div>
              <div className="flex justify-center">
              <Button text="METTRE À JOUR" type="primary" action={formik.handleSubmit} />
              </div>
            </form>
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
    </>
  );
};

export default Password;

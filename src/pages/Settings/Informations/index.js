import Input from "components/settings/input";
import Button from "components/ui/button";
import React from "react";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "store/actions";
import api from "services/api";
import { ArrowLeftIcon } from "assets/icons";
import { useHistory } from "react-router";

const EditInformations = ({ user, getUserData }) => {
  const history = useHistory();

  useEffect(() => {
    getUserData();
  }, []);

  const goBack = () => {
    history.goBack();
  };

  const formik = useFormik({
    initialValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email invalide")
        .required("Ce champ est requis"),
      firstName: Yup.string().required("Ce champ est requis"),
      lastName: Yup.string().required("Ce champ est requis"),
      phone: Yup.string().required("Ce champ est requis"),
    }),

    onSubmit: async (values) => {
      api.axios.put("/v1/auth/me", values).then(() => {
        getUserData();
      });
    },
  });

  return (
    <div>
      <div className="p-5 flex items-center" onClick={goBack}>
        <ArrowLeftIcon />
        <div className="text-secondary-500 ml-2 cursor-pointer font-gibson font-semibold text-xl">
          Retour
        </div>
      </div>
      <div className="xl:px-32 xl:py-16 px-8 py-4">
        <div className="font-gibson font-semibold text-2xl mb-5 text-dark-500">
          Infos personnelles
        </div>
        <div className="grid grid-cols-4 space-x-8">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white col-span-3 space-x-6 rounded-3xl p-6"
          >
            <div className="grid grid-cols-2 space-x-12">
              <div>
                <Input
                  className="w-full font-gibson text-lg py-2 border-b border-dark-300 focus:outline-none focus:border-primary-500"
                  id="firstName"
                  name="firstName"
                  type="firstName"
                  placeholder="Rentrez votre prénom"
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                <PhoneInput
                  inputStyle={{ width: "100%" }}
                  containerClass="mt-10"
                  inputClass=""
                  country={"fr"}
                  placeholder="6 51 .."
                  value={formik.values.phone}
                  specialLabel="Ton numéro de téléphone"
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <Input
                  className="w-full font-gibson text-lg py-2 border-b border-dark-300 focus:outline-none focus:border-primary-500"
                  id="lastName"
                  name="lastName"
                  type="lastName"
                  placeholder="Rentrez votre nom de famille"
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                <Input
                  className="w-full font-gibson text-lg py-2 border-b border-dark-300 focus:outline-none focus:border-primary-500"
                  id="email"
                  name="email"
                  type="email"
                  disable={true}
                  placeholder="Rentrez votre email"
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <Button type="primary" text="METTRE À JOUR" />
            </div>
          </form>
          <div>
            <div className="bg-white shadow-lg rounded-3xl py-6 px-4">
              <div className="font-gibson text-2xl text-primary-500 mb-4 font-semibold">
                Quelles informations sont communiquées aux autres utilisateurs ?
              </div>
              <div className="font-gibson text-dark-500 text-xl">
                Nous ne communiquons tes coordonnées seulement après la
                confirmation de réservation d’une formation. Les utilisateurs
                ont accès à ton département, tes avis et les informations que tu
                as complétées dans ton profil. (A propos, expérience…)
              </div>
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

export default connect(mapStateToProps, { getUserData })(EditInformations);

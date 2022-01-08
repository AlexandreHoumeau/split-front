import Input from "components/settings/input";
import Button from "components/ui/button";
import React from "react";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

const EditInformations = ({ user }) => {
  const formik = useFormik({
    initialValues: {
      email: user.email || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
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
      console.log(values);
    },
  });

  return (
    <div className="xl:px-32 xl:py-16 px-8 py-4">
      <div className="font-gibson font-semibold text-2xl mb-5 text-dark-500">
        Infos personnelles
      </div>
      <div className="grid grid-cols-5">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white col-span-4 space-x-6 rounded-3xl p-6"
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
                containerClass="mt-10 w-[100px]"
                inputClass="w-[100px]"
                country={"fr"}
                placeholder="6 51 .."
                value={formik.values.phone}
                specialLabel="Ton numéro de téléphone"
                onChange={formik.handleChange}
              />
              <Input placeholder="Taper ici" />
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
              <Input placeholder="Taper ici" />
              <Input placeholder="Taper ici" />
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <Button type="primary" text="METTRE À JOUR" />
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.Auth.user,
});

export default connect(mapStateToProps)(EditInformations);

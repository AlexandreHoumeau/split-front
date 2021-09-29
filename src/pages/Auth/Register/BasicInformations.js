import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { setInformation, setStep } from "actions/register.action";

const Informations = ({ profile, user, setInformation, setStep }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState(user.password || "");

  const formik = useFormik({
    initialValues: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Merci de renseigner votre prénom"),
      lastName: Yup.string().required("Merci de renseigner votre prénom"),
      email: Yup.string()
        .email("Email invalide")
        .required("Merci de renseigner un email"),
      password: Yup.string().required("Merci de renseigner un mot de passe"),
    }),
    onSubmit: async (values) => {
      setInformation(values)
      if (profile === 'student') {
        setStep('summary')
      } else {
        setStep('sector')
      }
    }
  });

  return (
    <>
      <div>
        <h1 className="text-3xl font-gibson font-bold mb-4 cursor-pointer">
          Dites nous en un peu plus sur vous
        </h1>
        <p className="w-2/3 text-md mb-8 font-light text-dark-700 font-gibson tracking-wide cursor-pointer">
          Nous avons besoin de quelques informations, pour savoir quel{" "}
          {profile === "teacher" ? "Padawan" : "Jedi"} vous êtes.
        </p>
      </div>
      <div className="space-y-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="text-sm font-gibson font-semibold text-dark-500 tracking-wide">
            PRENOM
          </div>
          <input
            className="w-full font-gibson text-lg py-2 border-b border-dark-300 focus:outline-none focus:border-primary-500"
            id="firstName"
            name="firstName"
            type="firstName"
            placeholder="Rentrez votre prénom"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="text-red-500 font-gibson">
              {formik.errors.firstName}
            </div>
          ) : null}
          <div className="text-sm mt-10 font-gibson font-semibold text-dark-500 tracking-wide">
            NOM DE FAMILLE
          </div>
          <input
            className="w-full font-gibson text-lg py-2 border-b border-dark-300 focus:outline-none focus:border-primary-500"
            id="lastName"
            name="lastName"
            type="lastName"
            placeholder="Rentrez votre nom de famille"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="text-red-500 font-gibson">
              {formik.errors.lastName}
            </div>
          ) : null}
          <div className="text-sm mt-10 font-gibson font-semibold text-dark-500 tracking-wide">
            EMAIL
          </div>
          <input
            className="w-full font-gibson text-lg py-2 border-b border-dark-300 focus:outline-none focus:border-primary-500"
            id="email"
            name="email"
            type="email"
            placeholder="Rentrez votre email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 font-gibson">
              {formik.errors.email}
            </div>
          ) : null}
          <div className="text-sm mt-10 font-gibson font-semibold text-dark-500 tracking-wide">
            MOT DE PASSE
          </div>
          <input
            className="w-full font-gibson text-lg py-2 border-b border-dark-300 focus:outline-none focus:border-primary-500"
            id="password"
            name="password"
            type="password"
            securetextentry={true}
            placeholder="Rentrez votre mot de passe"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 font-gibson">
              {formik.errors.password}
            </div>
          ) : null}
          <div className="mt-10 justify-center flex">
            <button
              className={`${
                !(formik.isValid && formik.dirty)
                  ? "bg-primary-300"
                  : "bg-primary-500"
              } text-gray-100 font-gibson p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outlineshadow-lg`}
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  profile: state.register.profile,
  user: state.register,
});

export default connect(mapStateToProps, { setInformation, setStep })(Informations);

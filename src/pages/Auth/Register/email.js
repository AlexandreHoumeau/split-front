import React, { useState } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import { useFormik } from "formik";
import { setInformation, setStep } from "actions/register.action";

const Email = ({ profile, user, setInformation, setStep }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formik = useFormik({
    initialValues: {
      email: email,
      password: password,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email invalide")
        .required("Merci de renseigner un email"),
      password: Yup.string()
        .min(8, "Ton mot de passe dpot faire plus de 8  caractères")
        .required("Merci de renseigner un mot de passe"),
    }),
    onSubmit: async (values) => {
      setInformation(values);
      if (profile === "student") {
        setStep("summary");
      } else {
        setStep("sector");
      }
    },
  });
  return (
    <>
      <div>
        <h1 className="text-3xl font-gibson font-bold mb-4 cursor-pointer">
          Et le plus important ...
        </h1>
        <p className="w-2/3 text-md mb-8 font-light text-dark-700 font-gibson tracking-wide cursor-pointer">
          Nous avons besoin de t'on email pour créer ton compte
        </p>
      </div>
      <div className="space-y-4">
        <form onSubmit={formik.handleSubmit}>
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
              } text-gray-100 font-gibson py-4 px-10 rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outlineshadow-lg`}
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Email;

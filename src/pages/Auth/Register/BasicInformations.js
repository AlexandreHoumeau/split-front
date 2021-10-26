import React, { useState } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { setInformation, setStep } from "actions/register.action";
import Input from "components/ui/input";

const Informations = ({ profile, user, setInformation, setStep }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");

  const formik = useFormik({
    initialValues: {
      firstName: firstName,
      lastName: lastName,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Merci de renseigner votre prénom"),
      lastName: Yup.string().required(
        "Merci de renseigner votre nom de famille"
      ),
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
          Dites nous en un peu plus sur vous
        </h1>
        <p className="w-2/3 text-md mb-8 font-light text-dark-700 font-gibson tracking-wide cursor-pointer">
          Nous avons besoin de quelques informations, pour savoir quel{" "}
          {profile === "teacher" ? "Padawan" : "Jedi"} vous êtes.
        </p>
      </div>
      <div className="space-y-4">
        <form onSubmit={formik.handleSubmit}>
          <Input
            id="firstName"
            label="Prénom"
            value={formik.values.firstName}
            handleBlur={formik.handleBlur}
            error={
              formik.touched.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : null
            }
            handleChange={formik.handleChange}
            placeholder="Merci de renseigner ton prénom"
          />
          <Input
            id="lastName"
            label="Nom de famille"
            value={formik.values.lastName}
            handleBlur={formik.handleBlur}
            error={
              formik.touched.lastName && formik.errors.lastName
                ? formik.errors.lastName
                : null
            }
            handleChange={formik.handleChange}
            placeholder="Merci de renseigner ton nom de famille"
          />
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
const mapStateToProps = (state) => ({
  profile: state.register.profile,
  user: state.register,
});

export default connect(mapStateToProps, { setInformation, setStep })(
  Informations
);

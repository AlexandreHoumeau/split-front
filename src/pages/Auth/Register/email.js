import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "components/ui/input";
import PasswordStrength from "components/ui/passwordStrength";
import { setEmail, setStep } from "actions/register.action";
import { connect } from "react-redux";
import api from "services/api";
import Loader from "components/ui/loader";
import { useState } from "react";

const Email = ({ setEmail, user, setStep }) => {
  const [isLoading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email invalide")
        .required("Merci de renseigner un email"),
      password: Yup.string()
        .min(8, "Ton mot de passe dpot faire plus de 8  caractères")
        .required("Merci de renseigner un mot de passe"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Les mots de passe ne sont pas similaire"
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await setEmail(values);

      const newData = {
        ...user,
        location: user.location,
        email: values.email,
        password: values.password,
      };
      console.log(newData)
      await api.axios
        .post("/v1/auth/register", newData)
        .then((res) => {
          setStep("submit");
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 300);
        });
    },
  });
  return (
    <>
      <Loader isLoading={isLoading} />
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
          <Input
            id="email"
            label="Email"
            value={formik.values.email}
            handleBlur={formik.handleBlur}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
            handleChange={formik.handleChange}
            placeholder="Merci de renseigner votre email"
          />
          <Input
            type="password"
            id="password"
            label="Mot de Passe"
            value={formik.values.password}
            handleBlur={formik.handleBlur}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
            }
            handleChange={formik.handleChange}
            placeholder="Rentrez votre mot de passe"
          />
          <PasswordStrength password={formik.values.password} />

          <Input
            type="password"
            id="confirmPassword"
            label="Confirmer le mot de passe"
            value={formik.values.confirmPassword}
            handleBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : null
            }
            handleChange={formik.handleChange}
            placeholder="Rentrez votre mot de passe"
          />
          <div className="mt-10 justify-center flex">
            <button
              className={`${
                !(formik.isValid && formik.dirty)
                  ? "bg-primary-300"
                  : "bg-primary-500"
              } 
                  text-gray-100 font-gibson py-4 px-10 rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outlineshadow-lg`}
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
  user: state.register,
});
export default connect(mapStateToProps, { setEmail, setStep })(Email);

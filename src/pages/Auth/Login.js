import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "services/api";
import { useHistory } from "react-router";

const Login = () => {
  const [error, setError] = useState(null);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email invalide")
        .required("Ce champ est requis"),
      password: Yup.string().required("Ce champ est requis"),
    }),

    onSubmit: async (values) => {
      setError(null);
      await api.axios
        .post("/v1/auth/login", values)
        .then((res) => {
          console.log({res})
          history.push('/dashboard');
          console.log('Hello World after history push')
        })
        .catch((err) => {
          notify({ $type: "error", $message: "Une erreur est survenue" });
          setError("Une erreur est survenue");
          if (err.response?.data?.$message) {
            notify({ $type: "error", $message: err.response?.data?.$message });
            setError(err.response?.data?.$message);
          }
        });
    },
  });

  const notify = (values) => toast[values.$type](values.$message);

  return (
    <div>
      <ToastContainer />
      <div className="lg:flex">
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <div className="py-12 bg-primary-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
            <div className="cursor-pointer flex items-center">
              <a
                href="/"
                className="text-2xl text-primary-500 tracking-wide ml-2 font-semibold"
              >
                Split
              </a>
            </div>
          </div>
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-primary-500 font-display font-semibold lg:text-left xl:text-5xl
                xl:text-bold"
            >
              Connexion
            </h2>
            <div className="mt-12">
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Email
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-primary-500"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Rentrez votre email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Mot de passe
                    </div>
                    <div>
                      <a
                        href="/newPassword"
                        className="text-xs font-display font-semibold text-primary-500 hover:text-primary-800 cursor-pointer"
                      >
                        Mot de passe oublié?
                      </a>
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-primary-500"
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
                    <div className="text-red-500">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="mt-10">
                  <button
                    className={`${
                      !(formik.isValid && formik.dirty)
                        ? "bg-primary-300"
                        : "bg-primary-500"
                    } text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outlineshadow-lg`}
                  >
                    Connexion
                  </button>
                  {error ? (
                    <div className="text-red-500 text-center mt-5 font-semibold">
                      {error}
                    </div>
                  ) : null}
                </div>
              </form>
              <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                Vous n'avez pas de compte ?{" "}
                <a
                  href="/register"
                  className="cursor-pointer text-secondary-500 hover:text-secondary-600"
                >
                  S'enregistrer
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center bg-primary-300 flex-1 h-screen">
          {/* <img alt="Teaching" className="object-cover" src={TeachingImage} /> */}

          <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;

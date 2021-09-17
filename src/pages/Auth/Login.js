import React from "react";
import TeachingImage from "../../assets/images/teaching.jpg";

const Login = () => {
  return (
    <div className="min-h-screen flex justify-between bg-gray-50">
      <div className="w-full space-y-8">
        <div className="m-10">
          <span className="text-yellow-600 font-semibold">Retour</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
            Connexion
          </h2>
        </div>
        <form>
          <div className="justify-center flex">
            <div className="w-3/4 lg:w-2/4">
              <div className="mb-5 mt-10 ">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="rounded w-full px-3 py-5 border border-purple-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div className="">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="rounded px-3 py-5 w-full border border-purple-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mot de passe"
                />
              </div>
              <div className="mt-10 flex justify-center">
                <button
                  type="submit"
                  className="py-4 px-12 text-lg font-bold rounded-full text-white bg-purple-400 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  CONNEXION
                </button>
              </div>
              <div className="mt-8">
                <p className="text-gray-700">
                  Pas de compte ?{" "}
                  <a href="/#" className="text-indigo-500 underline">
                    Inscris toi{" "}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full min-h-full bg-red-100">
        <div className="absolute pt-12 pl-10">
          <p className="text-white text-7xl font-bold w-4/5 leading-normal">
            Le reverse mentoring, quand le{" "}
            <span className="text-indigo-500">Padawn</span> forme le{" "}
            <span className="text-yellow-500">Jedi</span>
          </p>
        </div>
        <img
          className="object-cover min-h-full"
          src={TeachingImage}
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default Login;

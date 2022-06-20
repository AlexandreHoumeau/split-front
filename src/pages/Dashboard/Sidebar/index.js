import React from "react";
import routes from "routes/sidebar";
import { Route, NavLink } from "react-router-dom";
import logo from "assets/images/logo_purple.png"; // with import
import * as Icons from "assets/icons";
import api from "services/api";
import { useHistory } from "react-router";

const Sidebar = () => {
  const history = useHistory();
  function Icon({ icon, ...props }) {
    const Icon = Icons[icon];
    return <Icon {...props} />;
  }

  const logout = async () => {
    await api.axios
      .post("/v1/auth/logout")
      .then((res) => {
        if (res) {
          history.push("/login");
          localStorage.clear()
        } 
      })
  };
  return (
    <aside className="shadow-lg z-50 justify-between hidden w-80 h-full   overflow-y-auto bg-white dark:bg-gray-800 flex-col lg:flex">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <a
          className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          href="/app/home"
        >
          <img alt="logo split" className="w-16 ml-6" src={logo} />
        </a>
        <ul className="mt-6">
          {routes.map((route) => (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex font-gibson hover:text-gray-500 text-gray-600 items-center w-full text-sm font-semibold transition-colors duration-300"
                activeClassName="text-primary-500"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute transition-all duration-300 inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon
                  className="w-5 h-5"
                  aria-hidden="true"
                  icon={route.icon}
                />
                <Route />
                <span className="ml-4 text-xl">{route.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div
        onClick={() => logout()}
        className="flex justify-center items-center cursor-pointer mt-auto mb-10"
      >
        <Icon className="w-5 h-5" aria-hidden="true" icon="LogoutIcon" />
        <div className="text-center ml-2 font-gibson text-dark-500 font-semibold text-xl">
          Déconnexion
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

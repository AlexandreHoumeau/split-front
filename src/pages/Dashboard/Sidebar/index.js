import React from "react";
import routes from "routes/sidebar";
import { Route, NavLink } from 'react-router-dom'
import logo from 'assets/images/logo_purple.png'; // with import
import * as Icons from 'assets/icons'


const Sidebar = () => {

  function Icon({ icon, ...props }) {
    const Icon = Icons[icon]
    return <Icon {...props} />
  }
  return (
    <aside className="shadow-lg z-50 flex-shrink-0 hidden w-80 overflow-y-auto bg-white dark:bg-gray-800 lg:block">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <a
          className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          href="/app/accueil"
        >
          <img alt="logo split" className="w-16 ml-8" src={logo} />
        </a>
        <ul className="mt-6">
          {routes.map((route) => (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex font-gibson text-gray-600 items-center w-full text-sm font-semibold transition-colors duration-300"
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
                <Route  />
                <span className="ml-4 text-xl">{route.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="px-6 my-6">
          {/* <Button>
            Create account
            <span className="ml-2" aria-hidden="true">
              +
            </span>
          </Button> */}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
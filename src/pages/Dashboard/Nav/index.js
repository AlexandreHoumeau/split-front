import React, { useContext, useState } from "react";
import { SearchIcon, BellIcon, MenuIcon, CrossIcon } from "assets/icons";
import { connect } from "react-redux";
import api from "services/api";
import { setSearch } from "actions/search.action";
import { useEffect } from "react";

function Nav({ searchData, setSearch }) {
  // const { mode, toggleMode } = useContext(WindmillContext)
  // const { toggleSidebar } = useContext(SidebarContext)
  const [keyword, setKeyword] = useState("");
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    setKeyword(searchData.keyword || "");
  }, [searchData]);
  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  const eraseSearch = async () => {
    const newData = {
      keyword: "",
      result: [],
    };

    setSearch(newData);
  };

  const search = async (e) => {
    e.preventDefault();
    if (keyword) {
      await api.axios
        .get("/v1/search", {
          params: { keyword },
        })
        .then((res) => {
          if (res) {
            const newData = {
              keyword,
              result: res.teachers,
            };
            setSearch(newData);
          }
        });
    }
  };
  return (
    <header className="z-40 py-8 bg-white shadow-lg dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-primary-500 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          // onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1">
          <form
            onSubmit={(e) => search(e)}
            className="relative flex justify-between rounded-xl h-10 w-full border max-w-lg "
          >
            <input
              className="pl-4 flex-1 rounded-xl focus:outline-none text-gray-700"
              placeholder="Rechercher un domaine"
              aria-label="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="flex justify-around items-center">
              {keyword && (
                <div
                  onClick={eraseSearch}
                  className="bg-gray-200 mr-2 cursor-pointer p-1 rounded-full"
                >
                  <CrossIcon width="10" height="10" />
                </div>
              )}
              <div
                onClick={(e) => search(e)}
                className="flex cursor-pointer items-center rounded-lg p-3 bg-primary-500"
              >
                <SearchIcon
                  color="white"
                  className="w-4 h-4"
                  aria-hidden="true"
                />
              </div>
            </div>
          </form>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Notifications menu --> */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon className="w-5 h-5" aria-hidden="true" />
              {/* <!-- Notification badge --> */}
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span>
            </button>
          </li>
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            ></button>
          </li>
        </ul>
      </div>
    </header>
  );
}
const mapStateToProps = (state) => ({
  searchData: state.search,
});
export default connect(mapStateToProps, { setSearch })(Nav);

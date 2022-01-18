import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import routes from "routes";
import Main from "./Main";
import Nav from "./Nav";
import { connect } from 'react-redux'
import { getUserData } from "store/actions";

const DashboardLayout = ({ getUserData, children, ...rest }) => {

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900`}>
      {/* // SIDEBAR */}
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen w-full">
        <Nav />
        <Main routes={routes} />
      </div>
    </div>
  );
};

export default connect(null, {getUserData})(DashboardLayout);

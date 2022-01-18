import ThemedSuspense from "components/ui/ThemedSuspense";
import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "components/ui/loader";
import ErrorPage from "pages/404";

const Main = ({ routes, isLoading, auth }) => {
  return (
    <main className="h-screen  bg-purple-50 overflow-y-auto">
      <div className="relative grid h-full">
        <Suspense fallback={<ThemedSuspense />} />
        <Loader isLoading={isLoading} />
        <Switch>
          {routes.map((route, i) => {
            return route.component ? (
              <Route
                key={i}
                exact={true}
                path={`/app${route.path}`}
                render={(props) => <route.component {...props} />}
              />
            ) : null;
          })}
          {/* <Redirect exact from="/app" to="/" /> */}
          {/* <Route from="*" to="/404" component={ErrorPage} /> */}
        </Switch>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.UI.isLoading,
  auth: state.Auth
});

export default connect(mapStateToProps)(Main);

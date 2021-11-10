import ThemedSuspense from "components/ui/ThemedSuspense";
import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "components/ui/loader";

const Main = ({ routes, search, isLoading }) => {
  return (
    <main className="h-full bg-purple-50 overflow-y-auto">
      <div className="container relative grid px-6 mx-auto">
        <Suspense fallback={<ThemedSuspense />} />
        <Loader isLoading={isLoading}/>
        {search?.result?.length ? (
          <div>Hello world from research</div>
        ) : (
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
            {/* <Route component={Page404} /> */}
          </Switch>
        )}
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  search: state.search,
  isLoading: state.UI.isLoading
});

export default connect(mapStateToProps)(Main);

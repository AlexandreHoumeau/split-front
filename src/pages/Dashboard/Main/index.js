import ThemedSuspense from "components/ui/ThemedSuspense";
import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const Main = ({ routes }) => {
  return (
    <main className="h-full bg-purple-50 overflow-y-auto">
      <div className="container grid px-6 mx-auto">
      <Suspense fallback={<ThemedSuspense />}/>
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
      </div>
    </main>
  );
};

export default Main;

import React from "react";
import Settings from "../components/Settings";
import Home from "../components/Home";
import About from "../components/About";
import { Route, Switch, Redirect } from "react-router-dom";

const Routes = ({ logout, appLoading, setAppLoading, setSession }) => (
  <Switch>
    <Route exact path={`/home`}>
      <Home />
    </Route>
    <Route exact path={`/settings`}>
      <Settings />
    </Route>
  </Switch>
);

export default Routes;

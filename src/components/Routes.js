import React from "react";
import Settings from "../components/Settings";
import Home from "../components/Home";
import AddItem from "../components/AddItem";
import About from "../components/About";
import { Route, Switch } from "react-router-dom";

const Routes = () => (
  <Switch>
    <Route exact path={`/home`}>
      <Home />
    </Route>
    <Route exact path={`/settings`}>
      <Settings />
    </Route>
    <Route exact path={`/add-item`}>
      <AddItem />
    </Route>
  </Switch>
);

export default Routes;

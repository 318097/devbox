import React from "react";
import Home from "../components/Home";
import AddEntity from "../components/AddEntity";
import About from "../components/About";
import { Route, Switch } from "react-router-dom";

const Routes = () => (
  <Switch>
    <Route exact path={`/home`}>
      <Home />
    </Route>
    <Route exact path={`/about`}>
      <About />
    </Route>
    <Route exact path={`/add-entity`}>
      <AddEntity />
    </Route>
    <Route exact>
      <Home />
    </Route>
  </Switch>
);

export default Routes;

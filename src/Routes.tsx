import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/Home" exact component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
};

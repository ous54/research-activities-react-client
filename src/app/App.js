import React from "react";
import { Router, Route as PublicRoute, Switch } from "react-router-dom";

import MainLayout from "../pages/MainLayout";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import Route from "../components/Route";

import { history } from "../helpers/history";

import "../assets/css/datatables.css";
import "../assets/css/tabler.css";

import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute path="/login" component={LoginPage} />
        <PublicRoute path="/register" component={RegisterPage} />
        <Route path="/*" component={MainLayout} />
      </Switch>
    </Router>
  );
}

export default App;

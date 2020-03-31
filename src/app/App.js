import React  from "react";
import { Router, Route, Switch } from "react-router-dom";

import { createBrowserHistory } from 'history';


import  PrivateRoute  from "../components/PrivateRoute";
import  MainLayout  from "../pages/MainLayout";
import  LoginPage  from "../pages/Auth/LoginPage";
import  RegisterPage from "../pages/Auth/RegisterPage";

import {history} from "../helpers/history"

import "../assets/css/datatables.css"
import "../assets/css/tabler.css"
import "../assets/css/tabler-flags.css"

import 'popper.js/dist/popper'
import "bootstrap/dist/js/bootstrap"


function App() {

  return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/*" component={MainLayout} />
        </Switch>
      </Router>
  );
}

export default App;

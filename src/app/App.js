import React, { useEffect, Fragment } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../helpers";
import { alertActions } from "../actions";

import  PrivateRoute  from "../components/PrivateRoute";
import  MainLayout  from "../pages/MainLayout";
import  LoginPage  from "../pages/Auth/LoginPage";
import  RegisterPage from "../pages/Auth/RegisterPage";

import "../assets/css/datatables.css"
import "../assets/css/tabler.css"
import "../assets/css/tabler-flags.css"

import 'popper.js/dist/popper'
import "bootstrap/dist/js/bootstrap"


function App() {
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, [dispatch]);

  return (
    <Fragment >
      {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )}
      <Router history={history}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/*" component={MainLayout} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;

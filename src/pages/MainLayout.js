import React from "react";
import { Router, Switch, Redirect } from "react-router-dom";

import {history} from "../helpers/history"
import PrivateRoute from "../components/PrivateRoute";

import Author from "./Author/Author";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";

import Universities from "./Managing/Universities";
import Schools from "./Managing/Schools";
import Laboratories from "./Managing/Laboratories";
//import Users from "./Managing/Users";

import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import NavBar from "../components/layout/NavBar";

function MainLayout() {

  const routes = (
    <Router history={history}>
      <Switch>
        <PrivateRoute path="/home" children={<HomePage />} />
        {/* <PrivateRoute path="/users" children={<Users />} /> */}
        <PrivateRoute path="/universities/" children={<Universities />} />
        <PrivateRoute path="/schools/" children={<Schools />} />
        <PrivateRoute path="/laboratories/" children={<Laboratories />} />
        <PrivateRoute path="/author/:authorName" children={<Author />} /> }
        <PrivateRoute path="/*" children={<NotFoundPage />} />
      </Switch>
    </Router>
  );

  return (
    <div className="page">
      <div className="flex-fill">
        <NavBar />
        <Header />
        <div className="my-3 my-md-5">
          <div className="container">{routes}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;

import React from "react";

import { withRouter, Switch, Route } from "react-router-dom";

import "./assets/css/dashboard.css";

import Author from "./pages/Author";
import Home from "./pages/Home";
import Universities from "./pages/Universities";
import Schools from "./pages/Schools";
import Laboratories from "./pages/Laboratories";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import NavBar from "./components/layout/NavBar";

const App = withRouter(({ history }) => {
  return (
    <div className="page">
      <div className="flex-fill">
        <Header />
        <NavBar />
        <div className="my-3 my-md-5">
          <div className="container">
            <Switch>
              <Route path="/home" children={<Home />} />
              <Route path="/users" children={<Users />} />
              <Route path="/universities/" children={<Universities />} />
              <Route path="/schools/" children={<Schools />} />
              <Route path="/laboratories/" children={<Laboratories />} />
              <Route path="/Login/" children={<Login />} />
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
});

export default App;

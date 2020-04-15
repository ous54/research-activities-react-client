import React from "react";
import { Router, Switch, Redirect } from "react-router-dom";

import { history } from "../helpers/history";
import Route from "../components/Route";

import Author from "./Author/Author";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";

import Universities from "./Managing/Universities";
import Schools from "./Managing/Schools";
import Laboratories from "./Managing/Laboratories";
import AccountSettings from "./Settings/AccountSettings";

import LaboratoryHeads from "./Managing/LaboratoryHeads";
//import Users from "./Managing/Users";

import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import NavBar from "../components/layout/NavBar";
import Teams from "./Managing/Teams";
import { default as LHAssociation } from "./Managing/LaboratoryHeadsAssociation";
import { default as TRAssociation } from "./Managing/TeamsResearchersAssociation";
import FollowedResearchers from "./Managing/FollowedResearchers";

function MainLayout() {
  const routes = (
    <Switch>
      <Route path="/home" component={HomePage} />
      <Route path="/universities" component={Universities} role="CED_HEAD" />
      <Route path="/schools" component={Schools} role="CED_HEAD" />
      <Route path="/laboratories" component={Laboratories} role="CED_HEAD" />
      <Route
        path="/laboratory-heads"
        component={LaboratoryHeads}
        role="CED_HEAD"
      />
      <Route
        path="/laboratory-heads-association"
        component={LHAssociation}
        role="CED_HEAD"
      />
      <Route
        path="/followed-researchers"
        component={FollowedResearchers}
        role="CED_HEAD"
      />
      <Route
        path="/teams-researchers-association"
        component={TRAssociation}
        role="LABORATORY_HEAD"
      />
      <Route path="/teams" component={Teams} role="LABORATORY_HEAD" />
      <Route path="/settings/account" component={AccountSettings} />
      <Route path="/author/:authorName" component={Author} /> }
      <Route path="/*" component={NotFoundPage} />
    </Switch>
  );

  return (
    <div className="page">
      <div className="flex-fill">
        <NavBar />
        <Header />
        <div className="my-3 my-md-5">
          <div className="container">
            <Router history={history}>{routes}</Router>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;

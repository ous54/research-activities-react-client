import React from "react";

import {
  withRouter,
  Switch,
  Route,
} from "react-router-dom";

import "./assets/css/dashboard.css";

import Author from "./pages/Author";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

const App = withRouter(({ history }) => {
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();

      const authorName = e.target.value;

      if (authorName.trim().length === 0) return;

      history.push("/author/" + authorName);
    }
  };

  return (
    <div className="page">
      <div className="flex-fill">
        <Header />
        <div className="header collapse d-lg-flex p-0" id="headerMenuCollapse">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 ml-auto">
                <form className="input-icon my-3 my-lg-0">
                  <input
                    type="search"
                    onKeyDown={handleKeyDown}
                    className="form-control header-search"
                    placeholder="Search for an author"
                  />
                  <div className="input-icon-addon">
                    <i className="fe fe-search"></i>
                  </div>
                </form>
              </div>
              <div className="col-lg order-lg-first">
                <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      onClick={e => {
                        history.push("/home");
                      }}
                    >
                      <i className="fe fe-home"></i> Home
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      onClick={e => {
                        history.push("/author/aa");
                      }}
                      className="nav-link"
                    >
                      <i className="fe fe-user"></i> Author
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="my-3 my-md-5">
          <div className="container">
            <Switch>
              <Route path="/home" children={<Home />} />
              <Route path="/author/:authorName" children={<Author />} />
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
});

export default App;

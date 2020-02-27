import React from "react";
import { withRouter } from "react-router-dom";

const NavBar = withRouter(({ history, location }) => {
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      const authorName = e.target.value;
      if (authorName.trim().length === 0) return;
      history.push("/author/" + authorName);
    }
  };

  return (
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
              <li className=" nav-item ">
                <a
                  href 
                  className={
                    "nav-link " +
                    (location.pathname === "/home" ? " active " : "")
                  }
                  onClick={e => history.push("/home")}
                >
                  <i className="fe fe-home"></i> Home
                </a>
              </li>

              <li className="nav-item">
                <a
                  href 
                  onClick={e => history.push("/users")}
                  className={
                    "nav-link " +
                    (location.pathname === "/users" ? " active " : "")
                  }
                >
                  <i className="fe fe-users"></i> Users
                </a>
              </li>

              <li className="nav-item">
                <a
                  href 
                  onClick={e => history.push("/universities")}
                  className={
                    "nav-link " +
                    (location.pathname === "/universities" ? " active " : "")
                  }
                >
                  <i className="fe fe-university"></i> Universities
                </a>
              </li>

              <li className="nav-item">
                <a
                  href 
                  onClick={e => history.push("/schools")}
                  className={
                    "nav-link " +
                    (location.pathname === "/schools" ? " active " : "")
                  }
                >
                  <i className="fe fe-school"></i> Schools
                </a>
              </li>

              <li className="nav-item">
                <a
                  href 
                  onClick={e => history.push("/laboratories")}
                  className={
                    "nav-link " +
                    (location.pathname === "/laboratories" ? " active " : "")
                  }
                >
                  <i className="fa fa-university"></i> Laboratories
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default NavBar;

import React, { useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";

import image from "../../assets/images/tabler.svg";
import { LoopIcon } from "../icons/icons";

const NavBar = withRouter(({ history, location }) => {
  let { user, setUser } = useContext(AuthContext);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const authorName = e.target.value;
      if (authorName.trim().length === 0) return;
      history.push("/author/" + authorName);
    }
  };

  return (
    <nav
      className="navbar navbar-light navbar-secondary navbar-expand"
      id="navbar-secondary"
    >
      <div className="container">
        <Link
          to="/home"
          className="navbar-brand navbar-brand-autodark d-none-navbar-vertical"
        >
          <img
            src={image}
            alt="Tabler"
            className="navbar-brand-logo navbar-brand-logo-large"
          />
          <img
            src="./static/logo-small.svg"
            alt="Tabler"
            className="navbar-brand-logo navbar-brand-logo-small"
          />
        </Link>
        <form className="form-inline w-50 mr-4 d-none d-md-flex">
          <div className="input-icon w-100">
            <span className="input-icon-addon">
              <LoopIcon />
            </span>
            <input
              onKeyDown={handleKeyDown}
              type="text"
              className="form-control form-control-flush w-100"
              placeholder="Rechercher ici un auteur ..."
            />
          </div>
        </form>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown pl-2">
            <Link
              to="/"
              className="nav-link d-flex lh-1 text-inherit p-0 text-left"
              data-toggle="dropdown"
            >
              <span className="avatar bg-blue-lt">
                <span className="badge  bg-success"></span>
                {user.firstName ? user.firstName[0] : ""}
                {user.lastName ? user.lastName[0] : ""}
              </span>
              <div className="d-none d-lg-block pl-2">
                <div>
                  {user.firstName ? user.firstName : ""}{" "}
                  {user.lastName ? user.lastName : ""}
                </div>
                <div className="mt-1 small text-muted">{user.email}</div>
              </div>
            </Link>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
              <Link className="dropdown-item" to="/settings/account" href="#">
                Paramètres du compte
              </Link>
              <Link className="dropdown-item" to="/login" href="#">
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
});

export default NavBar;

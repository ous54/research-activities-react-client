import React, { useContext, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";

import image from "../../../assets/images/tabler.svg";
import { LoopIcon, NotificationIcon } from "./../_components/icons";
import { AppContext } from "../../../context/AppContext";
import UserPicture from "../_components/UserPicture";

const NavBar = withRouter(({ history, location }) => {
  const { user, UserHelper } = useContext(AppContext);

  return (
    <nav
      className="navbar navbar-light navbar-secondary navbar-expand"
      id="navbar-secondary"
    >
      <div className="container">
        <Logo />
        <AuthorSearchBar history={history} />
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <Notifications Notifications={[]} />
          </li>
          <li className="nav-item dropdown pl-2">
            <UserMenu {...{ user, UserHelper }} />
          </li>
        </ul>
      </div>
    </nav>
  );
});

export default NavBar;

const Logo = () => (
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
);

const AuthorSearchBar = ({ history }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const authorName = e.target.value;
      if (authorName.trim().length === 0) return;
      history.push("/author/" + authorName);
    }
  };

  return (
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
  );
};

const Notification = (props) => (
  <div
    className="toast show"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-autohide="false"
    data-toggle="toast"
  >
    <div className="toast-header">
      <span className="avatar avatar-sm mr-2"></span>
      <strong className="mr-auto">Mallory Hulme</strong>
      <small>11 mins ago</small>
      <button
        type="button"
        className="ml-2 close"
        data-dismiss="toast"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="toast-body">Hello, world! This is a toast message.</div>
  </div>
);
const Notifications = ({ notifications }) => (
  <Fragment>
    <a href="#" className="nav-link" data-toggle="dropdown">
      <NotificationIcon />
    </a>
    <div
      style={{ width: "300px" }}
      className="dropdown-menu dropdown-menu-right dropdown-menu-arrow dropdown-menu-card"
    >
      <div className="card p-1">
        <Notification />
      </div>
    </div>
  </Fragment>
);

const UserMenu = ({ user, UserHelper }) => (
  <Fragment>
    <Link
      to="/"
      className="nav-link d-flex lh-1 text-inherit p-0 text-left"
      data-toggle="dropdown"
    >
      <UserPicture user={user} badge={true} />
      <div className="d-none d-lg-block pl-2">
        <div>
          {user.firstName ? user.firstName : ""}{" "}
          {user.lastName ? user.lastName : ""}
        </div>
        <div className="mt-1 small text-muted">
          {UserHelper.userShortBio(user)}
        </div>
      </div>
    </Link>
    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
      <Link className="dropdown-item" to="/account" href="#">
        Paramètres du compte
      </Link>
      <Link className="dropdown-item" to="/login" href="#">
        Se déconnecter
      </Link>
    </div>
  </Fragment>
);

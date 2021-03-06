import React, { useContext } from "react";
import { withRouter } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import Notifications from "./Notifications";
import AuthorSearchBar from "./AuthorSearchBar";
import UserMenu from "./UserMenu";
import Logo from "./Logo";

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
            {["LABORATORY_HEAD", "TEAM_HEAD"].includes(user.role) && (
              <Notifications />
            )}
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

import React, { useContext, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import { CED_HEAD_MENUS, LABORATORY_HEAD_MENUS, SEARCHER_MENUS } from "./Menus";

const header = withRouter(({ history, location, ...props }) => {
  const { user } = useContext(AuthContext);

  const menus =
    user.role === "CED_HEAD"
      ? CED_HEAD_MENUS
      : user.role === "LABORATORY_HEAD"
      ? LABORATORY_HEAD_MENUS
      : SEARCHER_MENUS;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light navbar-primary"
      id="navbar-primary"
    >
      <div className="container">
        <a
          href
          className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal"
        >
          <img
            src="./static/logo.svg"
            alt="Tabler"
            className="navbar-brand-logo navbar-brand-logo-large"
          />
          <img
            src="./static/logo-small.svg"
            alt="Tabler"
            className="navbar-brand-logo navbar-brand-logo-small"
          />
        </a>
        <div className="navbar-collapse collapse">
          <h6 className="navbar-heading">Navigation</h6>
          <ul className="navbar-nav">
            {menus.map((menu, index) => (
              <li className="nav-item" key={index}>
                {menu.isDropdown && (
                  <Fragment>
                    <a
                      className="nav-link dropdown-toggle"
                      href="#navbar-extra"
                      data-toggle="dropdown"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-icon">
                        <menu.icon />
                      </span>
                      <span className="nav-link-title">{menu.title}</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-arrow">
                      {menu.subMenus.map((subMenu) => (
                        <li key={index}>
                          <Link to={subMenu.link} className="dropdown-item">
                            {subMenu.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Fragment>
                )}

                {!menu.isDropdown && (
                  <Link to={menu.link} className="nav-link">
                    <span className="nav-link-icon">
                      <menu.icon />
                    </span>
                    <span className="nav-link-title">{menu.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default header;

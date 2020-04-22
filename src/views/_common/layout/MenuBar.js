import React, { useContext, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";

import { CED_HEAD_MENUS, LABORATORY_HEAD_MENUS, SEARCHER_MENUS } from "./Menus";
import { AppContext } from "../../../AppContext";

const MenuBar = withRouter(({ history, location, ...props }) => {
  const { user } = useContext(AppContext);

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
        <div className="navbar-collapse collapse">
          <ul className="navbar-nav">
            {menus.map((menu, index) => (
              <li className="nav-item" key={index}>
                {menu.isDropdown && (
                  <Dropdown menu={menu} location={location} />
                )}
                {!menu.isDropdown && (
                  <NotDropdown menu={menu} location={location} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default MenuBar;

const NotDropdown = ({ menu, location }) => (
  <Link
    to={menu.link}
    className={`nav-link ${location.pathname === menu.link ? "active" : ""} `}
  >
    <span className="nav-link-icon">
      <menu.icon />
    </span>
    <span className="nav-link-title">{menu.title}</span>
  </Link>
);

const Dropdown = ({ menu, location }) => (
  <Fragment>
    <a
      className={`nav-link dropdown-toggle ${
        menu.subMenus
          .map((subMenu) => subMenu.link)
          .indexOf(location.pathname) !== -1
          ? "active"
          : ""
      }  `}
      href={"#navbar-extra"}
      data-toggle="dropdown"
      role="button"
      aria-expanded="false"
    >
      <span className="nav-link-icon">
        <menu.icon />
      </span>
      <span className="nav-link-title">{menu.title}</span>
    </a>
    <ul className="dropdown-menu dropdown-menu-arrow ">
      {menu.subMenus.map((subMenu, index) => (
        <li key={index}>
          <Link to={subMenu.link} className="dropdown-item">
            {subMenu.title}
          </Link>
        </li>
      ))}
    </ul>
  </Fragment>
);

import React, { useContext, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";

import { getMenuForRole } from "./Menus";
import { AppContext } from "../../../context/AppContext";

const MenuBar = withRouter(({ history, location, ...props }) => {
  const { user } = useContext(AppContext);

  const menus = getMenuForRole(user.role);

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
                {!menu.isDropdown &&
                  menu.subMenus.map((subMenu) => (
                    <NotDropdown menu={subMenu} location={location} />
                  ))}
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
    to={menu.path}
    className={`nav-link ${location.pathname === menu.path ? "active" : ""} `}
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
          .map((subMenu) => subMenu.path)
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
          <Link to={subMenu.path} className="dropdown-item">
            {subMenu.title}
          </Link>
        </li>
      ))}
    </ul>
  </Fragment>
);

import React from "react";
import { withRouter, Link } from "react-router-dom";
import image from "../../assets/images/tabler.svg";
import  userService  from "../../services/user.service";

const NavBar = withRouter(({ history, location }) => {
  
  let user = userService.getLogedInUser();

  const handleKeyDown = e => {
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              onKeyDown={handleKeyDown}
              type="text"
              className="form-control form-control-flush w-100"
              placeholder="Search here for an author..."
            />
          </div>
        </form>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a href="#" className="nav-link" data-toggle="dropdown">
              <span className="flag flag-country-us mr-1"></span>
              <span className="d-none d-lg-inline">English</span>
            </a>
            <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
              <a href="#" className="dropdown-item">
                <span className="flag flag-country-fr mr-1"></span> Frnçais
              </a>
            </div>
          </li>

          <li className="nav-item dropdown pl-2">
            <Link
              to="/"
              className="nav-link d-flex lh-1 text-inherit p-0 text-left"
              data-toggle="dropdown"
            >
              <span
                className="avatar"
                style={{
                  backgroundImage: "props.url_picture"
                }}
              ></span>
              <div className="d-none d-lg-block pl-2">
                <div>Akram aznakour</div>
                <div className="mt-1 small text-muted">{user.email}</div>
              </div>
            </Link>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
              <Link className="dropdown-item" to="/login" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon dropdown-item-icon"
                ></svg>
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

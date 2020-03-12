import React from "react";
import { withRouter, Link } from "react-router-dom";

const header = withRouter(({ history, location, ...props }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light navbar-primary"
      id="navbar-primary"
    >
      <div className="container">
        <a
          href="."
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
            <li className="nav-item active">
              <Link to="/home" className="nav-link" href="./index.html">
                <span className="nav-link-icon">
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
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </span>
                <span className="nav-link-title">Home</span>
              </Link>
            </li>

            <li className="nav-item">
              <a
                className="nav-link dropdown-toggle"
                href="#navbar-extra"
                data-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                <span className="nav-link-icon">
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
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </span>
                <span className="nav-link-title">Manging</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-arrow">
                {["Laboratories", "Schools", "Universities", "Users"].map(
                  (page, index) => (
                    <li>
                      <Link
                        key={index}
                        to={"/" + page}
                        className="dropdown-item"
                        href="./invoice.html"
                      >
                        {page}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </li>
          </ul>
          <h6 className="navbar-heading mt-4">Tools</h6>
        </div>
      </div>
    </nav>
  );
});

export default header;

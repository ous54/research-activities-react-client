import React from "react";
import image from "../../assets/demo/brand/tabler.svg"
const header = props => {
  return (
    <div className="header py-4">
      <div className="container">
        <div className="d-flex">
          <a className="header-brand" href="./index.html">
            <img
              src={image}
              className="header-brand-img"
              alt="tabler logo"
            />
          </a>
          <div className="d-flex order-lg-2 ml-auto">
            <div className="nav-item d-none d-md-flex">
              <a
                href="https://github.com/tabler/tabler"
                className="btn btn-sm btn-outline-primary"
                target="_blank"
              >
                Sign in
              </a>
            </div>
          </div>
          <a
            href="#"
            className="header-toggler d-lg-none ml-3 ml-lg-0"
            data-toggle="collapse"
            data-target="#headerMenuCollapse"
          >
            <span className="header-toggler-icon"></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default header;

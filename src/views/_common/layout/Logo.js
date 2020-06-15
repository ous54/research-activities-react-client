import React from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/images/tabler.svg";

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


export default Logo;


import React, { useEffect } from "react";

import image from "../assets/images/illustrations/undraw_bug_fixing_oc7a.svg";
import { Link } from "react-router-dom";

function HomePage() {

  return (
    <div className="empty">
    <div className="empty-icon">
      <img
        src={image}
        className="h-8 mb-4"
        alt=""
      />
    </div>
  <p className="empty-title h3">Welcome to the home page </p>
    <p className="empty-subtitle text-muted">
      Try and search to find the author you're looking for.
    </p>
    <div className="empty-action">
      <Link to="/home" className="btn btn-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        Search for an author
      </Link>
    </div>
  </div>
  );
}

export default HomePage;

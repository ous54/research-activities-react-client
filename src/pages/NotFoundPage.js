import React  from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <div className="flex-fill d-flex align-items-center justify-content-center">
        <div className="container-tight py-6">
          <div className="empty">
            <div className="empty-icon">
              <div className="display-4">404</div>
            </div>
            <p className="empty-title h3">Oops… You just found an error page</p>
            <p className="empty-subtitle text-muted">
              We are sorry but the page you are looking for was not found
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Take me home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;

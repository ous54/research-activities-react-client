import React from "react";
import { Link } from "react-router-dom";
import { LeftArrowIcon } from "./_common/_components/icons";

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
                <LeftArrowIcon />
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

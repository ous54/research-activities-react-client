import React from "react";
import { Link } from "react-router-dom";

const AuthorCard = ({ author }) => {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body p-3">
          <div className="row row-sm align-items-center">
            <div className="col-auto">
              {author.profilePicture && (
                <span
                  className="avatar  avatar-md "
                  style={{
                    backgroundImage: "url(" + author.profilePicture + ")",
                  }}
                ></span>
              )}
            </div>
            <div className="col" style={{ minWidth: "auto" }}>
              <Link
                className="text-body d-block pb-2"
                to={"/author/" + author.scholarId}
              >
                {author.name ? author.name : ""}
              </Link>
              <small className="d-block text-muted text-truncate mt-n1">
                {author.interests.slice(0, 2).map((interest, index) => (
                  <span key={index} className="badge bg-blue-lt  mr-2">
                    {interest.length > 30 / (1 + index)
                      ? interest.substr(1, 30 / (1 + index)).concat("...")
                      : interest}
                  </span>
                ))}
                {author.interests.length > 2 && <span>...</span>}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;

import React from "react";
import { Link } from "react-router-dom";

const AuthorCard = ({ author }) => {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body">
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
              <h3 className="mb-0">
                <Link to={"/author/" + author.scholarId}>
                  {author.name ? author.name : ""}{" "}
                </Link>
              </h3>
            </div>
          </div>
          <div className="row align-items-center  mt-2">
            <div className="col">
              <div className="inline-block h-3 small mb-0">
                {author.interests.slice(0, 2).map((interest, index) => (
                  <span key={index} className="badge bg-blue-lt  mr-2">
                    {interest.length > 30 / (1 + index)
                      ? interest.substr(1, 30 / (1 + index)).concat("...")
                      : interest}
                  </span>
                ))}
                {author.interests.length > 2 && <span>...</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;

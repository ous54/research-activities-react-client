import React from "react";
import { Link } from "react-router-dom";

const AuthorHeader = (props) => {
  const handleFollow = () => {
    props.suivre();
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-auto">
            <span
              className="avatar avatar-lg"
              style={{
                backgroundImage:
                  "url(" +
                  "https://scholar.google.com/citations?view_op=medium_photo&user=" +
                  props.author.id +
                  ")",
              }}
            ></span>
          </div>
          <div className="col">
            <div className="mb-2">
              <h4 className="m-0">
                {props.author.name}

                {props.user.role === "CED_HEAD" && (
                  <button
                    type="button"
                    onClick={handleFollow}
                    className={
                      "btn  btn-sm m-3 btn-outline-" +
                      (props.isFollowed ? "success" : "primary")
                    }
                  >
                    {props.isFollowed ? "Suivé" : "Suivre"}
                    {props.isSendingFollow && (
                      <div
                        style={{ height: "10px", width: "10px" }}
                        className="loader ml-2 "
                      ></div>
                    )}
                  </button>
                )}
              </h4>

              <p className="text-muted mb-0">{props.author.affiliation}</p>
              <p className="text-muted mb-0">
                Adresse e-mail validée de {props.author.email}
              </p>
              <div className=" list-inline mb-0 mt-2">
                {props.author.interests.map((interest) => (
                  <Link
                    to={interest}
                    key={interest}
                    className="btn btn-primary btn-sm mb-2 mr-2 mb-1"
                  >
                    {interest}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorHeader;

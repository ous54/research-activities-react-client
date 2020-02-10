import React from "react";

const AuthorHeader = props => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="media">
          <span
            className="avatar avatar-xxl mr-5 "
            style={{
              backgroundImage: props.url_picture
            }}
            style={{
              "background-image": "url(" + props.url_picture + ")"
            }}
          ></span>
          <div className="media-body">
            <h4 className="m-0">
              {props.name}
              <button
                type="button"
                className="btn btn-outline-primary btn-sm m-2"
              >
                <i className="fe fe-plus mr-2"></i>Suivre
              </button>
            </h4>

            <p className="text-muted mb-0">{props.affiliation}</p>
            <p className="text-muted mb-0">
              Adresse e-mail validée de {props.email}
            </p>
            <div className=" list-inline mb-0 mt-2">
              {props.interests.map(interest => (
                <a
                  href="#"
                  key={interest}
                  className="btn btn-primary btn-sm mb-2 mr-2 mb-1"
                >
                  {interest}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorHeader;

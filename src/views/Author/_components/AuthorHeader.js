import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { CrossIcon, ConfirmationIcon } from "../../_common/_components/icons";
const AuthorHeader = ({
  toggleFollow,
  isFollowed,
  isSendingFollow,
  author,
  user,
  users,
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-auto">
            <AuthorPicture author={author} />
          </div>
          <div className="col">
            <div className="mb-2">
              <h4 className="m-0">
                {author.name}

                {user.role === "CED_HEAD" && (
                  <FollowingButton
                    isFollowed={isFollowed}
                    isSendingFollow={isSendingFollow}
                  />
                )}
              </h4>

              <AuthorDetails author={author} />
              {users.length > 0 && (
                <ConfirmationModel
                  users={users}
                  toggleFollow={toggleFollow}
                  isFollowed={isFollowed}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorHeader;

const FollowingButton = ({ isFollowed, isSendingFollow }) => (
  <a
    href="#"
    className="btn btn-secondary"
    data-toggle="modal"
    data-target="#modal-info"
    type="button"
    className={
      "btn  btn-sm m-3 btn-outline-" + (isFollowed ? "success" : "primary")
    }
  >
    {isFollowed ? "Ne plus suivre" : "Suivre"}
    {isSendingFollow && (
      <div
        style={{ height: "10px", width: "10px" }}
        className="loader ml-2 "
      ></div>
    )}
  </a>
);

const AuthorDetails = ({ author }) => (
  <Fragment>
    <p className="text-muted mb-0">{author.affiliation}</p>
    <p className="text-muted mb-0">Adresse e-mail validée de {author.email}</p>
    <div className=" list-inline mb-0 mt-2">
      {author.interests.map((interest) => (
        <Link
          to={interest}
          key={interest}
          className="btn btn-primary btn-sm mb-2 mr-2 mb-1"
        >
          {interest}
        </Link>
      ))}
    </div>
  </Fragment>
);

const ConfirmationModel = ({ isFollowed, toggleFollow, users }) => {
  const [userId, setUserId] = useState(users[0]._id);
  return (
    <div
      className="modal modal-blur fade show"
      id="modal-info"
      tabindex="-1"
      role="dialog"
      style={{ display: " none", "padding-right": "17px" }}
      aria-modal="true"
    >
      <div
        className="modal-dialog modal-sm modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <CrossIcon />
          </button>
          <div className="modal-body text-center py-5">
            <ConfirmationIcon />
            <h3>ConfirmationModel</h3>
            <div className="text-muted">
              {!isFollowed &&
                " This author will be associated to the it's user account in this platform please select the user account"}
            </div>
          </div>

          {!isFollowed && (
            <div className="modal-body text-center py-5">
              <div class="subheader mb-2">L'utilisateur</div>
              <div>
                <select
                  name=""
                  class="form-select"
                  onChange={(e) => {
                    setUserId(e.target.value);
                  }}
                >
                  {users.map(({ firstName, lastName, _id }) => (
                    <option value={_id}>{`${firstName} ${lastName}`}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="modal-footer">
            <Link
              href="#"
              onClick={() => toggleFollow(userId)}
              className="btn btn-primary btn-block"
              data-dismiss="modal"
            >
              {!isFollowed && "Confirmer l'abonnement"}
              {isFollowed && "Confirmer le désabonnement"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthorPicture = ({ author }) => (
  <span
    className="avatar avatar-lg"
    style={{
      backgroundImage:
        "url(" +
        "https://scholar.google.com/citations?view_op=medium_photo&user=" +
        author.id +
        ")",
    }}
  ></span>
);

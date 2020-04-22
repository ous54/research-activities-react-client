import React, { Fragment } from "react";
import UserPicture from "../../_common/_components/UserPicture";

const UserBox = ({ user }) => (
  <Fragment>
    <div className="row row-sm align-items-center">
      <UserPicture user={user} size="md" />

      <div className="col">
        <h3 className="mb-0">
          <a href="#">
            {user.firstName ? user.firstName : ""}{" "}
            {user.lastName ? user.lastName : ""}
          </a>
        </h3>
        <div className="text-muted text-h5">{user.email ? user.email : ""}</div>
      </div>
    </div>
  </Fragment>
);

export default UserBox;

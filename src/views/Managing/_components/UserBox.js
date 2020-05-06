import React, { Fragment } from "react";
import UserPicture from "../../_common/_components/UserPicture";
import { Link } from "react-router-dom";

const UserBox = ({ user }) => (
  <Fragment>
    <div className="row row-sm align-items-center">
      <UserPicture user={user} size="md" />

      <div className="col">
        <h4 className="mb-0">
          <Link  to={`/author/${user.firstName} ${user.lastName} `} href="#">
            {user.firstName ? user.firstName : ""}{" "}
            {user.lastName ? user.lastName : ""}
          </Link>
        </h4>
        <div className="text-muted text-h6">{user.email ? user.email : ""}</div>
      </div>
    </div>
  </Fragment>
);

export default UserBox;

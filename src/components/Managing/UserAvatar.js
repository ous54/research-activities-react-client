import React, { Fragment, useState } from "react";

function UserAvatar(props) {
  const { user } = props;
  return (
    <Fragment>
      <div class="row row-sm align-items-center">
        <div class="col-auto">
          <span class="avatar  bg-blue-lt avatar-md">
            {user.firstName ? user.firstName[0] : ""}
            {user.lastName ? user.lastName[0] : ""}
          </span>
        </div>
        <div class="col">
          <h3 class="mb-0">
            <a href="#">
              {user.firstName ? user.firstName : ""}{" "}
              {user.lastName ? user.lastName : ""}
            </a>
          </h3>
          <div class="text-muted text-h5">{user.email ? user.email : ""}</div>
        </div>
      </div>
    </Fragment>
  );
}

export default UserAvatar;

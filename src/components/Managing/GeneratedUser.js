import React, { Fragment, useState } from "react";
import UserAvatar from "./UserAvatar";

function GeneratedUser(props) {
  const { user } = props;

  const [passwordIsClear, setPasswordIsClear] = useState(false);

  const togglePasswordClair = (event) => {
    event.preventDefault();
    setPasswordIsClear(!passwordIsClear);
  };

  return (
    <div class=" col-xl-6">
      <a class="card card-link">
        <div class="card-body">
          {user.has_confirmed && <UserAvatar user={user} />}
          {!user.has_confirmed && (
            <div class="mb-1 mt--1 pt-3">
              <div class="text-muted text-center pb-3">
                {user.email ? user.email : ""}
              </div>
              <div class="input-group input-group-flat ">
                <input
                  type={passwordIsClear ? "text" : "password"}
                  class="form-control"
                  value={user.generatedPassword}
                />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <a
                      onClick={togglePasswordClair}
                      href=""
                      class="input-group-link"
                    >
                      {passwordIsClear ? "Hide password" : "Show password"}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </a>
    </div>
  );
}

export default GeneratedUser;

import React, { useState } from "react";
import UserBox from "./UserBox";

const GeneratedUser = ({ user }) => (
  <div className=" col-xl-6">
    <a className="card card-link">
      <div className="card-body">
        {user.has_confirmed && <UserBox user={user} />}
        {!user.has_confirmed && <UnconfirmedUserBox2 user={user} />}
      </div>
    </a>
  </div>
);

const UnconfirmedUserBox2 = ({ user }) => {
  const [passwordIsClear, setPasswordIsClear] = useState(false);

  const togglePasswordClair = (event) => {
    event.preventDefault();
    setPasswordIsClear(!passwordIsClear);
  };

  return (
    <div className="mb-1 mt--1 pt-3">
      <div className="text-muted text-center pb-3">
        {user.email ? user.email : ""}
      </div>
      <div className="input-group input-group-flat ">
        <input
          type={passwordIsClear ? "text" : "password"}
          className="form-control"
          value={user.generatedPassword}
        />
        <div className="input-group-append">
          <span className="input-group-text">
            <a
              onClick={togglePasswordClair}
              href=""
              className="input-group-link"
            >
              {passwordIsClear ? "Hide password" : "Show password"}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default GeneratedUser;

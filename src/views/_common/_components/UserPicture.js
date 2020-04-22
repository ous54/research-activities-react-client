import React from "react";

const UserPicture = (props) => {
  const { user, size } = props;

  if (!size)
    return (
      <span className="avatar bg-blue-lt">
        <span className="badge  bg-success"></span>
        {user.firstName ? user.firstName[0] : ""}
        {user.lastName ? user.lastName[0] : ""}
      </span>
    );

  return (
    <div className="col-auto">
      <span className={`avatar  bg-blue-lt avatar-${size}`}>
        {user.firstName ? user.firstName[0] : ""}
        {user.lastName ? user.lastName[0] : ""}
      </span>
    </div>
  );
};

export default UserPicture;

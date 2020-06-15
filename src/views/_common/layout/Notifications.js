import React, { Fragment, useEffect, useState, useContext } from "react";
import { NotificationIcon } from "../_components/icons";
import { AppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { user, ApiServices } = useContext(AppContext);
  const { userService, scraperService } = ApiServices;
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    userService.getFollowedUsers().then((response) => {
      setFollowedUsers(response.data);
    });
  }, []);

  useEffect(() => {
    if (!followedUsers || followedUsers.length === 0) return;
    followedUsers.forEach((followedUser, index) => {
      setTimeout(() => {
        scraperService.getAuthorData(followedUser.scholarId).then((result) => {
          const currentAuthor = result.data;
          if (
            currentAuthor.publications.length > followedUser.publications.length
          )
            setNotifications((notifications) => [
              ...notifications,
              {
                ...followedUser,
              },
            ]);

          if (followedUsers.length === index + 1) setLoading(false);
        });
      }, 1000 * index);
    });
  }, [followedUsers]);

  const clear = (index) => () => {
    console.log("the index was : ", index);

    let tmp = notifications;
    tmp.splice(index, 1);
    setNotifications(() => tmp);
  };

  return (
    <Fragment>
      <a
        href="#"
        className="nav-link"
        data-toggle={notifications.length > 0 ? "dropdown" : ""}
      >
        {!loading && <NotificationIcon />}
        {loading && (
          <span style={{ height: "10px", width: "10px" }} className="loader" />
        )}
        {!loading && (
          <span href="#" class="badge bg-red">
            {notifications.length}
          </span>
        )}
      </a>

      <div
        style={{ width: "300px" }}
        className="dropdown-menu dropdown-menu-right dropdown-menu-arrow dropdown-menu-card"
      >
        <div className="card p-1">
          {notifications.map((notification, index) => (
            <Notification notification={notification} clear={clear(index)} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};
export default Notifications;

const Notification = ({ notification, clear }) => (
  <div
    className="toast show"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-autohide="false"
    data-toggle="toast"
  >
    <Link
      to={"/author/" + notification.scholarId}
      onClick={() => {
        clear();
        console.log("is clicked");
      }}
    >
      <div className="toast-header">
        <span
          className="avatar avatar-sm mr-2"
          style={{
            backgroundImage: `url(${notification.profilePicture})`,
          }}
        ></span>
        <strong className="mr-auto">{notification.name}</strong>
      </div>
      <div className="toast-body">
        {`${notification.name} a publié une nouvelle publication`}.
      </div>
    </Link>
  </div>
);

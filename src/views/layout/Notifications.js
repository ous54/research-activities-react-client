/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { NotificationIcon } from "../components/icons";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Notifications = () => {
  const { user, ApiServices, alertService } = useContext(AppContext);
  const { pushAlert } = alertService;
  const { notificationsService, scraperService, userService } = ApiServices;
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [followedUsers, setFollowedResearchers] = useState([]);

  const findUserNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await notificationsService.findUserNotifications(
        user._id
      );
      if (response.data) setNotifications(response.data);
      else throw Error();
    } catch (error) {
      pushAlert({
        message: "Incapable d'obtenir les notifications",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user._id]);

  const getFollowedResearchers = useCallback(async () => {
    try {
      const filter =
        user.role === "LABORATORY_HEAD"
          ? { laboratory_abbreviation: user.laboratoriesHeaded[0].abbreviation }
          : user.role === "TEAM_HEAD"
          ? { team_abbreviation: user.teamsHeaded[0].abbreviation }
          : {};
      const response = await userService.getFollowedUsers(filter);
      if (response.status === 200 && response.data)
        setFollowedResearchers(response.data);
      else throw Error();
    } catch (error) {
      setIsLoading(false);
      pushAlert({
        message:
          "Incapable  to get the followed researchers for notifications services",
      });
    }
  }, []);

  const checkFollowedResearcher = useCallback(
    async (user, index) => {
      try {
        const response = await scraperService.getAuthorData(user.scholarId);
        const currentPublications = response.data.publications;
        if (currentPublications.length > user.publications.length)
          setNotifications((notifications) => [...notifications, { ...user }]);
        if (followedUsers.length === index + 1) setIsLoading(false);
      } catch (error) {
        pushAlert({
          message:
            "Incapable  to check if a followed researcher have new publication",
        });
      }
    },
    [followedUsers.length]
  );

  const checkAllFollowedResearcher = useCallback(() => {
    followedUsers.forEach((followedUser, index) => {
      setTimeout(async () => {
        checkFollowedResearcher(followedUser, index);
      }, 1000 * index);
    });
  }, [checkFollowedResearcher, followedUsers]);

  useEffect(() => {
    getFollowedResearchers();
  }, []);

  useEffect(() => {
    if (!followedUsers || followedUsers.length === 0) return;
    checkAllFollowedResearcher();
  }, [followedUsers]);

  const clear = (index) => () => {
    let tmp = notifications;
    tmp.splice(index, 1);
    setNotifications(() => tmp);
  };

  return (
    <Fragment>
      <a
        href="/#"
        className="nav-link"
        data-toggle={notifications.length > 0 ? "dropdown" : ""}
      >
        {!isLoading && <NotificationIcon />}
        {isLoading && <Loader size={25} />}
        {!isLoading && (
          <span href="/#" className="badge bg-red">
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

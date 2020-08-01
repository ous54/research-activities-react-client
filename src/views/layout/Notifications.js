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
  const { user, ApiServices } = useContext(AppContext);
  const { userService, scraperService } = ApiServices;
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [followedUsers, setFollowedResearchers] = useState([]);

  const getFollowedResearchers = useCallback(async () => {
    const filter =
      user.role === "LABORATORY_HEAD"
        ? { laboratory_abbreviation: user.laboratoriesHeaded[0].abbreviation }
        : user.role === "TEAM_HEAD"
        ? { team_abbreviation: user.teamsHeaded[0].abbreviation }
        : {};

    let response = await userService.getFollowedUsers(filter);
    setFollowedResearchers(response.data);
    if (response.data.length === 0) setLoading(false);
  }, [user, userService]);

  const checkFollowedResearcher = useCallback(
    async (user, index) => {
      try {
        let result = await scraperService.getAuthorData(user.scholarId);
        const currentPublications = result.data.publications;
        if (currentPublications.length > user.publications.length)
          setNotifications((notifications) => [...notifications, { ...user }]);
        if (followedUsers.length === index + 1) setLoading(false);
      } catch (error) {
        console.error(error);
      }
    },
    [followedUsers.length, scraperService]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!followedUsers || followedUsers.length === 0) return;
    checkAllFollowedResearcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {!loading && <NotificationIcon />}
        {loading && <Loader size={25} />}
        {!loading && (
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

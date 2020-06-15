import React, { useEffect, useContext, useState } from "react";

import { useParams, Link } from "react-router-dom";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

import AuthorHeader from "./_components/AuthorHeader";
import Coauthors from "./_components/Coauthors";
import AuthorCitations from "./_components/AuthorCitations";
import Publications from "./_components/Publications";

import image from "../../assets/images/illustrations/undraw_quitting_time_dm8t.svg";

import { AppContext } from "../../context/AppContext";
import {
  LoopIcon,
  CrossIcon,
  ConfigurationIcon,
} from "../_common/_components/icons";
import SettingsAlert from "../Settings/_components/SettingsAlert";
import AuthorReport from "./AuthorReport";

const Author = () => {
  let { scholarId } = useParams();

  const [author, setAuthor] = useState(null);
  const [followedUser, setFollowedUser] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isSendingFollow, setsSendingFollow] = useState(false);
  const [
    isAuthorUpdatesModelVisible,
    setIsAuthorUpdatesModelVisible,
  ] = useState(false);

  const [users, setUsers] = useState([]);
  const { user, ApiServices } = useContext(AppContext);
  const { scraperService, userService } = ApiServices;
  useEffect(() => {
    setAuthor();
    if (isError) setIsError(false);
    if (noResult) setNoResult(false);

    scraperService
      .getAuthorData(scholarId)
      .then((result) => {
        if (result.status === 200) {
          if (isError) setIsError(false);
          setAuthor(result.data);
        } else if (result.status === 404) {
          setNoResult(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setNoResult(true);
      });
  }, [scholarId]);

  useEffect(() => {
    if (author == null) return;

    userService
      .isFollowing(scholarId)
      .then((response) => {
        if (response.data.isFollowing) setIsFollowed(true);
        if (
          response.data.oldNumberOfPublications < author.publications.length
        ) {
          setIsUpdating(true);
          userService
            .updateFollowUser(author)
            .then((response) => {
              console.log("done");
              setIsUpdating(false);
            })
            .catch(() => {});
        }
      })
      .catch((error) => {});
  }, [author]);

  useEffect(() => {
    userService
      .findAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {});
  }, []);

  const toggleFollow = (user_id) => {
    setsSendingFollow(true);
    const service = isFollowed
      ? userService.unfollowUser(scholarId)
      : userService.followUser({ ...author, user_id });

    service
      .then((response) => {
        setIsFollowed(!isFollowed);
      })
      .catch((error) => {});

    setsSendingFollow(false);
  };

  if (noResult) return <NoResult searchTerm={scholarId} />;

  if (author == null) return <LoadingResult />;

  if (author)
    return (
      <div className="row">
        {isAuthorUpdatesModelVisible && (
          <SettingsAlert message="AUTHOR_HAS_UPDATES" badge="info" />
        )}
        <div className="col-lg-8">
          <AuthorHeader
            isUpdating={isUpdating}
            users={users}
            user={user}
            author={author}
            toggleFollow={toggleFollow}
            isFollowed={isFollowed}
            isSendingFollow={isSendingFollow}
          />
          <Publications author={author} />
        </div>
        <div className="col-lg-4">
          <AuthorCitations author={author} />
          <Coauthors author={author} />
        </div>
      </div>
    );
};

export default Author;

const NoResult = ({ searchTerm }) => (
  <div className="empty">
    <div className="empty-icon">
      <img src={image} className="h-8 mb-4" alt="" />
    </div>
    <p className="empty-title h3">Aucun résultat trouvé pour {searchTerm}</p>
    <p className="empty-subtitle text-muted">
      Essayez d'ajuster votre recherche ou votre filtre pour trouver l'auteur
      que vous recherchez.
    </p>
    <div className="empty-action">
      <a href="/home" className="btn btn-primary">
        <LoopIcon />
        Search again
      </a>
    </div>
  </div>
);

const LoadingResult = () => (
  <div className="row">
    <div className="text-muted container text-center">
      <p className="h4 text-muted font-weight-normal m-7">
        Nous traitons votre demande, veuillez patienter ...
      </p>
    </div>
    <div className="loader container "></div>
  </div>
);

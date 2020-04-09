import React, { Fragment, useEffect, useContext, useState } from "react";

import { useParams } from "react-router-dom";

import AuthorHeader from "../../components/author/AuthorHeader";
import Coauthors from "../../components/author/Coauthors";
import AuthorCitations from "../../components/author/AuthorCitations";
import Publications from "../../components/author/Publications";

import image from "../../assets/images/illustrations/undraw_quitting_time_dm8t.svg";
import Axios from "axios";
import { LoopIcon } from "../../components/icons/icons";
import { AuthContext } from "../../context/auth";

const Author = (props) => {
  let { authorName } = useParams();

  const [author, setAuthor] = useState(null);
  const [isError, setIsError] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isSendingFollow, setsSendingFollow] = useState(false);

  const { user } = useContext(AuthContext);
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + user.token,
  };

  useEffect(() => {
    Axios.get(
      process.env.REACT_APP_BACKEND_API_URL + "/api/is-following/" + authorName,
      { headers }
    )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (data.isFollowing) setIsFollowed(true);
        else setIsFollowed(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const suivre = () => {
    setsSendingFollow(true);

    Axios.post(
      process.env.REACT_APP_BACKEND_API_URL + "/api/follow",
      { ...author },
      { headers }
    )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setIsFollowed(true);
      })
      .catch((error) => {
        console.log(error);
      });

    setsSendingFollow(false);
  };

  useEffect(() => {
    if (isFollowed) return;

    setAuthor();
    if (isError) setIsError(false);
    if (noResult) setNoResult(false);

    const authorNamePath = authorName.replace(" ", "%20");
    Axios.get(
      `${process.env.REACT_APP_SCHOOLARY_API_URL}/authors/${authorNamePath}`
    )
      .then((result) => {
        console.log(result);
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
        console.log(e);
        setNoResult(true);
      });
  }, [authorName]);

  if (noResult)
    return (
      <div className="empty">
        <div className="empty-icon">
          <img src={image} className="h-8 mb-4" alt="" />
        </div>
        <p className="empty-title h3">
          Aucun résultat trouvé pour {authorName}
        </p>
        <p className="empty-subtitle text-muted">
          Essayez d'ajuster votre recherche ou votre filtre pour trouver
          l'auteur que vous recherchez.
        </p>
        <div className="empty-action">
          <a href="/home" className="btn btn-primary">
            <LoopIcon />
            Search again
          </a>
        </div>
      </div>
    );

  if (author == null)
    return (
      <div className="row">
        <div className="text-muted container text-center">
          <p className="h4 text-muted font-weight-normal m-7">
            Nous traitons votre demande, veuillez patienter ...
          </p>
        </div>
        <div className="loader container "></div>
      </div>
    );

  if (author)
    return (
      <div className="row">
        <div className="col-lg-8">
          <AuthorHeader
            author={author}
            suivre={suivre}
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

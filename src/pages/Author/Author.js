import React, { Fragment, useEffect, useContext, useState } from "react";

import { useParams } from "react-router-dom";

import AuthorHeader from "../../components/author/AuthorHeader";
import Coauthors from "../../components/author/Coauthors";
import AuthorCitations from "../../components/author/AuthorCitations";
import Publications from "../../components/author/Publications";

import image from "../../assets/images/illustrations/undraw_quitting_time_dm8t.svg";
import Axios from "axios";

const Author = props => {
  let { authorName } = useParams();

  const [author, setAuthor] = useState(null);
  const [isError, setIsError] = useState(false);
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    setAuthor();
    if (isError) setIsError(false);
    if (noResult) setNoResult(false);

    Axios.get(
      `${process.env.REACT_APP_SCHOOLARY_API_URL}/authors/${authorName.replace(
        " ",
        "%20"
      )}`
    )
      .then(result => {
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
      .catch(e => {
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
        <p className="empty-title h3">No results found for {authorName}</p>
        <p className="empty-subtitle text-muted">
          Try adjusting your search or filter to find the author you're looking
          for.
        </p>
        <div className="empty-action">
          <a href="#" className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
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
            We are processing your request please be patient ...
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
            name={author.name}
            affiliation={author.affiliation}
            email={author.email}
            interests={author.interests}
            url_picture={author.url_picture}
            _id={author.id}
          />
          <Publications publications={author.publications} />
        </div>
        <div className="col-lg-4">
          <AuthorCitations
            cites_per_year={author.cites_per_year}
            citedby={author.citedby}
            citedby5y={author.citedby5y}
            hindex={author.hindex}
            hindex5y={author.hindex5y}
            i10index={author.i10index}
            i10index5y={author.i10index5y}
          />
          <Coauthors coauthors={author.coauthors} />
        </div>
      </div>
    );
};

export default Author;

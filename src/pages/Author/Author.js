import React, { Fragment } from "react";

import { useHttp } from "../../hooks/http";

import { useParams } from "react-router-dom";

import AuthorHeader from "../../components/author/AuthorHeader";
import Coauthors from "../../components/author/Coauthors";
import AuthorCitations from "../../components/author/AuthorCitations";
import Publications from "../../components/author/Publications";

import image from "../../assets/images/illustrations/undraw_quitting_time_dm8t.svg";

const Author = props => {
  let { authorName } = useParams();

  console.log(
    process.env.REACT_APP_SCHOOLARY_API_URL + "/authors/" + authorName
  );

  let [isLoading, author] = useHttp(
    process.env.REACT_APP_SCHOOLARY_API_URL + "/authors/" + authorName.replace(" ","%20"),
    [authorName]
  );

  const noResult = (
    <div className="empty">
    <div className="empty-icon">
      <img
        src={image}
        className="h-8 mb-4"
        alt=""
      />
    </div>
  <p className="empty-title h3">No results found for {authorName}</p>
    <p className="empty-subtitle text-muted">
      Try adjusting your search or filter to find the author you're looking for.
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
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
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

  const loadingContent = (
    <div className="row">
      <div className="text-muted container text-center">
        <p className="h4 text-muted font-weight-normal m-7">
          We are processing your request please be patient ...
        </p>
      </div>
      <div className="loader container "></div>
    </div>
  );

  if (isLoading) return loadingContent;

  if (!isLoading && !author) return noResult;

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

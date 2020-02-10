import React, { useState, Fragment } from "react";

import { useHttp } from "../hooks/http";

import { useParams } from "react-router-dom";

import AuthorHeader from "../components/author/AuthorHeader";
import Coauthors from "../components/author/Coauthors";
import AuthorCitations from "../components/author/AuthorCitations";
import Publications from "../components/author/Publications";

const Author = props => {
  let { authorName } = useParams();

  const [isLoading, author] = useHttp(
    process.env.REACT_APP_BACKEND_API_URL + "authors/" + authorName,
    [authorName]
  );

  const noResult = (
    <div className="row">
      <div className="text-muted container text-center">
        <p className="h4 text-muted font-weight-normal m-7">
          No author was found with the name "{authorName}"
        </p>
      </div>
    </div>
  );

  if (!isLoading && !author) return noResult;

  let content = (
    <div className="row">
      <div className="text-muted container text-center">
        <p className="h4 text-muted font-weight-normal m-7">
          We are processing your request please be patient ...
        </p>
      </div>
      <div className="loader container "></div>
    </div>
  );

  if (author) {
    content = (
      <Fragment>
        {/* {() => (isLoading ? <div className="loader container "></div> : "")} */}

        <div className="row">
          <div className="col-lg-8">
            <AuthorHeader
              name={author.name}
              affiliation={author.affiliation}
              email={author.email}
              interests={author.interests}
              url_picture={author.url_picture}
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
      </Fragment>
    );
  }

  return content;
};

export default Author;

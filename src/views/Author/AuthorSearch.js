import React, { useEffect, useContext, useState, useCallback } from "react";

import { useParams } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import PageHeader from "../components/PageHeader";
import AuthorCard from "./components/AuthorCard";

import image from "../../assets/images/illustrations/undraw_quitting_time_dm8t.svg";

const AuthorSearch = () => {
  let { authorName } = useParams();

  const [authors, setAuthors] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const { ApiServices } = useContext(AppContext);
  const { scraperService } = ApiServices;
  useEffect(() => {
    authorSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorName]);

  const authorSearch = useCallback(async () => {
    if (noResult) setNoResult(false);

    const authorNamePath = authorName.replace(" ", "%20");

    setAuthors([]);

    let result = await scraperService.authorSearch(authorNamePath);
    if (result.data && result.data.error) setNoResult(true);
    else setAuthors(result.data);
  }, [authorName, noResult, scraperService]);


  return (
    <div className="container">
      <PageHeader
        title={"Chercher l'auteur : " + authorName}
        subTitle={authors.length ? authors.length + " chercheurs" : ""}
      />
      <div className="row">
        {authors.map((author, index) => (
          <AuthorCard key={index} author={author} />
        ))}

        {authors.length === 0 && !noResult && (
          <div className="mt-4 loader container "></div>
        )}
      </div>

      {noResult && (
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
        </div>
      )}
    </div>
  );
};

export default AuthorSearch;

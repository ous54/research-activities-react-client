import React, { useEffect, useContext, useState } from "react";

import { useParams } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import PageHeader from "../_common/_components/PageHeader";
import AuthorCard from "./_components/AuthorCard";

import image from "../../assets/images/illustrations/undraw_quitting_time_dm8t.svg";

const AuthorSearch = () => {
  let { authorName } = useParams();

  const [authors, setAuthors] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const { ApiServices } = useContext(AppContext);
  const { scraperService } = ApiServices;
  useEffect(() => {
    if (noResult) setNoResult(false);

    const authorNamePath = authorName.replace(" ", "%20");

    setAuthors([]);

    scraperService.authorSearch(authorNamePath).then((result) => {
      if (result.data.error) setNoResult(true);
      else setAuthors(result.data);
    });
  }, [authorName, scraperService]);

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

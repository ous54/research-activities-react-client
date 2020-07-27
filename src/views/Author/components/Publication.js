import React, { useState, useContext, useEffect, useCallback } from "react";
import { AppContext } from "../../../context/AppContext";
import Loader from "../../components/Loader";
import PageNotFound from "../../components/PageNotFound";

const Publication = ({ author, publication, updatePublication, index }) => {
  const { ApiServices } = useContext(AppContext);
  const { scraperService } = ApiServices;

  const [noResult, setNoResult] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPublicationData = useCallback(() => {
    setIsLoading(true);
    scraperService
      .getPublicationData(author.scholarId, publication.title)
      .then((result) => {
        setIsFetched(true);
        if (result.data.error) {
          setNoResult(true);
          updatePublication(index, {
            ...publication,
            searchedFor: true,
          });
        } else {
          updatePublication(index, {
            ...publication,
            IF: result.data["Impact Factor"],
            SJR: result.data["SJR"],
            searchedFor: true,
          });
        }
        setIsLoading(false);
      })
      .catch((e) => {
        updatePublication(index, {
          ...publication,
          searchedFor: true,
        });
        setIsLoading(false);
        setNoResult(true);
      });
  }, [author.scholarId, index, publication, scraperService, updatePublication]);

  const lunchGetPublicationData = useCallback(() => {
    if (!publication.IF && !publication.SJR && !publication.searchedFor)
      setTimeout(() => {
        getPublicationData();
      }, index * 2000);
  }, [getPublicationData, index, publication]);

  useEffect(() => {
    lunchGetPublicationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchedButton = (
    <button
      className="btn  btn-sm m-3 btn-outline-secondary "
      onClick={getPublicationData}
    >
      récupérer
    </button>
  );
  return (
    <tr style={{ whiteSpace: "break-spaces " }} key={publication.title}>
      <td>
        {publication.title}
        <small className="d-block text-muted text-truncate mt-n1">
          {publication.authors.join(", ")}
        </small>
      </td>
      <td className="text-center">{publication.year}</td>
      <td className="text-center">{publication.citation.replace("*", "")}</td>
      <td className="text-center">
        {publication.IF ?? " "}
        {isLoading && <Loader size="25" />}
      </td>
      <td className="text-center">
        {publication.SJR ?? " "}
        {isLoading && <Loader size="25" />}
      </td>
      <td className="text-center">
        {noResult && PageNotFound}
        {!isFetched && !publication.searchedFor && !isLoading && fetchedButton}
      </td>
    </tr>
  );
};

export default Publication;

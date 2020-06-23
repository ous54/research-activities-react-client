import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";

const Publication = ({ author, publication, updatePublication, index }) => {
  const { ApiServices } = useContext(AppContext);
  const { scraperService } = ApiServices;

  const [noResult, setNoResult] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!publication.IF && !publication.SJR && !publication.searchedFor)
      setTimeout(() => {
        getPublicationData();
      }, index * 2000);
  }, []);

  const getPublicationData = () => {
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
  };

  const NoResult = <span className="badge small p-0 bg-gray-lt">inconnue</span>;
  const Loading = (
    <div style={{ height: "15px", width: "15px" }} className="loader"></div>
  );
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
        {isLoading && Loading}
      </td>
      <td className="text-center">
        {publication.SJR ?? " "}
        {isLoading && Loading}
      </td>
      <td className="text-center">
        {noResult && NoResult}
        {!isFetched && !publication.searchedFor && !isLoading && fetchedButton}
      </td>
    </tr>
  );
};

export default Publication;

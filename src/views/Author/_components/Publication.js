import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";

const Publication = ({ author, publication, index }) => {
  const { ApiServices } = useContext(AppContext);
  const { scraperService } = ApiServices;

  const [noResult, setNoResult] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [IF, setIF] = useState(null);
  const [SJR, setSJR] = useState(null);

  const getPublicationData = () => {
    setIsLoading(true);
    scraperService
      .getPublicationData(author.scholarId, publication.title)
      .then((result) => {
        setIsFetched(true);
        if (result.data.error) {
          setNoResult(true);
        } else {
          setIF(result.data["Impact Factor"]);
          setSJR(result.data["SJR"]);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setNoResult(true);
      });
  };

  const NoResult = <span class="badge small p-0 bg-gray-lt">inconnue</span>;
  const Loading = (
    <div style={{ height: "15px", width: "15px" }} className="loader"></div>
  );
  const fetchedButton = (
    <button class="btn  btn-sm m-3 btn-outline-secondary " onClick={getPublicationData}>
      récupérer
    </button>
  );
  return (
    <tr style={{ whiteSpace: "break-spaces " }} key={publication.title}>
      <td>
        {publication.title}
        <small class="d-block text-muted text-truncate mt-n1">
          {publication.authors.join(", ")}
        </small>
      </td>
      <td className="text-center">{publication.year}</td>
      <td className="text-center">{publication.citation}</td>
      <td className="text-center">
        {isLoading && Loading}
        {IF ?? ""}
      </td>
      <td className="text-center">
        {isLoading && Loading}
        {SJR ?? ""}
      </td>
      <td className="text-center">
        {noResult && NoResult}
        {!isFetched && fetchedButton}
      </td>
    </tr>
  );
};

export default Publication;

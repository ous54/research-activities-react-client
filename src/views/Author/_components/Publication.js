import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";

const Publication = ({ author, publication, index }) => {
  const { ApiServices } = useContext(AppContext);
  const { scraperService } = ApiServices;

  const [noResult, setNoResult] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const [IF, setIF] = useState(null);
  const [SJR, setSJR] = useState(null);

  const getPublicationData = () => {
    scraperService
      .getPublicationData(publication.title)
      .then((result) => {
        setIsFetched(true);
        if (result.data.error) {
          setNoResult(true);
        } else {
          setIF(result.data.IF);
          setSJR(result.data.SJR);
        }
      })
      .catch((e) => {
        setNoResult(true);
      });
  };

  const NoResult = <span class="badge small p-0 bg-gray-lt">inconnue</span>;
  const fetchedButton = (
    <button  class="btn btn-secondary small btn-sm" onClick={getPublicationData}>
      récupérer
    </button>
  );
  return (
    <tr style={{ whiteSpace: "break-spaces " }} key={publication.title}>
      <td>
        {publication.title}
        <small class="d-block text-muted text-truncate mt-n1">
          {publication.authors.join(" ")}
        </small>
      </td>
      <td className="text-center">{publication.citation}</td>
      <td className="text-center">{publication.year}</td>
      <td className="text-center">
        {noResult && NoResult}
        {IF ?? ""}
        {!isFetched && fetchedButton}
      </td>
      <td className="text-center">
        {noResult && NoResult}
        {SJR ?? ""}
        {!isFetched && fetchedButton}
      </td>
    </tr>
  );
};

export default Publication;

import React from "react";

import { useHttp } from "../../hooks/http";

const Publication = props => {
  const ELSEVIER_API_URL = process.env.REACT_APP_ELSEVIER_API_URL;
  const ELSEVIER_API_KEY = process.env.REACT_APP_ELSEVIER_API_KEY;
  const TITLE = props.publication.bib.title;

  const url =
    ELSEVIER_API_URL +
    "?apiKey=" +
    ELSEVIER_API_KEY +
    "&title=" +
    TITLE +
    "&field=SJR,SNIP";

  const [isDetailsLoading, PublicationDetails] = useHttp(url, [
    props.publication
  ]);

  if (!isDetailsLoading && !PublicationDetails) {
    console.log("not working for :" + TITLE);
  }

  let publication_SJR = <div className="loader container "></div>;
  let publication_IF = <div className="loader container "></div>;

  if (PublicationDetails) {
    if (PublicationDetails["serial-metadata-response"].error) {
      console.log(PublicationDetails["serial-metadata-response"].error);
      publication_SJR = (
        <div>{PublicationDetails["serial-metadata-response"].error}</div>
      );
    } else {
      publication_SJR =
        PublicationDetails["serial-metadata-response"]["entry"][0].SJRList
          .SJR[0]["$"];
    }
  }

  return (
    <tr key={props.publication.bib.title}>
      <td>
        <div>{props.publication.bib.title}</div>
        <div className="small text-muted"></div>
      </td>
      <td className="text-center">
        <div> {props.publication.citedby}</div>
      </td>
      <td className="text-center">
        <div> {props.publication.bib.year}</div>
      </td>
      <td className="text-center">
        <div> {publication_SJR}</div>
      </td>
      <td className="text-center">
        <div> {publication_IF}</div>
      </td>
    </tr>
  );
};

export default Publication;

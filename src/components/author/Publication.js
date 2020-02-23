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
    <tr
      style={{ whiteSpace: "break-spaces " }}
      key={props.publication.bib.title}
    >
      <td>{props.publication.bib.title}</td>
      <td className="text-center">{props.publication.citedby}</td>
      <td className="text-center">{props.publication.bib.year}</td>
      <td className="text-center">{publication_SJR}</td>
      <td className="text-center">{publication_IF}</td>
    </tr>
  );
};

export default Publication;

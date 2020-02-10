import React from "react";

const Publications = props => {
  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table table-hover  card-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th className="text-center"> Citée </th>
              <th className="text-center">Année</th>
            </tr>
          </thead>
          <tbody>
            {props.publications.map(publication => (
              <tr  key={publication.bib.title} >
                <td>
                  <div>{publication.bib.title}</div>
                  <div className="small text-muted"></div>
                </td>
                <td className="text-center">
                  <div> {publication.citedby}</div>
                </td>
                <td className="text-center">
                  <div> {publication.bib.year}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Publications;

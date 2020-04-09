import React, { useEffect } from "react";
import Publication from "./Publication";
import $ from "jquery";
import "datatables";

const Publications = (props) => {
  useEffect(() => {
    $(".datatable").DataTable();
  }, []);

  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table card-table table-vcenter text-nowrap datatable">
          <thead>
            <tr>
              <th>Titre</th>
              <th className="text-center"> Citée </th>
              <th className="text-center">Année</th>
              <th className="text-center">SJR</th>
              <th className="text-center">IF</th>
            </tr>
          </thead>
          <tbody>
            {props.author.publications.map((publication, index) => (
              <Publication
                index={index}
                key={publication.bib.title}
                publication={publication}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Publications;

import React from "react";

import "c3/c3.css";
import C3Chart from "react-c3js";

const AuthorCitations = (props) => {
  let chart = {
    title: "AuthorCitations",
    data: {
      columns: [],
      type: "bar",
      colors: {
        data1: "#467fcf",
      },
      names: {
        data1: "Citations",
      },
    },
    axis: {
      x: {
        type: "category",
        categories: [],
      },
    },
  };

  chart.data.columns[0] = ["data1"].concat(
    Object.keys(props.author.cites_per_year).map(
      (k, v) => props.author.cites_per_year[k]
    )
  );
  
  chart.axis.x.categories = Object.keys(props.author.cites_per_year).map(
    (k, v) => k
  );

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Citée par</h4>
      </div>
      <div className="table-responsive ">
        <table className="table table-hover table-outline   small text-muted card-table">
          <thead>
            <tr>
              <th></th>
              <th className="text-center">Toutes</th>
              <th className="text-center">
                Depuis {new Date().getFullYear() - 5}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Citations</td>
              <td className="text-center">{props.author.citedby}</td>
              <td className="text-center">{props.author.citedby5y}</td>
            </tr>
            <tr>
              <td>indice h</td>
              <td className="text-center">{props.author.hindex}</td>
              <td className="text-center">{props.author.hindex5y}</td>
            </tr>
            <tr>
              <td>indice i10</td>
              <td className="text-center">{props.author.i10index}</td>
              <td className="text-center">{props.author.i10index5y}</td>
            </tr>
          </tbody>
        </table>
        <div className="card-body">
          <C3Chart
            data={chart.data}
            axis={chart.axis}
            legend={{
              show: false,
            }}
            padding={{
              bottom: 0,
              top: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthorCitations;

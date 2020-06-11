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
    props.author.citationsPerYear.slice(-5).map((a) => a.year)
  );

  chart.axis.x.categories = props.author.citationsPerYear.slice(-5).map(
    (a) => a.citations
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
            {props.author.indexes.map(({ name, total, lastFiveYears }) => (
              <tr>
                <td>{name}</td>
                <td className="text-center">{total}</td>
                <td className="text-center">{lastFiveYears}</td>
              </tr>
            ))}
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

import React from "react";

import { withRouter } from "react-router-dom";

const Coauthors = withRouter(({ history, ...props }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Coauteurs</h3>
      </div>
      <div className="card-body o-auto" style={{ height: "auto" }}>
        <ul className="list-unstyled list-separated">
          {props.coauthors.map(coauthor => (
            <li className="list-separated-item" key={coauthor.id}>
              <div className="row align-items-center">
                <div className="col-auto">
                  <span
                    className="avatar avatar-md d-block"
                    style={{
                      backgroundImage:
                        "url(" +
                        "https://scholar.google.com/citations?view_op=medium_photo&user=" +
                        coauthor.id +
                        ")"
                    }}
                  ></span>
                </div>
                <div className="col">
                  <div>
                    <a
                      href=""
                      onClick={e => {
                        e.preventDefault();
                        history.push("/author/" + coauthor.name);
                      }}
                      className="text-inherit"
                    >
                      {coauthor.name}
                    </a>
                  </div>
                  <small className="d-block item-except text-sm text-muted h-1x">
                    {coauthor.affiliation}
                  </small>
                </div>
                <div className="col-auto">
                  <div className="item-action dropdown">
                    <a
                      onClick={e => {
                        history.push("/author/" + coauthor.name);
                      }}
                      data-toggle="dropdown"
                      className="icon"
                    >
                      <i className="fe fe fe-chevron-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default Coauthors;

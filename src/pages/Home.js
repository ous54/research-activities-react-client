import React, { useState, Fragment } from "react";

const Home = props => {
  return (
    <Fragment>
      <div className="page-header">
        <h1 className="page-title">Research papers</h1>
        <div className="page-options d-flex">
          <select className="form-control custom-select w-auto">
            <option value="asc">By name</option>
            <option value="desc">By author</option>
          </select>
          <div className="input-icon ml-2">
            <span className="input-icon-addon">
              <i className="fe fe-search"></i>
            </span>
            <input
              type="text"
              className="form-control w-10"
              placeholder="Search photo"
            />
          </div>
        </div>
      </div>
      <div className="row row-cards"></div>
    </Fragment>
  );
};

export default Home;

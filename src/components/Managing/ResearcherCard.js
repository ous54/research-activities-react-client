import React from "react";
import { Link } from "react-router-dom";

const ResearcherCard = (props) => {
  const { researcher } = props;
  return (
    <div class="col-md-6 col-lg-4">
      <div class="card">
        <div class="card-body">
          <div class="row row-sm align-items-center">
            <div class="col-auto">
              {researcher.id && (
                <span
                  class="avatar  avatar-md "
                  style={{
                    backgroundImage:
                      "url(" +
                      "https://scholar.google.com/citations?view_op=medium_photo&user=" +
                      researcher.id +
                      ")",
                  }}
                ></span>
              )}
              {!researcher.id && (
                <span class="avatar  bg-blue-lt avatar-md ">
                  {researcher.name.split(" ")[0][0]}
                  {researcher.name.split(" ")[1][0]}
                </span>
              )}
            </div>
            <div class="col">
              <h3 class="mb-0">
                <Link to={"/author/" + researcher.name}>
                  {researcher.name ? researcher.name : ""}{" "}
                </Link>
              </h3>
              <div class="text-muted text-h5">
                {researcher.email
                  ? "e-mail validée de " + researcher.email
                  : ""}
              </div>
            </div>
            <div class="col-auto lh-1 align-self-start">
              <span class="badge bg-green-lt">
                {researcher.publications.length} publications
              </span>
            </div>

            <div class="text-muted pl-2 p-1 text-h5">
              {researcher.affiliation ?? ""}
            </div>
          </div>
          <div class="row align-items-center mt-1">
            <div class="col">
              <div>
                <h6 class="h5">intérêts </h6>
                <div class="inline-block  mb-0">
                  {researcher.interests.map((interest) => (
                    <span class="badge bg-blue-lt  mr-2">{interest}</span>
                  ))}
                </div>
                <h6 class="h5">Coauteurs </h6>
                <div class="avatar-list   avatar-list-stacked mb-0">
                  {researcher.coauthors.map((coauthor) => (
                    <Link to={"/author/" + coauthor.name}>
                      <span class="avatar bg-blue-lt avatar-sm">
                        {coauthor.name.split(" ")[0][0]}
                        {coauthor.name.split(" ")[1][0]}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div class="col-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearcherCard;

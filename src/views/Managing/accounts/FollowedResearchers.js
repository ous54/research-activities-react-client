import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../AppContext";

import ResearcherCard from "../_components/ResearcherCard";
import ResearchersFilter from "../_components/ResearchersFilter";
import PageHeader from "../../_common/_components/PageHeader";

const FollowedResearchers = (props) => {
  const [followedResearchers, setFollowedResearchers] = useState([]);
  const [filteredResearchers, setFilteredResearchers] = useState([]);
  const [filter, setFilter] = useState(null);

  const { ApiServices } = useContext(AppContext);
  const { userService } = ApiServices;

  useEffect(() => {
    if (!filter) return;
    const { category, option, searchTerm } = filter;

    userService
      .getFollowedUsers()
      .then((response) => {
        console.log(searchTerm);

        setFollowedResearchers(
          response.data.filter(
            (user) =>
              searchTerm === "" ||
              user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
          )
        );
      })
      .catch((error) => {});
  }, [filter]);

  return (
    <div className="container">
      <PageHeader
        title="Chercheurs suivis"
        subTitle={filteredResearchers.length + " chercheurs"}
      />
      <div className="row">
        <div className="col-3">
          <ResearchersFilter filter={filter} setFilter={setFilter} />
        </div>
        <div className="col-9">
          <div className="row">
            {followedResearchers.map((researcher) => (
              <ResearcherCard researcher={researcher} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowedResearchers;

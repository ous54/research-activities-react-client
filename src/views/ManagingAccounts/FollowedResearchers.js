import React, { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "../../context/AppContext";

import ResearcherCard from "../ManagingAccounts/components/ResearcherCard";
import ResearchersFilter from "../components/ResearchersFilter";
import PageHeader from "../components/PageHeader";

const FollowedResearchers = () => {
  const [followedResearchers, setFollowedResearchers] = useState([]);
  const [
    filteredFollowedResearchers,
    setFilteredFollowedResearchers,
  ] = useState([]);

  const [filter, setFilter] = useState(null);
  const [filteringOptions, setFilteringOptions] = useState(null);

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { user, ApiServices } = useContext(AppContext);
  const { userService } = ApiServices;

  const updateFilteringOptionsData = useCallback(() => {
    userService.getFilteringOptions(user._id).then((response) => {
      setFilteringOptions(response.data);
    });
  }, [user._id, userService]);

  const updateFollowedUsersData = useCallback(() => {
    userService.getFollowedUsers(filter).then((response) => {
      setFollowedResearchers(response.data);
    });
  }, [filter, userService]);

  useEffect(() => {
    updateFilteringOptionsData();
  }, [updateFilteringOptionsData]);

  useEffect(() => {
    if (!filter) return;
    if (!isSearchActive) setIsSearchActive(true);
    updateFollowedUsersData();
  }, [filter, isSearchActive, updateFollowedUsersData]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredFollowedResearchers(followedResearchers);
      return;
    }

    setFilteredFollowedResearchers(
      followedResearchers.filter(
        (user) =>
          user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      )
    );
  }, [searchTerm, followedResearchers]);

  return (
    <div className="container">
      <PageHeader
        title="Chercheurs suivis"
        subTitle={filteredFollowedResearchers.length + " chercheurs"}
      />
      <div className="row">
        <div className="col-md-3">
          <ResearchersFilter
            {...{
              filter,
              setFilter,
              filteringOptions,
              setSearchTerm,
              searchTerm,
              isSearchActive,
              setIsSearchActive,
            }}
          />
        </div>
        <div className="col-md-9">
          <div className="row">
            {filteredFollowedResearchers.map((researcher, index) => (
              <ResearcherCard key={index} researcher={researcher} />
            ))}

            {filteredFollowedResearchers.length === 0 && (
              <div className="text-muted container text-center">
                <p className="h4 text-muted font-weight-normal m-2 m-5">
                  aucun résultat ne correspond au filtre cournat
                </p>{" "}
                <p className="h4 text-muted font-weight-normal m-1">
                  veuillez essayer un autre filtre
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowedResearchers;

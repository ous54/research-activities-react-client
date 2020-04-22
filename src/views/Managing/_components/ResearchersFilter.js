import React, { Fragment, useState, useContext, useEffect } from "react";
import { LoopIcon } from "../../_common/_components/icons";
import { Link } from "react-router-dom";
import { AppContext } from "../../../AppContext";

const ResearchersFilter = ({ filter, setFilter }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { ApiServices } = useContext(AppContext);
  const { laboratoryService, teamService } = ApiServices;

  const [laboratories, setLaboratories] = useState(null);
  const [teams, setTeams] = useState(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    teamService
      .findAllTeams()
      .then((response) => {
        setCategories((categories) => [
          ...categories,
          {
            name: "Équipes",
            options: [...response.data],
          },
        ]);
      })
      .catch((error) => {});

    laboratoryService
      .findAllLaboratories()
      .then((response) => {
        setCategories((categories) => [
          ...categories,
          {
            name: "Laboratoires",
            options: [...response.data],
          },
        ]);
      })
      .catch((error) => {});
  }, []);

  const updateFunctionBuilder = (category) => (option) => {
    setIsSearchActive(true);

    setFilter((filter) => ({
      ...filter,
      category,
      option,
      searchTerm,
    }));
  };

  useEffect(() => {
    setFilter((filter) => ({
      ...filter,
      searchTerm,
    }));
  }, [searchTerm]);
  
  return (
    <form action="" method="get">
      <div className="mb-3">
        <div className="input-icon">
          <input
            name="searchTerm"
            type="text"
            disabled={!isSearchActive}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control form-control-rounded"
            placeholder="Search…"
          />
          <span className="input-icon-addon">
            <LoopIcon />
          </span>
        </div>
      </div>
      {categories.map((category) => (
        <FilteringCategory
          category={category}
          updateFunctionBuilder={updateFunctionBuilder}
        />
      ))}
    </form>
  );
};

export default ResearchersFilter;

const FilteringCategory = ({ category, updateFunctionBuilder }) => {
  return (
    <Fragment>
      <div className="subheader mb-2">{category.name}</div>
      <div className="list-group list-group-transparent mb-3">
        {category.options.map((option) => (
          <FilteringOption
            option={option}
            updateFilterOption={updateFunctionBuilder(category)}
          />
        ))}
      </div>
    </Fragment>
  );
};

const FilteringOption = ({ option, isActive, updateFilterOption }) => {
  const classes =
    "list-group-item list-group-item-action d-flex align-items-center";

  return (
    <Link
      className={`${classes} ${isActive ? "active" : ""}`}
      onClick={() => updateFilterOption(option)}
    >
      {option.name}
      <small className="text-muted ml-auto">{""}</small>
    </Link>
  );
};

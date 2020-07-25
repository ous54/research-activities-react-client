import React, { useContext, useEffect, useState, useCallback } from "react";
import ResearchersFilter from "../Managing/_components/ResearchersFilter";
import PageHeader from "../_common/_components/PageHeader";
import StatisticsTable from "./_components/StatisticsTable";
import { AppContext } from "../../context/AppContext";
import StatisticsFilter from "./_components/StatisticsFilter";

import C3Chart from "react-c3js";
import "c3/c3.css";

const ResearchersStatistics = () => {
  const [researchersStatistics, setResearchersStatistics] = useState([]);
  const [
    filteredResearchersStatistics,
    setFilteredResearchersStatistics,
  ] = useState([]);

  const [dateRange, setDateRange] = useState({
    start: 2010,
    end: new Date().getFullYear(),
  });

  const [filter, setFilter] = useState(null);
  const [filteringOptions, setFilteringOptions] = useState(null);

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { user, ApiServices } = useContext(AppContext);
  const { statisticsService, userService } = ApiServices;

  const [chart, setChart] = useState({
    data: {
      x: "x",
      columns: [],
      type: "bar",
    },
  });

  const updateChart = useCallback(() => {
    console.log("updateChart");
    let yearsRange = [];
    for (let i = dateRange.start; i <= dateRange.end; i++) yearsRange.push(i);

    const columns = filteredResearchersStatistics
      .map((usersStatistic) =>
        [usersStatistic.name].concat(
          yearsRange.map((year) => usersStatistic.yearlyPublications[year] ?? 0)
        )
      )
      .concat([["x"].concat(yearsRange)]);

    setChart(() => ({
      data: {
        ...chart.data,
        columns,
      },
    }));
  }, [
    chart.data,
    dateRange.end,
    dateRange.start,
    filteredResearchersStatistics,
  ]);

  const updateFilteringOptionsData = useCallback(() => {
    console.log("updateFilteringOptionsData");
    userService.getFilteringOptions(user._id).then((response) => {
      setFilteringOptions(response.data);
    });
  }, [user._id, userService]);

  const updateFollowedUsersData = useCallback(() => {
    console.log("updateFollowedUsersData");

    statisticsService.getStatistics(filter).then((response) => {
      setResearchersStatistics(response.data);
    });
  }, [filter, statisticsService]);

  const updateStatistics = () => {};

  useEffect(() => {
    updateChart();
  }, [filteredResearchersStatistics, dateRange]);

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
      setFilteredResearchersStatistics(researchersStatistics);
      return;
    }

    const a = researchersStatistics.filter(
      (user) => user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
    setFilteredResearchersStatistics(a);
  }, [searchTerm, researchersStatistics]);

  return (
    <div className="container">
      <PageHeader
        title="Statistiques"
        subTitle={filteredResearchersStatistics.length + " chercheurs"}
      />
      <div className="row">
        <div className="col-md-4">
          <StatisticsFilter
            dateRange={dateRange}
            setDateRange={setDateRange}
            updateStatistics={updateStatistics}
          />
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
        <div className="col-md-8">
          <div className="card">
            <div id="chart-development-activity" className="mt-4">
              <div
                id="apexcharts28b504"
                className="apexcharts-canvas apexcharts28b504 apexcharts-theme-light"
              >
                {filteredResearchersStatistics.length > 0 && (
                  <C3Chart
                    data={chart.data}
                    legend={{
                      show: true,
                    }}
                  />
                )}
              </div>
            </div>
            <div className="table-responsive">
              {filteredResearchersStatistics.length > 0 && (
                <StatisticsTable
                  usersStatistics={filteredResearchersStatistics}
                  dateRange={dateRange}
                />
              )}
            </div>
            <div className="resize-triggers">
              <div className="expand-trigger">
                <div style={{ width: "579px", height: "460px" }}></div>
              </div>
              <div className="contract-trigger"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchersStatistics;

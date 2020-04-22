import React, { useContext, useState, useEffect } from "react";

import PageHeader from "../_common/_components/PageHeader";
import { AppContext } from "../../AppContext";

const Statistics = () => {
  const { ApiServices } = useContext(AppContext);
  const { statisticsService } = ApiServices;

  const [usersStatistics, setUsersStatistics] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: 2010,
    end: new Date().getFullYear(),
  });

  useEffect(() => {
    updateStatistics();
  }, []);

  const updateStatistics = () => {
    statisticsService
      .getPublicationsBetweenTwoDates(dateRange.start, dateRange.end)
      .then((response) => {
        setUsersStatistics(response.data);
      })
      .catch((error) => {});
  };
  return (
    <div className="container">
      <PageHeader title="statistiques" subTitle={[].length + " publications"} />
      <div className="row">
        <div className="col-3">
          <StatisticsFilter
            dateRange={dateRange}
            setDateRange={setDateRange}
            updateStatistics={updateStatistics}
          />
        </div>
        <div className="col-9">
          <div class="card">
            <div id="chart-development-activity" class="mt-4">
              <div
                id="apexcharts28b504"
                class="apexcharts-canvas apexcharts28b504 apexcharts-theme-light"
              ></div>
            </div>
            <div class="table-responsive">
              {usersStatistics.length > 1 && (
                <StatisticsTable
                  usersStatistics={usersStatistics}
                  dateRange={dateRange}
                />
              )}
            </div>
            <div class="resize-triggers">
              <div class="expand-trigger">
                <div style={{ width: "579px", height: "460px" }}></div>
              </div>
              <div class="contract-trigger"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

const StatisticsFilter = ({ dateRange, setDateRange, updateStatistics }) => {
  const handleInputsChange = (event) => {
    event.persist();

    setDateRange((dateRange) => ({
      ...dateRange,
      [event.target.name]: event.target.value,
    }));
  };
  const handelFormSubmit = (event) => {
    event.preventDefault();
    setDateRange(dateRange);
    updateStatistics();
  };

  return (
    <form action="" method="get">
      <div class="subheader mb-2">Date range</div>
      <div class="row row-sm align-items-center mb-3">
        <div class="col">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Start</span>
            </div>
            <input
              onChange={handleInputsChange}
              name="start"
              class="form-control"
              value={dateRange.start}
            />
          </div>
        </div>
        <div class="col-auto">—</div>
        <div class="col">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">End</span>
            </div>
            <input
              onChange={handleInputsChange}
              name="end"
              class="form-control"
              value={dateRange.end}
            />
          </div>
        </div>
      </div>

      <div class="mt-5">
        <button class="btn btn-primary btn-block" onClick={handelFormSubmit}>
          Update usersStatistics
        </button>
      </div>
    </form>
  );
};

const StatisticsTable = ({ usersStatistics, dateRange }) => {
  return (
    <table class="table card-table table-vcenter">
      <thead>
        <tr>
          <th>User</th>
          <th></th>
          {Object.keys(usersStatistics[0].publicationStatistics)
            .map((key, index) => key)
            .map((year) => (
              <th>{year}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {usersStatistics.map((userStatistics) => (
          <tr>
            <td class="w-1">
              <span class="avatar"></span>
            </td>
            <td class="td-truncate">{userStatistics.name}</td>
            {Object.keys(usersStatistics[0].publicationStatistics)
              .map((key, index) => key)
              .map((year) => (
                <td class="td-truncate">
                  {userStatistics.publicationStatistics[year]}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

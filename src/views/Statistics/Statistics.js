import React, { useContext, useState, useEffect } from "react";

import PageHeader from "../_common/_components/PageHeader";
import { AppContext } from "../../context/AppContext";

import C3Chart from "react-c3js";
import "c3/c3.css";

const Statistics = () => {
  const { ApiServices } = useContext(AppContext);
  const { statisticsService } = ApiServices;

  const [usersStatistics, setUsersStatistics] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: 2010,
    end: new Date().getFullYear(),
  });

  const [chart, setChart] = useState({
    data: {
      x: "x",
      columns: [],
      type: "bar",
    },
  });

  useEffect(() => {
    updateChart();
  }, [usersStatistics]);

  useEffect(() => {
    updateStatistics();
  }, []);

  const updateChart = () => {
    if (!usersStatistics.length) return;

    const columns = usersStatistics
      .map((usersStatistic) =>
        [usersStatistic.name].concat(
          Object.keys(usersStatistic.publicationStatistics)
            .map((key, index) => key)
            .map((year) => usersStatistic.publicationStatistics[year])
        )
      )
      .concat([
        ["x"].concat(
          Object.keys(usersStatistics[0].publicationStatistics)
            .map((key, index) => key)
            .map((year) => parseInt(year))
        ),
      ]);

    setChart(() => ({
      ...chart,
      data: { columns },
    }));
  };

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
      <PageHeader title="Statistiques" />
      <div className="row">
        <div className="col-4">
          <StatisticsFilter
            dateRange={dateRange}
            setDateRange={setDateRange}
            updateStatistics={updateStatistics}
          />
        </div>
        <div className="col-8">
          <div className="card">
            <div id="chart-development-activity" className="mt-4">
              <div
                id="apexcharts28b504"
                className="apexcharts-canvas apexcharts28b504 apexcharts-theme-light"
              >
                <C3Chart
                  data={chart.data}
                  axis={chart.axis}
                  legend={{
                    show: true,
                  }}
                />
              </div>
            </div>
            <div className="table-responsive">
              {usersStatistics.length > 1 && (
                <StatisticsTable
                  usersStatistics={usersStatistics}
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

export default Statistics;

const StatisticsFilter = ({ dateRange, setDateRange, updateStatistics }) => {
  const handleInputsChange = (event) => {
    event.persist();

    const { value, name } = event.target;
    setDateRange((dateRange) => ({
      ...dateRange,
      [name]: value,
    }));
  };
  const handelFormSubmit = (event) => {
    event.preventDefault();
    setDateRange(dateRange);
    updateStatistics();
  };

  const thisYear = new Date().getFullYear();

  return (
    <form action="" method="get" onSubmit={handelFormSubmit}>
      <div className="subheader mb-2">Date range</div>
      <div className="row row-sm align-items-center mb-3">
        <div className="col">
          <div className="input-group">
            <div className="input-group-prepend ">
              <span className="input-group-text">Start</span>
            </div>
            <input
              onChange={handleInputsChange}
              name="start"
              type="number"
              min={thisYear - 20}
              max={dateRange.end}
              className="form-control"
              value={dateRange.start}
            />
          </div>
        </div>
        <div className="col-auto">—</div>
        <div className="col">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">End</span>
            </div>
            <input
              onChange={handleInputsChange}
              name="end"
              type="number"
              min={dateRange.start}
              max={thisYear}
              className="form-control"
              value={dateRange.end}
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <button className="btn btn-primary btn-block">Update statistics</button>
      </div>
    </form>
  );
};

const StatisticsTable = ({ usersStatistics, dateRange }) => {
  return (
    <table className="table card-table table-vcenter">
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
            <td className="w-1">
              <span
                className="avatar"
                style={{
                  backgroundImage:
                    "url(" +
                    "https://scholar.google.com/citations?view_op=medium_photo&user=" +
                    userStatistics.id +
                    ")",
                }}
              ></span>
            </td>
            <td className="">{userStatistics.name}</td>
            {Object.keys(usersStatistics[0].publicationStatistics)
              .map((key, index) => key)
              .map((year) => (
                <td className="">
                  {userStatistics.publicationStatistics[year]}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

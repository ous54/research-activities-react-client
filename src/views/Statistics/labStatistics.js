/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback, Fragment } from "react";
import PageHeader from "../components/PageHeader";
import StatisticsTable from "./components/StatisticsTable";
import { AppContext } from "../../context/AppContext";
import StatisticsFilter from "./components/StatisticsFilter";

import C3Chart from "react-c3js";
import "c3/c3.css";
import LabFilter from "../components/LabFilter";
import ResearchersFilter from "../components/ResearchersFilter";
import { Link } from "react-router-dom";

const LabStatistics = () => {
  const [researchersStatistics, setResearchersStatistics] = useState([]);
   const [selectedLabs, setSelectedLabs] = useState([]);
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
  const { statisticsService, userService, laboratoryService } = ApiServices;
  const [laboratories, setLaboratories] = useState([]);

  const [chartVersion, setChartVersion] = useState(0);
  const [chart, setChart] = useState({
    data: {
      unload: true,
      x: "x",
      type: "bar",
      columns: [],
    },
  });

  const ListMembers =  useCallback((Laboratory) => {
    let members= [];
    let memberIds=[];
    let labMembers=[];
    Laboratory.teams.map(({teamMemberShipCount}) =>{
      console.log(teamMemberShipCount);
      Array.prototype.push.apply(members,teamMemberShipCount); 
  
  ;
     console.log(members);
    })
    console.log(members);
    members.map((member) =>
    {
      memberIds.push(member.user_id);
    }
    )
  
    console.log(memberIds);
    Promise.all(memberIds.map( async (id)=>{
      await statisticsService.findUser(id).then((response)=>{
        labMembers.push({
          firstName : response.data.firstName,
          lastName :response.data.lastName
        });
      });
      
    }))
    console.log(labMembers);
  },[userService]
  );
    

  const updateLaboratoryData = useCallback(async () => {
    let response = await laboratoryService.findAllLaboratories();
    setLaboratories(
        response.data.map((laboratory) => ({
          ...laboratory,
          establishment: laboratory.establishment.name,
        }))
    );
  }, [laboratoryService]);
  const updateChart = useCallback(() => {
    let yearsRange = [];
    let teamStats= {};
    for (let i = dateRange.start; i <= dateRange.end; i++){ yearsRange.push(i); teamStats[i]=0};   
    filteredResearchersStatistics
      .map((usersStatistic) =>
      
       {
         yearsRange.map((year)=>{

          teamStats[year]=teamStats[year]+(usersStatistic.yearlyPublications[year] ?? 0)
         })
         console.log(teamStats);
       }
         
        
      );
    const columns = filteredResearchersStatistics
      .map((usersStatistic) =>
      
        [usersStatistic.name].concat(
          yearsRange.map((year) => usersStatistic.yearlyPublications[year] ?? 0)
        )
      )
      
      .concat([['Team total'].concat(yearsRange.map((year) => teamStats[year] ?? 0))],[["x"].concat(yearsRange)]);

    setChart(() => ({
     
      data:{
      x: "x",
        columns,
        type: 'bar',
        types: {
            
            'Team total': 'line',
            data6: 'area',
        },
      
    }}));
    console.log(columns);
    setChartVersion(chartVersion + 1);
  }, [
    chartVersion,
    dateRange.end,
    dateRange.start,
    filteredResearchersStatistics,
  ]);



  const updateStatistics = () => {};
  useEffect(() => {
    updateChart();
  }, [filteredResearchersStatistics, dateRange]);

  useEffect(() => {
    updateLaboratoryData();
    
    console.log(user);
  }, [updateLaboratoryData]);

  useEffect(() => {
    if (!filter) return;
    if (!isSearchActive) setIsSearchActive(true);
  }, [filter, isSearchActive]);

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

          {/*<StatisticsFilter
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
          />*/}
          <FilteringCategory {...{ laboratories , setSelectedLabs, selectedLabs}}/>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div id="chartData-development-activity" className="mt-4">
              <div
                id="apexchartDatas28b504"
                className="apexchartDatas-canvas apexchartDatas28b504 apexchartDatas-theme-light"
              >
                {filteredResearchersStatistics.length > 0 && (
                  <C3Chart
                    key={chartVersion}
                    data={chart.data}
                    unloadBeforeLoad="true"
                    title={{
                      text: "Nombre des publications par année",
                    }}
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

const FilteringCategory = ({laboratories, setSelectedLabs, selectedLabs }) => {
  return (
    <Fragment>
      <div className="subheader mb-2">Laboratories</div>
      <div className="list-group list-group-transparent mb-3">
        {laboratories.map(( lab, index) => (
          <FilteringOption key={index} {...{ lab , setSelectedLabs, selectedLabs}} />
        ))}
      </div>
    </Fragment>
  );
};

const FilteringOption = ({ lab, setSelectedLabs, selectedLabs }) => {
  const classes =
    "list-group-item list-group-item-action d-flex align-items-center ";

  const updateFilter = (e) => {
    e.preventDefault();
    setSelectedLabs(lab
    );
    console.log(selectedLabs);
   
  };

  let isActive = false;
  return (
    <Link
      to="/#"
      className={`${classes} ${isActive ? " active " : "notActive"}`}
      onClick={updateFilter}
    >
      {lab.name}
      <small className="text-muted ml-auto">{lab.membershipCount}</small>
    </Link>
  );
};
export default LabStatistics;

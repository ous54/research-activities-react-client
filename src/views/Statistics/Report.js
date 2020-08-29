/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback, Fragment } from "react";
import TeamFilter from "../components/TeamFilter";
import PageHeader from "../components/PageHeader";
import { AppContext } from "../../context/AppContext";
import StatisticsFilter from "./components/StatisticsFilter";

import C3Chart from "react-c3js";
import "c3/c3.css";
import LabFilter from "../components/LabFilter";
import NoResultFound from "../components/NoResultFound";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportTable from "./ReportTable";

const Report = () => {
  const [researchersStatistics, setResearchersStatistics] = useState([]);
  const [teamPublications, setTeamPublications] = useState([]);
  const [version,setVersion] = useState(0);
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
  const { statisticsService, userService, scraperService } = ApiServices;

  

  const getPublicationDetails = useCallback(async(publication) =>{
    try {
      console.log("getting details");
      let jouranlName = publication.title;
      const jouranlNameQuery = jouranlName.replace("/", "").replace("\\", "");
      const response = await scraperService.getJournalData(jouranlNameQuery);
      if (response.data.error || response.data.status === 404) {
      console.log("error")
        }
       else {
        console.log("data",response.data)
          }
      }
      catch(error){

      }
    
});



  
  const updateFilteringOptionsData = useCallback(async () => {
    try {

      let response = await userService.getFilteringOptions(user._id);
      if (response.data) setFilteringOptions(response.data);
      else throw Error();
    } catch (error) {
      
    }
  }, [user._id]);

  const updateFollowedUsersData = useCallback(async () => {
    try {
      const response = await statisticsService.getStatistics(filter);
      if (response.data) setResearchersStatistics(response.data);
      else throw Error();
    } catch (error) {
 
    }
  }, [filter]);

  const updateStatistics = () => {};
 
  const setTeamPublicationByYear = useCallback( (year) =>{
    let publications =[];
      researchersStatistics.map((researcher)=>{
        researcher.publications.map(publication =>{
          if(publication.year===year)
          {publications.push(publication);}
        })
      })
      console.log(publications);
      setTeamPublications(publications);

      return publications;
  },[researchersStatistics])
  
  useEffect(() => {
    console.log(researchersStatistics);
    updateFilteringOptionsData();
  }, [updateFilteringOptionsData,researchersStatistics]);

  useEffect(()=>{
    setTeamPublicationByYear("2019");
  },[filter, researchersStatistics])
  useEffect(() => {
    if (!filter) return;
    if (!isSearchActive) setIsSearchActive(true);
    updateFollowedUsersData();
    console.log(researchersStatistics);

  }, [filter, isSearchActive, updateFollowedUsersData]);



  
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
          <TeamFilter
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
                     
        <ReportTable teamPublications={teamPublications}  />
          
        </div>
       </div>
    </div>
  );
};

export default Report;

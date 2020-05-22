import axios from "axios";

import {
  makeUserService,
  makeUniversityService,
  makeSchoolService,
  makeLaboratoryService,
  makeTeamService,
  makeScraperService,
  makeAuthentificationService,
  makeStatisticsService
} from "./services";

const printer = (header, color) => (prenable) => {
  console.log("%c" + header + " : ", "color:" + color);
  console.log(prenable);
  return prenable;
};

const setUpInterceptors = (api) => {
  api.interceptors.request.use(
    printer("Request config", "Green"),
    printer("Request config error", "Red")
  );
  api.interceptors.response.use(
    printer("Response", "Green"),
    printer("Response error", "Red")
  );
};

const makeApiServices = (token) => {
  const backendApiNoAuth = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL + "/auth",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });

  setUpInterceptors(backendApiNoAuth);

  if (!token)
    return {
      authentificationService: makeAuthentificationService(backendApiNoAuth),
    };

  const backendApi = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL + "/api",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const scraperApi = axios.create({
    baseURL: process.env.REACT_APP_SCRAPER_URL,
    timeout: 30000,
    headers: { "Content-Type": "application/json" },
  });

  setUpInterceptors(scraperApi);
  setUpInterceptors(backendApi);

  return {
    authentificationService: makeAuthentificationService(backendApiNoAuth),
    scraperService: makeScraperService(scraperApi),
    userService: makeUserService(backendApi),
    universityService: makeUniversityService(backendApi),
    schoolService: makeSchoolService(backendApi),
    laboratoryService: makeLaboratoryService(backendApi),
    teamService: makeTeamService(backendApi),
    statisticsService: makeStatisticsService(backendApi),  
  };
};

export default makeApiServices;



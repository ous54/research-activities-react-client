import axios from "axios";

import {
  makeUserService,
  makeUniversityService,
  makeSchoolService,
  makeLaboratoryService,
  makeTeamService,
  makeAuthorService,
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
    baseURL: process.env.REACT_APP_BACKEND_API_URL + "/auth",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });

  setUpInterceptors(backendApiNoAuth);

  if (!token)
    return {
      authentificationService: makeAuthentificationService(backendApiNoAuth),
    };

  const backendApi = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API_URL + "/api",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const schoolaryApi = axios.create({
    baseURL: process.env.REACT_APP_SCHOOLARY_API_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });

  setUpInterceptors(schoolaryApi);
  setUpInterceptors(backendApi);

  return {
    authentificationService: makeAuthentificationService(backendApiNoAuth),
    authorService: makeAuthorService(schoolaryApi),
    userService: makeUserService(backendApi),
    universityService: makeUniversityService(backendApi),
    schoolService: makeSchoolService(backendApi),
    laboratoryService: makeLaboratoryService(backendApi),
    teamService: makeTeamService(backendApi),
    statisticsService: makeStatisticsService(backendApi),  
  };
};

export default makeApiServices;

/* 

axios#request(config)
axios#get(url[, config])
axios#delete(url[, config])
axios#head(url[, config])
axios#options(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])
axios#getUri([config]) 








*/

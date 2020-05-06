import React, { createContext, useReducer, useEffect } from "react";
import makeApiServices from "../api/ApiServices";
import { UserHelper } from "./contextHelper";

let reducer = (user, newUser) => {
  if (newUser === null || newUser === undefined) {
    localStorage.removeItem("user");
    return initialState;
  }
  return newUser;
};

const initialState = null;

const localState = JSON.parse(localStorage.getItem("user"));

const AppContext = createContext();

function AppProvider(props) {
  const [user, setUser] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const ApiServices = makeApiServices(user ? user.token : null);

  return (
    <AppContext.Provider value={{ user, setUser, ApiServices, UserHelper }}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };

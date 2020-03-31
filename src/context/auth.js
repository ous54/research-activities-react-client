import React, { createContext,  useReducer, useEffect } from "react";

let reducer = (user, newUser) => {
  if (newUser === null || newUser === undefined) {
    localStorage.removeItem("user");
    return initialState;
  }
  return newUser
};

const initialState = null


const localState = JSON.parse(localStorage.getItem("user"));

const AuthContext = createContext();

 
function AuthProvider(props) {
  
  const [user, setUser] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

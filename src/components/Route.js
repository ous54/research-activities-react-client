import React, { useContext } from "react";
import { Route as ReactRoute, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

const Route = ({ component: Component, role, ...rest }) => {
  let { user } = useContext(AuthContext);

  return (
    <ReactRoute
      {...rest}
      render={(props) => {
        const RedirectLogin = (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
        const RedirectHome = (
          <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
          />
        );

        if (!user) return RedirectLogin;

        if (role && role !== user.role) return RedirectHome;
        return <Component {...props} />;
      }}
    />
  );
};

export default Route;

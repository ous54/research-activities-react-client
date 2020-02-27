import React, { Fragment } from "react";
import { useInputForm } from "../hooks/http";
import axios from "axios";
import { withRouter } from "react-router-dom";

const Login = withRouter(({ history, location }) => {
  const signup = () => {
    axios
      .post(process.env.REACT_APP_BACKEND_API_URL + "auth/login", {
        email: inputs.email,
        password: inputs.password
      })
      .then(response => {
        return response.data;
      })
      .then(data => {
        localStorage.removeItem("token");
        if (data.token) localStorage.setItem("token", data.token);
        history.push("/home");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const { inputs, handleInputChange, handleSubmit } = useInputForm(signup);

  return (
    <div className="page">
      <div className="page-single">
        <div className="container">
          <div className="row">
            <div className="col col-login mx-auto">
              <div className="text-center mb-6">
                <img src="./demo/brand/tabler.svg" className="h-6" alt="" />
              </div>
              <form className="card" form action onSubmit={handleSubmit}>
                <div className="card-body p-6">
                  <div className="card-title">Login to your account</div>
                  <div className="form-group">
                    <label className="form-label">Email address</label>
                    <input
                      onChange={handleInputChange}
                      value={inputs.email}
                      name="email"

                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Password
                      <a
                        href="./forgot-password.html"
                        className="float-right small"
                      >
                        I forgot password
                      </a>
                    </label>
                    <input
                      onChange={handleInputChange}
                      value={inputs.password}
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <label className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" />
                      <span className="custom-control-label">Remember me</span>
                    </label>
                  </div>
                  <div className="form-footer">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-center text-muted">
                Don't have account yet? <a href="./register.html">Sign up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;

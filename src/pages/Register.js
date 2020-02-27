import React, { Fragment } from "react";
import {useInputForm} from "../hooks/http";

import axios from "axios";
import { withRouter } from "react-router-dom";


const Register = withRouter(({ history, location }) => {

  const signup = ()  => {
    console.log(inputs.email);
    console.log(inputs.password);
    
    axios
      .post(process.env.REACT_APP_BACKEND_API_URL + "auth/signup", {
        email: inputs.email,
        password: inputs.password
      })
      .then(response => {
        return response.data;
      })
      .then(data => {
        console.log(data);
        history.push("/login");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const { inputs, handleInputChange, handleSubmit } = useInputForm(signup);


  return (
    <Fragment>
      <div className="page">
        <div className="page-single">
          <div className="container">
            <div className="row">
              <div className="col col-login mx-auto">
                <div className="text-center mb-6">
                  <img src="./demo/brand/tabler.svg" className="h-6" alt="" />
                </div>
                <form className="card" onSubmit={handleSubmit}>
                  <div className="card-body p-6">
                    <div className="card-title">Create new account</div>
                    <div className="form-group">
                      <label className="form-label">Email address</label>
                      <input
                        onChange={handleInputChange}
                        value={inputs.email}
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={handleInputChange}
                        value={inputs.password}
                        name="password"
                      />
                    </div>
                    <div className="form-group">
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <span className="custom-control-label">
                          Agree the <a href="terms.html">terms and policy</a>
                        </span>
                      </label>
                    </div>
                    <div className="form-footer">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Create new account
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-center text-muted">
                  Already have account? <a href="./login.html">Sign in</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
});



export default Register;

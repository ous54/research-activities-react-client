import React, { useState, useEffect } from "react";
import { useInputForm } from "../../hooks/http";
import { useDispatch } from "react-redux";
import { userActions } from "../../actions";

import image from "../../assets/images/tabler.svg";
import { Link } from "react-router-dom";
function LoginPage() {
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  const signup = () => {
    dispatch(userActions.login(inputs.email, inputs.password));
  };

  const { inputs, handleInputChange, handleSubmit } = useInputForm(signup);

  return (
    <div className="page">
      <div className="page-single">
        <div className="container">
          <div className="row">
            <div className="col col-login mx-auto">
              <div className="text-center mb-6">
                <img src={image} className="h-6" alt="" />
              </div>
              <form className="card" form action onSubmit={handleSubmit}>
                <div className="card-body ">
                  
                  <div className="card-title">Login to your account</div>
                  <div className="mb-3">
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
                  <div className="mb-3">
                    <label className="form-label">
                      Password
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
                </div>
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary ">
                    Sign in
                    </button>
                  </div>
              </form>
              <div className="text-center text-muted">
                Don't have account yet? <Link to="/register">Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

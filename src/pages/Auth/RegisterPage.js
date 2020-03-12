import React, { useState, useEffect, Fragment } from "react";
import { useInputForm } from "../../hooks/http";
import { useDispatch } from "react-redux";
import { userActions } from "../../actions";

import image from "../../assets/images/tabler.svg";
import { Link } from "react-router-dom";

function RegisterPage() {
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  const signup = () => {
    dispatch(userActions.register(inputs));
  };

  const { inputs, handleInputChange, handleSubmit } = useInputForm(signup);

  return (
    <Fragment>
      <div className="page pt-5">
        <div className="page-single">
          <div className="container">
            <div className="row">
              <div className="col col-login mx-auto">
                <div className="text-center mb-6">
                  <img src={image} className="h-6" alt="" />
                </div>
                <form className="card" onSubmit={handleSubmit}>
                  <div className="card-body ">
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
                    <div className="mb-3">
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
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary ">
                      Create new account
                    </button>
                  </div>
                </form>
                <div className="text-center text-muted">
                  Already have account? <Link to="./login.html">Sign in</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default RegisterPage;

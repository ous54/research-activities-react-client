import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

import image from "../../assets/images/tabler.svg";

function RegisterPage() {
  const [isRegistered, setRegistered] = useState(false);
  const [isError, setIsError] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const history = useHistory();

  const handleInputsChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (isError) setIsError(false);

    Axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/signup`, {
      ...inputs,
      role: "CED_HEAD"
    })
      .then(result => {
        console.log(result);

        if (result.status === 200) {
          if (isError) setIsError(false);

          setRegistered(true);

          setTimeout(() => {
            history.push("/login");
          }, 1000);
        } else {
          setIsError(true);
        }
      })
      .catch(e => {
        console.log(e);
        setIsError(true);
      });
  };

  return (
    <div className="page pt-5">
      <div className="page-single">
        <div className="container">
          <div className="row">
            <div className="col col-login mx-auto">
              <div className="text-center mb-6 mt-6">
                <img src={image} className="h-6" alt="" />
              </div>
              <form className="card" onSubmit={handleSubmit}>
                <div className="card-body ">
                  <div className="card-title">Create new account</div>
                  <div className="form-group m-2">
                    <label className="form-label"> First name</label>
                    <input
                      onChange={handleInputsChange}
                      value={inputs.firstName}
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="form-group m-2">
                    <label className="form-label">Last name</label>
                    <input
                      onChange={handleInputsChange}
                      value={inputs.lastName}
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="form-group m-2">
                    <label className="form-label">Email address</label>
                    <input
                      onChange={handleInputsChange}
                      value={inputs.email}
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="form-group m-2">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={handleInputsChange}
                      value={inputs.password}
                      name="password"
                    />
                  </div>
                  {isError && (
                    <div className="form-group m-2">
                      <div className="alert alert-danger" role="alert">
                        This email is already in use
                      </div>
                    </div>
                  )}
                  {isRegistered && (
                    <div className="form-group m-2">
                    <div className="alert alert-success" role="alert">
                      Congratulation ! you have successfully registered
                    </div>
                    </div>
                  )}
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
  );
}

export default RegisterPage;

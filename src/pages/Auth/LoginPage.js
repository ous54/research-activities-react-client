import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

import image from "../../assets/images/tabler.svg";
import { AuthContext } from "../../context/auth";

function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  let [inputs, setInputs] = useState({ email: " ", password: "" });
  let { setUser } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    setUser();
  }, []);

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

    Axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/login`, inputs)
      .then(result => {
        console.log(result);

        if (result.status === 200) {
          if (isError) setIsError(false);

          setUser({
            token: result.data.token,
            ...result.data.user
          });
          setIsLoggedIn(true);

          setTimeout(() => {
            history.push("/home");
          }, 1000);
        } else {
          setIsError(true);
        }
      })
      .catch(e => {
        setIsError(true);
      });
  };

  return (
    <div className="page">
      <div className="page-single">
        <div className="container">
          <div className="row">
            <div className="col col-login mx-auto">
              <div className="text-center mb-6 mt-6">
                <img src={image} className="h-6" alt="" />
              </div>
              <form className="card" form action onSubmit={handleSubmit}>
                <div className="card-body ">
                  <div className="card-title">Login to your account</div>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      onChange={handleInputsChange}
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
                    <label className="form-label">Password</label>
                    <input
                      onChange={handleInputsChange}
                      value={inputs.password}
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>

                  {isError && (
                    <div className="mb-3">
                      <div className="alert alert-danger" role="alert">
                        Your email or password are not correct! try once more
                        please
                      </div>
                    </div>
                  )}

                  {isLoggedIn && (
                    <div className="alert alert-success" role="alert">
                      Congratulation ! you have successfully logged in
                    </div>
                  )}
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

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
    password: "",
  });

  const history = useHistory();

  const handleInputsChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isError) setIsError(false);

    Axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/signup`, {
      ...inputs,
      role: "CED_HEAD",
    })
      .then((result) => {
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
      .catch((e) => {
        console.log(e);
        setIsError(true);
      });
  };

  return (
    <div className="page pt-5">
      <div className="page-single">
        <div className="container">
          <div className="row">
            <div className="col col-md-4 mx-auto">
              <div className="text-center mb-6 mt-6">
                <img src={image} className="h-6" alt="" />
              </div>
              <form className="card" onSubmit={handleSubmit}>
                <div className="card-body ">
                  <div className="card-title">Créer un nouveau compte</div>
                  <div className="form-group m-2">
                    <label className="form-label">Prénom</label>
                    <input
                      onChange={handleInputsChange}
                      value={inputs.firstName}
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Prénom"
                    />
                  </div>
                  <div className="form-group m-2">
                    <label className="form-label">Nom de famille</label>
                    <input
                      onChange={handleInputsChange}
                      value={inputs.lastName}
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Nom de famille"
                    />
                  </div>
                  <div className="form-group m-2">
                    <label className="form-label">Adresse email</label>
                    <input
                      onChange={handleInputsChange}
                      value={inputs.email}
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Adresse email"
                    />
                  </div>
                  <div className="form-group m-2">
                    <label className="form-label">Mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={handleInputsChange}
                      value={inputs.password}
                      name="password"
                      placeholder="Mot de passe"
                    />
                  </div>
                  {isError && (
                    <div className="form-group m-2">
                      <div className="alert alert-danger" role="alert">
                        Cet e-mail est déjà utilisée
                      </div>
                    </div>
                  )}
                  {isRegistered && (
                    <div className="form-group m-2">
                      <div className="alert alert-success" role="alert">
                        Félicitations! Vous êtes inscrit avec succès
                      </div>
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-block btn-primary ">
                    Créer un nouveau compte
                  </button>
                </div>
              </form>
              <div className="text-center text-muted">
                Vous avez déjà un compte?{" "}
                <Link to="./login.html">Se connecter</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

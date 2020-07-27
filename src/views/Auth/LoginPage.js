import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import image from "../../assets/images/logo.png";
import { AppContext } from "../../context/AppContext";

function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [inputs, setInputs] = useState({ email: " ", password: "" });
  const { ApiServices, setUser } = useContext(AppContext);
  const { authentificationService } = ApiServices;
  const history = useHistory();

  useEffect(() => {
    setUser();
  }, [setUser]);

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

    authentificationService
      .login(inputs)
      .then((result) => {
        if (result.status === 200) {
          if (isError) setIsError(false);

          setUser(result.data);

          setIsLoggedIn(true);

          setTimeout(() => {
            if (result.data.hasConfirmed) history.push("/");
            else history.push("/settings/account");
          }, 1000);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  };

  return (
    <div className="page">
      <div className="page-single">
        <div className="container">
          <div className="row">
            <div className="col col-md-4 mx-auto">
              <div className="text-center mb-6 mt-6">
                <img src={image} className="h-6" alt="" />
              </div>
              <form className="card" onSubmit={handleSubmit}>
                <div className="card-body ">
                  <div className="card-title">
                    Connectez-vous à votre compte
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Adresse email</label>
                    <input
                      onChange={handleInputsChange}
                      value={inputs.email}
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Adresse email"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input
                      onChange={handleInputsChange}
                      value={inputs.password}
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Mot de passe"
                    />
                  </div>

                  {isError && (
                    <div className="mb-3">
                      <div className="alert alert-danger" role="alert">
                        Votre email ou mot de passe n'est pas correct! essayez
                        encore s'il vous plait
                      </div>
                    </div>
                  )}

                  {isLoggedIn && (
                    <div className="alert alert-success" role="alert">
                      Félicitations! Vous êtes connecté avec succès
                    </div>
                  )}
                </div>

                <div className="card-footer">
                  <button type="submit" className="btn btn-block  btn-primary ">
                    Se connecter
                  </button>
                </div>
              </form>
              {/*  <div className="text-center text-muted">
                Vous n'avez pas encore de compte ?
                <Link to="/register"> S'inscrire</Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

import React, { useState, useContext, useEffect } from "react";
import GeneratedUser from "../../components/Managing/GeneratedUser";
import PageHeader from "../../components/layout/PageHeader";
import Axios from "axios";
import { AuthContext } from "../../context/auth";

const LaboratoryHeads = (props) => {
  const [laboratoryHeads, setLaboratoryHeads] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const { user, setUser } = useContext(AuthContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + user.token,
  };

  useEffect(() => {
    Axios.get(process.env.REACT_APP_BACKEND_API_URL + "/api/lab-heads", {
      headers,
    })
      .then((response) => {
        setLaboratoryHeads(response.data.labHeads);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEmailChange = (event) => {
    event.persist();
    setNewEmail(event.target.value);
  };

  const handleSubmit = (e) => {
    console.log(newEmail);
    const password = Math.random().toString(36).slice(-8);

    Axios.post(
      process.env.REACT_APP_BACKEND_API_URL + "/api/user",
      {
        email: newEmail,
        password,
        role: "LABORATORY_HEAD",
      },
      {
        headers,
      }
    )
      .then((response) => {
        setLaboratoryHeads([...laboratoryHeads, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                Creation des comptes chef de laboratoire
              </h3>
            </div>
            <div className="card-body">
              <div class="row">
                <div class="col-md-6 col-xl-12">
                  <div class="mb-3">
                    <label class="form-label">
                      Email de chef de laboratoire
                    </label>
                    <div class="input-group mb-2">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="example@domaine.com"
                        onChange={handleEmailChange}
                        value={newEmail.email}
                        name="email"
                      />
                      <span class="input-group-append">
                        <button
                          onClick={handleSubmit}
                          class="btn btn-secondary"
                          type="button"
                        >
                          Créer
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <PageHeader title="Utilisateurs confirmés" />
          <div class="row">
            {laboratoryHeads
              .filter((user) => user.has_confirmed)
              .map((laboratoryHead) => (
                <GeneratedUser user={laboratoryHead} />
              ))}
          </div>
        </div>{" "}
        <div class="col-6">
          <PageHeader title="Utilisateurs non confirmés" />
          <div class="row">
            {laboratoryHeads
              .filter((user) => !user.has_confirmed)
              .map((laboratoryHead) => (
                <GeneratedUser user={laboratoryHead} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryHeads;

import React, { useState, useContext, useEffect, useCallback } from "react";

import { AppContext } from "../../context/AppContext";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import UserListItem from "../Author/components/UserListItem";

const LaboratoryHeads = (props) => {
  const [laboratoryHeads, setLaboratoryHeads] = useState([]);
  const [newEmail, setNewEmail] = useState("");

  const { user, ApiServices } = useContext(AppContext);
  const { userService } = ApiServices;

  const updateData = useCallback(() => {
    userService
      .getLaboratoryHeads()
      .then((response) => {
        setLaboratoryHeads(response.data);
      })
      .catch((error) => {});
  }, [userService]);
  const handleEmailChange = (event) => {
    event.persist();
    setNewEmail(event.target.value);
  };

  useEffect(() => {
    updateData();
  }, [updateData]);

  const handleSubmit = (e) => {
    const password = Math.random().toString(36).slice(-8);

    userService
      .createUser({
        email: newEmail,
        password,
        role: "LABORATORY_HEAD",
        creatorId: user._id,
      })
      .then((response) => {
        updateData();
      })
      .catch((error) => {});
  };

  return (
    <div className="container">
      <PageHeader title="Géstion des comptes chef de laboratoire" />
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                Creation des comptes chef de laboratoire
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 col-xl-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Email de chef de laboratoire
                    </label>
                    <div className="input-group mb-2">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="example@domaine.com"
                        onChange={handleEmailChange}
                        value={newEmail.email}
                        name="email"
                      />
                      <span className="input-group-append">
                        <button
                          onClick={handleSubmit}
                          className="btn btn-secondary"
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
        <div className="col-md-4">
          <div className="card ">
            <div className="card-header">
              <h3 className="card-title">Utilisateurs invites</h3>
            </div>
            <div className="card-body p-0">
              <div
                style={{ height: "300px", maxHeight: "300px" }}
                className="list overflow-auto list-row list-hoverable"
              >
                {laboratoryHeads
                  .filter(
                    (laboratoryHead) =>
                      laboratoryHead && !laboratoryHead.hasConfirmed
                  )
                  .map((laboratoryHead, index) => (
                    <div className="list-item ">
                      <Link
                        to={"/profile/" + laboratoryHead._id}
                        className="text-body d-block"
                      >
                        {laboratoryHead.email}
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card ">
            <div className="card-header">
              <h3 className="card-title">Utilisateurs confirmés</h3>
            </div>
            <div className="card-body p-0">
              <div
                style={{ height: "300px", maxHeight: "300px" }}
                className="list  overflow-auto list-row list-hoverable"
              >
                {laboratoryHeads
                  .filter((user) => user && user.hasConfirmed)
                  .map(({ email, ...laboratoryHead }, index) => (
                    <UserListItem user={laboratoryHead} subTitle={email} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryHeads;

import React, { useState, useContext, useEffect, useCallback } from "react";
import GeneratedUser from "../_components/GeneratedUser";
import PageHeader from "../../_common/_components/PageHeader";

import { AppContext } from "../../../context/AppContext";

const Researchers = () => {
  const [researchers, setResearchers] = useState([]);
  const [newEmail, setNewEmail] = useState("");

  const { user, ApiServices } = useContext(AppContext);
  const { userService } = ApiServices;

  
  const updateData = useCallback(() => {
    userService.getResearchers().then((response) => {
      const filteredResearchers = response.data.filter(
        (researcher) => researcher.creatorId === user._id
      );

      setResearchers(filteredResearchers);
    });
  }, [user._id, userService]);

  useEffect(() => {
    updateData();
  }, [updateData, user._id]);

  const handleEmailChange = (event) => {
    event.persist();
    setNewEmail(event.target.value);
  };

  const handleSubmit = (e) => {
    const password = Math.random().toString(36).slice(-8);

    userService
      .createUser({
        email: newEmail,
        password,
        role: "RESEARCHER",
        creatorId: user._id,
      })
      .then((response) => {
       updateData()
      })
      .catch((error) => {});
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Creation des comptes chercheurs</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 col-xl-12">
                  <div className="mb-3">
                    <label className="form-label">Email de chercheur</label>
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
        <div className="col-md-6">
          <PageHeader
            title="Utilisateurs confirmés"
            subTitle={`${
              researchers.filter((user) => user.hasConfirmed).length
            } researcher(s)`}
          />
          <div className="row">
            {researchers
              .filter((user) => user.hasConfirmed)
              .map((laboratoryHead, index) => (
                <GeneratedUser key={index} user={laboratoryHead} />
              ))}
          </div>
        </div>
        <div className="col-md-6">
          <PageHeader
            title="Utilisateurs non confirmés"
            subTitle={`${
              researchers.filter((user) => !user.hasConfirmed).length
            } researcher(s)`}
          />
          <div className="row">
            {researchers
              .filter((user) => !user.hasConfirmed)
              .map((laboratoryHead, index) => (
                <GeneratedUser key={index} user={laboratoryHead} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Researchers;

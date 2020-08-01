import React, { useState, useContext, useEffect, useCallback } from "react";
import PageHeader from "../components/PageHeader";

import { AppContext } from "../../context/AppContext";
import UserListItem from "../Author/components/UserListItem";
import { Link } from "react-router-dom";

const Researchers = () => {
  const [researchers, setResearchers] = useState([]);
  const [newEmail, setNewEmail] = useState("");

  const { user, ApiServices } = useContext(AppContext);
  const { userService } = ApiServices;

  const updateData = useCallback(async () => {
    let response = await userService.getResearchers();
    const filteredResearchers = response.data.filter(
        (researcher) => researcher.creatorId === user._id
    );
    setResearchers(filteredResearchers);
  }, [user._id, userService]);

  useEffect(() => {
    updateData();
  }, [updateData, user._id]);

  const handleEmailChange = (event) => {
    event.persist();
    setNewEmail(event.target.value);
  };

  const handleSubmit = async (e) => {
    const password = Math.random().toString(36).slice(-8);

    try {
      await userService
          .createUser({
            email: newEmail,
            password,
            role: "RESEARCHER",
            creatorId: user._id,
          });
      updateData();
    } catch (error) {
    }
  };

  return (
    <div className="container">
      <PageHeader title="Géstion des comptes des chercheurs" />
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
              <h3 className="card-title">Comptes invités</h3>
            </div>
            <div className="card-body p-0">
              <div
                style={{ height: "300px", maxHeight: "300px" }}
                className="list overflow-auto list-row list-hoverable"
              >
                {researchers
                  .filter(
                    (laboratoryHead) =>
                      laboratoryHead && !laboratoryHead.hasConfirmed
                  )
                  .map((laboratoryHead, index) => (
                    <div className="list-item" key={index}>
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
              <h3 className="card-title">Comptes confermés</h3>
            </div>
            <div className="card-body p-0">
              <div
                style={{ height: "300px", maxHeight: "300px" }}
                className="list  overflow-auto list-row list-hoverable"
              >
                {researchers
                  .filter((user) => user && user.hasConfirmed)
                  .map(({ email, ...laboratoryHead }, index) => (
                    <UserListItem
                      key={index}
                      user={laboratoryHead}
                      subTitle={email}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Researchers;

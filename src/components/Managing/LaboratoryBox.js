import React, { Fragment, useState, useContext, useEffect } from "react";
import { TeamIcon } from "../icons/icons";
import UserAvatar from "./UserAvatar";
import Axios from "axios";
import { AuthContext } from "../../context/auth";

function LaboratoryBox(props) {
  const { user } = useContext(AuthContext);
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + user.token,
  };
  const { laboratory, laboratoryHeads } = props;
  const [newHeadId, setNewHeadId] = useState(null);
  const [currentHead, setCurrentHead] = useState(null);

  const handleHeadChange = (event) => {
    event.persist();

    setNewHeadId((newHeadId) => event.target.value);
  };

  useEffect(() => {
    Axios.get(
      process.env.REACT_APP_BACKEND_API_URL + "/api/user/" + laboratory.head_id,
      {
        headers,
      }
    )
      .then((response) => {
        console.log(response);
        setCurrentHead(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handelButtonClick = (event) => {
    event.preventDefault();
    if (newHeadId == null) return;

    Axios.get(
      process.env.REACT_APP_BACKEND_API_URL +
        "/api/entitle-laboratory/" +
        newHeadId +
        "/" +
        laboratory._id,
      {
        headers,
      }
    )
      .then((response) => {
        console.log(response);
        props.requestUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div class=" col-xl-6">
      <div class="card card-sm">
        <div class="card-body d-flex align-items-center">
          <span class="bg-blue text-white stamp mr-3">
            <TeamIcon />
          </span>
          <div class="mr-3 lh-sm">
            <div class="strong">{laboratory.name}</div>
            <div class="text-muted">Ecole : {laboratory.school.name}</div>
          </div>
        </div>
        {laboratory.head_id && currentHead && (
          <div class="p-0 m-0">
            <div class="card-body">
              <div class="form-label">Chef de laboratoire courant</div>

              <div class="float-left mr-3">
                <span class="avatar rounded">
                  {currentHead.firstName ? currentHead.firstName[0] : ""}
                  {currentHead.lastName ? currentHead.lastName[0] : ""}
                </span>
              </div>
              <div class="lh-sm">
                <div class="strong">
                  {currentHead.firstName ? currentHead.firstName : ""}{" "}
                  {currentHead.lastName ? currentHead.lastName : ""}
                </div>
                <div class="text-muted">
                  {currentHead.email ? currentHead.email : ""}
                </div>
              </div>
            </div>
          </div>
        )}
        <div class="p-3 pt-1 ">
          <div class="form-label">Sélectionner le chef de laboratoire</div>
          <select class="form-select" onChange={handleHeadChange}>
            <option selected disabled>
              Sélectionner ici le chef
            </option>
            {laboratoryHeads.map((laboratoryHead) => (
              <option
                key={laboratoryHead._id}
                value={laboratoryHead._id}
                selected={laboratoryHead._id === laboratory.id}
              >
                {laboratoryHead.has_confirmed
                  ? laboratoryHead.firstName + " " + laboratoryHead.lastName
                  : laboratoryHead.email}
              </option>
            ))}
          </select>
          <div className="form-footer">
            <button
              onClick={handelButtonClick}
              className="btn btn-outline-primary btn-block "
            >
              {laboratory.head_id
                ? "Modifier le chef du laboratoire"
                : "Sauvegarder"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaboratoryBox;

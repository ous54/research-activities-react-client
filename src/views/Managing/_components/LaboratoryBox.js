import React, { useState, useContext, useEffect } from "react";
import { TeamIcon } from "../../_common/_components/icons";
import { AppContext } from "../../../context/AppContext";
import UserBox from "./UserBox";

function LaboratoryBox({ laboratory, laboratoryHeads, requestUpdate }) {
  const [newHeadId, setNewHeadId] = useState(null);
  const [currentHead, setCurrentHead] = useState(null);

  const { ApiServices } = useContext(AppContext);
  const { laboratoryService, userService } = ApiServices;

  const handleHeadChange = (event) => {
    event.persist();
    setNewHeadId((newHeadId) => event.target.value);
  };

  useEffect(() => {
    userService
      .findUser(laboratory.head_id)
      .then((response) => {
        setCurrentHead(response.data);
      })
      .catch((error) => {});
  }, []);

  const handelButtonClick = (event) => {
    event.preventDefault();
    if (!newHeadId) return;

    laboratoryService
      .associateHeadToLaboratory(newHeadId, laboratory._id)
      .then((response) => {
        requestUpdate();
      })
      .catch((error) => {});
  };

  return (
    <div className=" col-md-6">
      <div className="card card-sm">
        <div className="card-body d-flex align-items-center">
          <span className="bg-blue text-white stamp mr-3">
            <TeamIcon />
          </span>
          <div className="mr-3 lh-sm">
            <div className="strong">{laboratory.abbreviation}</div>
            <div className="text-muted">
              Ecole : {laboratory.school.abbreviation}
            </div>
          </div>
        </div>
        {laboratory.head_id && currentHead && (
          <div className="p-0 m-0">
            <div className="card-body">
              <div className="form-label">Chef de laboratoire courant</div>
              <UserBox user={currentHead} />
            </div>
          </div>
        )}
        <div className="p-3 pt-1 ">
          <div className="form-label">Sélectionner le chef de laboratoire</div>
          <select className="form-select" onChange={handleHeadChange}>
            <option selected disabled>
              Sélectionner ici le chef
            </option>
            {laboratoryHeads.map((laboratoryHead) => (
              <option
                key={laboratoryHead._id}
                value={laboratoryHead._id}
                selected={laboratoryHead._id === laboratory.id}
              >
                {laboratoryHead.hasConfirmed
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

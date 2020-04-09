import React, { Fragment, useState } from "react";
import { TeamIcon } from "../icons/icons";
import UserAvatar from "./UserAvatar";

function LaboratoryBox(props) {
  const { laboratory, laboratoryHeads } = props;

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
        <div class="p-3">
          <div class="form-label">Select</div>
          <select class="form-select">
            {laboratoryHeads.map((laboratoryHead) => (
              <option value="1" selected={laboratoryHead._id === laboratory.id}>
                {laboratoryHead.has_confirmed
                  ? laboratoryHead.firstName + " " + laboratoryHead.lastName
                  : laboratoryHead.email}
              </option>
            ))}
          </select>
          <div className="form-footer">
            <button className="btn btn-outline-primary btn-block ">
              {laboratory.head_id ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaboratoryBox;

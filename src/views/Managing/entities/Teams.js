import React, { Fragment, useEffect, useState, useContext } from "react";
import $ from "jquery";
import "datatables";

import { AppContext } from "../../../AppContext";

const Teams = (props) => {

  const { ApiServices } = useContext(AppContext);
  const { laboratoryService, teamService } = ApiServices;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formAction === "add") addTeam();
    else if (formAction === "update") updateTeam(editedTeamId);
  };

  const handleInputsChange = (event) => {
    event.persist();

    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const [laboratories, setLaboratories] = useState(null);
  const [teams, setTeams] = useState(null);
  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    university_id: "",
  });

  let [dataVersion, setDataVersion] = useState(0);
  let [formAction, setFormAction] = useState("add");
  const [editedTeamId, setEditedTeamId] = useState(0);

  useEffect(() => {
    if (teams != null) $(".datatable").DataTable();
  }, [teams]);

  useEffect(() => {
    laboratoryService
      .findAllLaboratories()
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setLaboratories(data);
      })
      .catch((error) => {
      });
  }, [dataVersion]);

  useEffect(() => {
    teamService
      .findAllTeams()
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setTeams(data);
      })
      .catch((error) => {
      });
  }, [dataVersion]);

  const editTeam = (team) => {
    setFormAction("update");
    setEditedTeamId(team._id);
    setInputs((inputs) => ({
      ...inputs,
      ...team,
    }));
  };
  const addTeam = () => {
    teamService
      .createTeam({
        name: inputs.name,
        laboratory_id: inputs.laboratory_id ?? laboratories[0]._id,
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setDataVersion(dataVersion + 1);
        setInputs((inputs) => ({
          ...inputs,
          name: " ",
        }));
      })
      .catch((error) => {
      });
  };
  const deleteTeam = (team) => {
    teamService
      .deleteTeam(team._id)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setDataVersion(dataVersion + 1);
      })
      .catch((err) => {
      });
  };
  const updateTeam = (id) => {
    teamService
      .updateTeam({
        _id: id,
        name: inputs.name,
        laboratory_id: inputs.laboratory_id,
      })
      .then((response) => {
        setDataVersion(dataVersion + 1);
        setFormAction("add");
        setInputs((inputs) => ({
          ...inputs,
          name: " ",
        }));
      })
      .catch((err) => {
      });
  };

  let laboratoriesOptoins;

  if (laboratories) {
    laboratoriesOptoins = laboratories.map((laboratory) => (
      <option value={laboratory._id} key={laboratory._id}>
        {laboratory.name}
      </option>
    ));
  }

  let content = (
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  );

  if (teams) {
    content = teams.map((team, index) => (
      <tr key={index}>
        <td>{team.name}</td>
        <td>{team.laboratory.name}</td>
        <td>
          <div className="btn-list">
            <button
              type="button"
              onClick={() => {
                setEditedTeamId(team._id);
                editTeam(team);
              }}
              className="btn  btn-outline-primary btn-sm"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                deleteTeam(team);
              }}
              className="btn  btn-outline-danger "
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <Fragment>
      <div className="page-header">
        <h1 className="page-title">Équipes</h1>
      </div>
      <div className="row row-cards row-deck">
        <div className="col-8">
          <div className="card">
            <div className="table-responsive">
              <table className="table card-table table-vcenter text-nowrap datatable">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Laboratoire</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{content}</tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="card-header">
                <h3 className="card-title">Ajouter un nouveau équipe</h3>
              </div>
              <div className="card-body">
                <div className="form-group mt-2">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInputsChange}
                    value={inputs.name}
                    name="name"
                  />
                </div>
                <div className="form-group mt-2">
                  <label className="form-label">Laboratoire</label>

                  <select
                    name="laboratory_id"
                    onChange={handleInputsChange}
                    value={inputs.laboratory_id}
                    className="form-control"
                  >
                    {laboratoriesOptoins}
                  </select>
                </div>
              </div>
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-primary">
                  Soumettre
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Teams;

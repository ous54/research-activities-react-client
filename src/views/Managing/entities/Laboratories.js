import React, { Fragment, useEffect, useState, useContext } from "react";
import $ from "jquery";
import "datatables";

import { AppContext } from "../../../AppContext";

const Laboratories = (props) => {

  const { ApiServices } = useContext(AppContext);
  const { schoolService, laboratoryService } = ApiServices;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formAction === "add") addLaboratory();
    else if (formAction === "update") updateLaboratory(editedLaboratoryId);
  };

  const handleInputsChange = (event) => {
    event.persist();

    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const [schools, setSchools] = useState(null);
  const [laboratories, setLaboratories] = useState(null);
  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    university_id: "",
  });

  let [dataVersion, setDataVersion] = useState(0);
  let [formAction, setFormAction] = useState("add");
  const [editedLaboratoryId, setEditedLaboratoryId] = useState(0);

  useEffect(() => {
    if (laboratories != null) $(".datatable").DataTable();
  }, [laboratories]);

  useEffect(() => {
    schoolService
      .findAllSchools()
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setSchools(data);
      })
      .catch((error) => {
      });
  }, [dataVersion]);

  useEffect(() => {
    laboratoryService
      .findAllLaboratories()
      .then((response) => {  
        setLaboratories(response.data);
      })
      .catch((error) => {
      });
  }, [dataVersion]);

  const editLaboratory = (laboratory) => {
    setFormAction("update");
    setEditedLaboratoryId(laboratory._id);
    setInputs((inputs) => ({
      ...inputs,
      ...laboratory,
    }));
  };
  const addLaboratory = () => {
    laboratoryService
      .createLaboratory({
        name: inputs.name,
        school_id: inputs.school_id ?? schools[0]._id,
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
  const deleteLaboratory = (laboratory) => {
    laboratoryService
      .deleteLaboratory(laboratory._id)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setDataVersion(dataVersion + 1);
      })
      .catch((err) => {
      });
  };
  
  const updateLaboratory = (id) => {
    laboratoryService
      .updateLaboratory({
        _id: id,
        name: inputs.name,
        school_id: inputs.school_id,
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

  let schoolsOptoins;

  if (schools) {
    schoolsOptoins = schools.map((school) => (
      <option value={school._id} key={school._id}>
        {school.name}
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

  if (laboratories) {
    content = laboratories.map((laboratory, index) => (
      <tr key={index}>
        <td>{laboratory.name}</td>
        <td>{laboratory.school.name}</td>
        <td>
          <div className="btn-list">
            <button
              type="button"
              onClick={() => {
                setEditedLaboratoryId(laboratory._id);
                editLaboratory(laboratory);
              }}
              className="btn  btn-outline-primary btn-sm"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                deleteLaboratory(laboratory);
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
        <h1 className="page-title">Laboratoires</h1>
      </div>
      <div className="row row-cards row-deck">
        <div className="col-8">
          <div className="card">
            <div className="table-responsive">
              <table className="table card-table table-vcenter text-nowrap datatable">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>École</th>
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
                <h3 className="card-title">Ajouter un nouveau laboratoire</h3>
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
                  <label className="form-label">École</label>

                  <select
                    name="school_id"
                    onChange={handleInputsChange}
                    value={inputs.school_id}
                    className="form-control"
                  >
                    {schoolsOptoins}
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

export default Laboratories;

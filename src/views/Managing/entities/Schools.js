import React, { Fragment, useEffect, useState, useContext } from "react";
import $ from "jquery";
import "datatables";

import { AppContext } from "../../../AppContext";

const Schools = (props) => {
  const [dataVersion, setDataVersion] = useState(0);
  const [formAction, setFormAction] = useState("add");
  const [editedSchoolId, setEditedSchoolId] = useState(0);
  const [schools, setSchools] = useState(null);
  const [universities, setUniversities] = useState(null);

  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    university_id: "",
  });

  const { ApiServices } = useContext(AppContext);
  const { schoolService, universityService } = ApiServices;

  useEffect(() => {
    if (schools != null) $(".datatable").DataTable();
  }, [schools]);

  const handleInputsChange = (event) => {
    event.persist();

    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formAction === "add") addSchool();
    else if (formAction === "update") updateSchool(editedSchoolId);
  };

  useEffect(() => {
    schoolService
      .findAllSchools()
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setSchools(data);
      })
      .catch((error) => {});
  }, [dataVersion]);

  useEffect(() => {
    universityService
      .findAllUniversities()
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setUniversities(data);
      })
      .catch((error) => {});
  }, [dataVersion]);

  const editSchool = (school) => {
    setFormAction("update");
    setEditedSchoolId(school._id);
    setInputs((inputs) => ({
      ...inputs,
      ...school,
    }));
  };
  const addSchool = () => {
    ;

    schoolService
      .create({
        name: inputs.name,
        address: inputs.address,
        university_id:
          inputs.university_id === ""
            ? universities[0]._id
            : inputs.university_id,
      })
      .then((response) => {
        
        setDataVersion(dataVersion + 1);
        setInputs((inputs) => ({
          ...inputs,
          name: "",
          address: "",
        }));
      })
      .catch((error) => {});
  };

  const deleteSchool = (school) => {
    schoolService
      .deleteSchool(school._id)
      .then((response) => {
        
        setDataVersion(dataVersion + 1);
      })
      .catch((err) => {
        
      });
  };

  const updateSchool = (id) => {
    schoolService
      .updateSchool({
        _id: id,
        name: inputs.name,
        address: inputs.address,
        university_id: inputs.university_id,
      })

      .then((response) => {
        
        setDataVersion(dataVersion + 1);
        setFormAction("add");
        setInputs((inputs) => ({
          ...inputs,
          name: " ",
          address: " ",
        }));
      })
      .catch((err) => {
        
      });
  };

  let content;

  let universitiesOptoins;

  if (universities) {
    universitiesOptoins = universities.map((university) => (
      <option value={university._id} key={university._id}>
        {university.name}
      </option>
    ));
  }


  if (schools)
    content = schools.map((school, index) => (
      <tr key={index}>
        <td>{school.name}</td>
        <td>{school.address}</td>
        <td>{school.university.name}</td>
        <td className="text-center">
          <div className="btn-list">
            <button
              type="button"
              onClick={() => {
                setEditedSchoolId(school._id);
                editSchool(school);
              }}
              className="btn  btn-outline-primary btn-sm"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                deleteSchool(school);
              }}
              className="btn  btn-outline-danger "
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ));

  return (
    <Fragment>
      <div className="page-header">
        <h1 className="page-title">Écoles</h1>
      </div>
      <div className="row row-cards row-deck">
        <div className="col-8">
          <div className="card">
            <div className="table-responsive">
              <table className="table card-table table-vcenter text-nowrap datatable">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Adresse</th>
                    <th>Université</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{universities ? content : ""}</tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="card-header">
                <h3 className="card-title">Ajouter une nouvelle école</h3>
              </div>
              <div className="card-body">
                <div className="form-group mt-2">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInputsChange}
                    value={inputs.name}
                    onChange={handleInputsChange}
                    name="name"
                  />
                </div>
                <div className="form-group mt-2">
                  <label className="form-label">Adresse</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInputsChange}
                    value={inputs.address}
                    onChange={handleInputsChange}
                    name="address"
                  />
                </div>
                <div className="form-group mt-2">
                  <label className="form-label">Université</label>

                  <select
                    name="university_id"
                    onChange={handleInputsChange}
                    value={inputs.university_id}
                    className="form-control"
                  >
                    {universitiesOptoins}
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

export default Schools;

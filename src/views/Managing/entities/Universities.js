import React, { Fragment, useEffect, useState, useContext } from "react";
import $ from "jquery";
import "datatables";

import { AppContext } from "../../../AppContext";

const Universities = (props) => {
  const { user } = useContext(AppContext);
  const authHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + user.token,
  };

  let [dataVersion, setDataVersion] = useState(0);
  let [formAction, setFormAction] = useState("add");
  let [editedUniversityId, setEditedUniversityId] = useState(0);
  let [universities, setUniversities] = useState(null);

  const { ApiServices } = useContext(AppContext);
  const { schoolService, universityService } = ApiServices;

  useEffect(() => {
    if (universities != null) $(".universities-datatable").DataTable();
  }, [universities]);

  const [inputs, setInputs] = useState({
    name: "",
    city: "",
    country: "",
  });

  const handleInputsChange = (event) => {
    event.persist();

    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formAction === "add") addUniversity();
    else if (formAction === "update") updateUniversity(editedUniversityId);
  };

  useEffect(() => {
    universityService
      .findAllUniversities()
      .then((response) => {
        setUniversities(response.data);
      })
      .catch((error) => {
        
      });
  }, [dataVersion]);

  const editUniversity = (university) => {
    setFormAction("update");
    setEditedUniversityId(university._id);
    setInputs((inputs) => ({
      ...inputs,
      ...university,
    }));
  };

  const addUniversity = () => {
    universityService
      .createUniversity({
        name: inputs.name,
        city: inputs.city,
        country: inputs.country,
      })
      .then((response) => {
        setDataVersion(dataVersion + 1);
        setInputs((inputs) => ({
          ...inputs,
          name: " ",
          city: " ",
          country: " ",
        }));
      })
      .catch((error) => {
        
      });
  };
  const deleteUniversity = (university) => {
    universityService
      .delateUniversity(university._id)
      .then((response) => {
        
        setDataVersion(dataVersion + 1);
      })
      .catch((err) => {
        
      });
  };
  const updateUniversity = (id) => {
    universityService
      .updateUniversity({
        _id: id,
        name: inputs.name,
        city: inputs.city,
        country: inputs.country,
      })
      .then((response) => {
        
        setDataVersion(dataVersion + 1);
        setFormAction("add");
        setInputs((inputs) => ({
          ...inputs,
          name: " ",
          city: " ",
          country: " ",
        }));
      })
      .catch((err) => {
        
      });
  };

  let content = "";

  if (universities != null) {
    content = universities.map((university, index) => (
      <tr key={index}>
        <td>{university.name}</td>
        <td>{university.city}</td>
        <td>{university.country}</td>
        <td className="text-center">
          <div className="btn-list">
            <button
              type="button"
              onClick={() => {
                setEditedUniversityId(university._id);
                editUniversity(university);
              }}
              className="btn  btn-outline-primary btn-sm"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                deleteUniversity(university);
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
        <h1 className="page-title">Universities</h1>
      </div>
      <div className="row row-cards row-deck">
        <div className="col-8">
          <div className="card">
            <div className="table-responsive">
              <table className="table card-table table-vcenter text-nowrap universities-datatable">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Pays</th>
                    <th>Ville</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {universities &&
                    universities.map((university, index) => (
                      <tr key={index}>
                        <td>{university.name}</td>
                        <td>{university.city}</td>
                        <td>{university.country}</td>
                        <td>
                          <div className="btn-list">
                            <button
                              type="button"
                              onClick={() => {
                                setEditedUniversityId(university._id);
                                editUniversity(university);
                              }}
                              className="btn  btn-outline-primary btn-sm"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                deleteUniversity(university);
                              }}
                              className="btn  btn-outline-danger "
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="card-header">
                <h3 className="card-title">Ajouter une nouvelle université</h3>
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
                  <label className="form-label">Ville</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInputsChange}
                    value={inputs.city}
                    name="city"
                  />
                </div>
                <div className="form-group mt-2">
                  <label className="form-label">Pays</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInputsChange}
                    value={inputs.country}
                    name="country"
                  />
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

export default Universities;

import React, { Fragment, useEffect, useState } from "react";
import $ from "jquery";
import "datatables";
import { useHttp, useInputForm } from "../../hooks/http";
import axios from "axios";

import { authHeader } from "../../helpers";
const Schools = props => {
  let [dataVersion, setDataVersion] = useState(0);
  let [formAction, setFormAction] = useState("add");
  let [editedSchoolId, setEditedSchoolId] = useState(0);
  let [isLoadingSchools, schools] = useHttp(
    process.env.REACT_APP_BACKEND_API_URL + "/api/school",
    [dataVersion]
  );

  let [isLoadingUniversities, universities] = useHttp(
    process.env.REACT_APP_BACKEND_API_URL + "/api/university",
    [dataVersion]
  );

  const addUpdate = () => {
    if (formAction === "add") addSchool();
    else if (formAction === "update") updateSchool(editedSchoolId);
  };

  const { inputs, handleInputChange, handleSubmit, setInputs } = useInputForm(
    addUpdate
  );

  useEffect(() => {
    $(".datatable").DataTable();
  }, [inputs]);

  const editSchool = school => {
    setFormAction("update");
    setEditedSchoolId(school._id);
    setInputs(inputs => ({
      ...inputs,
      ...school
    }));
  };
  const addSchool = () => {
 
    console.log(inputs);

    axios
      .post(
        process.env.REACT_APP_BACKEND_API_URL + "/api/school",
        {
          name: inputs.name,
          address: inputs.address,
          university_id: inputs.university_id ??  universities[0]._id
        },
        {
          headers: {
            ...authHeader()
          }
        }
      )
      .then(response => {
        return response.data;
      })
      .then(data => {
        console.log(data);
        setDataVersion(dataVersion + 1);
        setInputs(inputs => ({
          ...inputs,
          name: "",
          address: ""
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleuniversityChange = e => {
    console.log(e);

    e.preventDefault();
  };

  const deleteSchool = school => {
    axios
      .delete(
        process.env.REACT_APP_BACKEND_API_URL + "/api/school/" + school._id,
        {
          headers: {
            ...authHeader()
          }
        }
      )
      .then(response => {
        return response.data;
      })
      .then(data => {
        console.log(data);
        setDataVersion(dataVersion + 1);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const updateSchool = id => {
   
    axios
      .put(
        process.env.REACT_APP_BACKEND_API_URL + "/api/school/",
        {
          _id: id,
          name: inputs.name,
          address: inputs.address,
          university_id: inputs.university_id
        },
        {
          headers: {
            ...authHeader()
          }
        }
      )
      .then(response => {
        return response.data;
      })
      .then(data => {
        console.log(data);
        setDataVersion(dataVersion + 1);
        setFormAction("add");
        setInputs(inputs => ({
          ...inputs,
          name: " ",
          address: " "
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  let content;

  let universitiesOptoins;

  if (!isLoadingUniversities && universities) {
    universitiesOptoins = universities.map(university => (
      <option value={university._id} key={university._id}>
        {university.name}
      </option>
    ));
  }

  if (!isLoadingSchools && schools)
    content = schools.map((school, index) => (
      <tr key={index}>
        <td>{school.name}</td>
        <td>{school.address}</td>
        <td>{school.university_id}</td>
        <td className="text-center">
          <div className="dropdown">
            <a
              href="#"
              onClick={() => {
                setEditedSchoolId(school._id);
                editSchool(school);
              }}
              className="icon p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon dropdown-item-icon"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </a>
            <a
              href
              className="icon p-2"
              onClick={() => {
                deleteSchool(school);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </a>
          </div>
        </td>
      </tr>
    ));

  return (
    <Fragment>
      <div className="page-header">
        <h1 className="page-title">Schools</h1>
      </div>
      <div className="row row-cards row-deck">
        <div className="col-8">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Schools</h3>
            </div>
            <div className="table-responsive">
              <table className="table card-table table-vcenter text-nowrap datatable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>University</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoadingUniversities && universities ? content : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="card-header">
                <h3 className="card-title">Add a new school</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInputChange}
                    value={inputs.name}
                    name="name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInputChange}
                    value={inputs.address}
                    name="address"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">University id</label>

                  <select
                    name="university_id"
                    onChange={handleInputChange}
                    value={inputs.university_id}
                    className="form-control"
                  >
                    {universitiesOptoins}
                  </select>
                </div>
              </div>
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-primary">
                  Submit
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

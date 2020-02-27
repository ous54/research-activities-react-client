import React, { Fragment, useEffect, useState } from "react";
import $ from "jquery";
import "datatables";
import { useHttp, useInputForm } from "../hooks/http";
import axios from "axios";

const Schools = props => {
  let [dataVersion, setDataVersion] = useState(0);
  let [formAction, setFormAction] = useState("add");
  const [editedSchoolId, setEditedSchoolId] = useState(0);
  let [isLoading, schools] = useHttp(
    process.env.REACT_APP_BACKEND_API_URL + "api/school",
    [dataVersion]
  );

  useEffect(() => {
    $(".datatable").DataTable();
  }, []);

  const addUpdate = () => {
    if (formAction == "add") addSchool();
    else if (formAction == "update") updateSchool(editedSchoolId);
  };

  const { inputs, handleInputChange, handleSubmit, setInputs } = useInputForm(
    addUpdate
  );

  const editSchool = school => {
    setFormAction("update");
    setEditedSchoolId(school._id);
    setInputs(inputs => ({
      ...inputs,
      ...school
    }));
  };
  const addSchool = () => {
    axios
      .post(
        process.env.REACT_APP_BACKEND_API_URL + "api/school",
        {
          name: inputs.name,
          address: inputs.address,
          university_id: inputs.university_id
        },
        {
          headers: {
            Authorization: "jwt " + localStorage.getItem("token")
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
          name: " ",
          address: " ",
          university_id: " "
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const deleteSchool = school => {
    axios
      .delete(
        process.env.REACT_APP_BACKEND_API_URL +
          "api/school/" +
          school._id,
        {
          headers: {
            Authorization: "jwt " + localStorage.getItem("token")
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
        process.env.REACT_APP_BACKEND_API_URL + "api/school/",
        {
          _id: id,
          name: inputs.name,
          address: inputs.address,
          university_id: inputs.university_id
        },
        {
          headers: {
            Authorization: "jwt " + localStorage.getItem("token")
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
          address: " ",
          university_id: " "
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  let content = (
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  );

  if (!isLoading && schools)
    content = schools.map((school, index) => (
      <tr key={index}>
        <td>{school.name}</td>
        <td>{school.address}</td>
        <td>{school.university_id}</td>
        <td className="text-center">
          <div className="dropdown">
            <a href className="icon p-2">
              <i
                className="fe fe-edit"
                onClick={() => {
                  setEditedSchoolId(school._id);
                  editSchool(school);
                }}
              ></i>
            </a>
            <a
              href
              className="icon p-2"
              onClick={() => {
                deleteSchool(school);
              }}
            >
              <i className="fe fe-trash"></i>
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
                    <th>University_id</th>
                    <th>Address</th>
                    <th className="text-center">Actions</th>
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
                  <label className="form-label">University_id</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInputChange}
                    value={inputs.university_id}
                    name="university_id"
                  />
                </div>
              </div>
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-primary">
                  Make request
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

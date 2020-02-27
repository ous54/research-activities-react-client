import React, { Fragment, useEffect, useState } from "react";
import $ from "jquery";
import "datatables";
import { useHttp, useInputForm } from "../hooks/http";
import axios from "axios";

const Universities = props => {
  let [dataVersion, setDataVersion] = useState(0);
  let [formAction, setFormAction] = useState("add");
  const [editedUniversityId, setEditedUniversityId] = useState(0);
  let [isLoading, universities] = useHttp(
    process.env.REACT_APP_BACKEND_API_URL + "api/university",
    [dataVersion]
  );

  useEffect(() => {
    $(".datatable").DataTable();
  }, []);

  const addUpdate = () => {
    if (formAction == "add") addUniversity();
    else if (formAction == "update") updateUniversity(editedUniversityId);
  };

  const { inputs, handleInputChange, handleSubmit, setInputs } = useInputForm(
    addUpdate
  );

  const editUniversity = university => {
    setFormAction("update");
    setEditedUniversityId(university._id);
    setInputs(inputs => ({
      ...inputs,
      ...university
    }));
  };
  const addUniversity = () => {
    axios
      .post(
        process.env.REACT_APP_BACKEND_API_URL + "api/university",
        {
          name: inputs.name,
          city: inputs.city,
          country: inputs.country
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
          city: " ",
          country: " "
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const deleteUniversity = university => {
    axios
      .delete(
        process.env.REACT_APP_BACKEND_API_URL +
          "api/university/" +
          university._id,
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
  const updateUniversity = id => {
    axios
      .put(
        process.env.REACT_APP_BACKEND_API_URL + "api/university/",
        {
          _id: id,
          name: inputs.name,
          city: inputs.city,
          country: inputs.country
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
          city: " ",
          country: " "
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

  if (!isLoading && universities)
    content = universities.map((university, index) => (
      <tr key={index}>
        <td>{university.name}</td>
        <td>{university.city}</td>
        <td>{university.country}</td>
        <td className="text-center">
          <div className="dropdown">
            <a href className="icon p-2">
              <i
                className="fe fe-edit"
                onClick={() => {
                  setEditedUniversityId(university._id);
                  editUniversity(university);
                }}
              ></i>
            </a>
            <a
              href
              className="icon p-2"
              onClick={() => {
                deleteUniversity(university);
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
        <h1 className="page-title">Universities</h1>
      </div>
      <div className="row row-cards row-deck">
        <div className="col-8">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Universities</h3>
            </div>
            <div className="table-responsive">
              <table className="table card-table table-vcenter text-nowrap datatable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>City</th>
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
                <h3 className="card-title">Add a new university</h3>
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
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInputChange}
                    value={inputs.city}
                    name="city"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInputChange}
                    value={inputs.country}
                    name="country"
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

export default Universities;

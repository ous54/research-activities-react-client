import React, { Fragment, useEffect, useState } from "react";
import $ from "jquery";
import "datatables";
import { useHttp, useInputForm } from "../../hooks/http";
import axios from "axios";

import { authHeader } from "../../helpers";
const Laboratories = props => {
  let [dataVersion, setDataVersion] = useState(0);
  let [formAction, setFormAction] = useState("add");
  const [editedLaboratoryId, setEditedLaboratoryId] = useState(0);
  let [isLoading, laboratories] = useHttp(
    process.env.REACT_APP_BACKEND_API_URL + "/api/laboratory",
    [dataVersion]
  );

  useEffect(() => {
    $(".datatable").DataTable();
  }, []);

  const addUpdate = () => {
    if (formAction == "add") addLaboratory();
    else if (formAction == "update") updateLaboratory(editedLaboratoryId);
  };

  const { inputs, handleInputChange, handleSubmit, setInputs } = useInputForm(
    addUpdate
  );

  let [isLoadingSchools, schools] = useHttp(
    process.env.REACT_APP_BACKEND_API_URL + "/api/school",
    [dataVersion]
  );
  
  const editLaboratory = laboratory => {
    setFormAction("update");
    setEditedLaboratoryId(laboratory._id);
    setInputs(inputs => ({
      ...inputs,
      ...laboratory
    }));
  };
  const addLaboratory = () => {
    axios
      .post(
        process.env.REACT_APP_BACKEND_API_URL + "/api/laboratory",
        {
          name: inputs.name,
          school_id: inputs.school_id
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
          name: " ",
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const deleteLaboratory = laboratory => {
    axios
      .delete(
        process.env.REACT_APP_BACKEND_API_URL +
          "/api/laboratory/" +
          laboratory._id,
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
  const updateLaboratory = id => {
    axios
      .put(
        process.env.REACT_APP_BACKEND_API_URL + "/api/laboratory/",
        {
          _id: id,
          name: inputs.name,
          school_id: inputs.school_id
          
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
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  let schoolsOptoins;

  if (!isLoadingSchools && schools) {
    schoolsOptoins = schools.map(school => (
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

  if (!isLoading && laboratories)
    content = laboratories.map((laboratory, index) => (
      <tr key={index}>
        <td>{laboratory.name}</td>
        <td>{laboratory.school_id}</td>
        <td className="text-center">
          <div className="dropdown">
            <a
              href="#"
              onClick={() => {
                setEditedLaboratoryId(laboratory._id);
                editLaboratory(laboratory);
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
                deleteLaboratory(laboratory);
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
        <h1 className="page-title">Laboratories</h1>
      </div>
      <div className="row row-cards row-deck">
        <div className="col-8">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Laboratories</h3>
            </div>
            <div className="table-responsive">
              <table className="table card-table table-vcenter text-nowrap datatable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>School_id</th>
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
                <h3 className="card-title">Add a new laboratory</h3>
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
                  <label className="form-label">school</label>

                  <select
                    name="school_id"
                    onChange={handleInputChange}
                    value={inputs.school_id}
                    className="form-control"
                  >
                    {schoolsOptoins}
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

export default Laboratories;

import React, { Fragment, useEffect, useState } from "react";
import $ from "jquery";
import "datatables";
import { useHttp, useInputForm } from "../hooks/http";
import axios from "axios";

const Laboratories = props => {
  let [dataVersion, setDataVersion] = useState(0);
  let [formAction, setFormAction] = useState("add");
  const [editedLaboratoryId, setEditedLaboratoryId] = useState(0);
  let [isLoading, laboratories] = useHttp(
    process.env.REACT_APP_BACKEND_API_URL + "api/laboratory",
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
        process.env.REACT_APP_BACKEND_API_URL + "api/laboratory",
        {
          name: inputs.name,
          school_id: inputs.school_id
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
          school_id: " "
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
          "api/laboratory/" +
          laboratory._id,
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
  const updateLaboratory = id => {
    axios
      .put(
        process.env.REACT_APP_BACKEND_API_URL + "api/laboratory/",
        {
          _id: id,
          name: inputs.name,
          school_id: inputs.school_id
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
          school_id: " "
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
    </tr>
  );

  if (!isLoading && laboratories)
    content = laboratories.map((laboratory, index) => (
      <tr key={index}>
        <td>{laboratory.name}</td>
        <td>{laboratory.school_id}</td>
        <td className="text-center">
          <div className="dropdown">
            <a href className="icon p-2">
              <i
                className="fe fe-edit"
                onClick={() => {
                  setEditedLaboratoryId(laboratory._id);
                  editLaboratory(laboratory);
                }}
              ></i>
            </a>
            <a
              href
              className="icon p-2"
              onClick={() => {
                deleteLaboratory(laboratory);
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
                  <label className="form-label">School_id</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInputChange}
                    value={inputs.school_id}
                    name="school_id"
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

export default Laboratories;

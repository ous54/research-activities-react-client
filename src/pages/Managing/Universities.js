import React, { Fragment, useEffect, useState } from "react";
import $ from "jquery";
import "datatables";
import { useHttp, useInputForm } from "../../hooks/http";
import axios from "axios";
import {authHeader} from "../../helpers";

const Universities = props => {

  useEffect(() => {
    $(".datatables").DataTable();
  }, []);


  let [dataVersion, setDataVersion] = useState(0);
  let [formAction, setFormAction] = useState("add");
  const [editedUniversityId, setEditedUniversityId] = useState(0);
  let [isLoading, universities] = useHttp(
    process.env.REACT_APP_BACKEND_API_URL + "/api/university",
    [dataVersion]
  );

  const addUpdate = () => {
    if (formAction === "add") addUniversity();
    else if (formAction === "update") updateUniversity(editedUniversityId);
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
        process.env.REACT_APP_BACKEND_API_URL + "/api/university",
        {
          name: inputs.name,
          city: inputs.city,
          country: inputs.country
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
          "/api/university/" +
          university._id,
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
  const updateUniversity = id => {
    axios
      .put(
        process.env.REACT_APP_BACKEND_API_URL + "/api/university/",
        {
          _id: id,
          name: inputs.name,
          city: inputs.city,
          country: inputs.country
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
          city: " ",
          country: " "
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  let content = "";

  if (!isLoading && universities)
    content = universities.map((university, index) => (
      <tr key={index}>
        <td>{university.name}</td>
        <td>{university.city}</td>
        <td>{university.country}</td>
        <td className="text-center">
         
            <a
              href="#"
              onClick={() => {
                setEditedUniversityId(university._id);
                editUniversity(university);
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
                deleteUniversity(university);
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
            <div className="table-responsive">
              <table className="table card-table table-vcenter text-nowrap datatables">
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




export default Universities;

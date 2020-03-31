import React, { Fragment, useEffect, useState, useContext } from "react";
import $ from "jquery";
import "datatables";
import axios from "axios";
import { AuthContext } from "../../context/auth";

const Schools = props => {
  const { user } = useContext(AuthContext);
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + user.token
  };

  const [dataVersion, setDataVersion] = useState(0);
  const [formAction, setFormAction] = useState("add");
  const [editedSchoolId, setEditedSchoolId] = useState(0);
  const [schools, setSchools] = useState(null);
  const [universities, setUniversities] = useState(null);

  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    university_id: ""
  });

  useEffect(() => {
    if (schools != null) $(".datatable").DataTable();
  }, [schools]);

  const handleInputsChange = event => {
    event.persist();

    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (formAction === "add") addSchool();
    else if (formAction === "update") updateSchool(editedSchoolId);
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_API_URL + "/api/school", {
        headers
      })
      .then(response => {
        return response.data;
      })
      .then(data => {
        console.log(data);
        setSchools(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [dataVersion]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_API_URL + "/api/university", {
        headers
      })
      .then(response => {
        return response.data;
      })
      .then(data => {
        console.log(data);
        setUniversities(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [dataVersion]);

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
          university_id:
            inputs.university_id === ""
              ? universities[0]._id
              : inputs.university_id
        },
        {
          headers
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

  const deleteSchool = school => {
    axios
      .delete(
        process.env.REACT_APP_BACKEND_API_URL + "/api/school/" + school._id,
        {
          headers
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
          headers
        }
      )
      .then(response => {
        console.log(response.data);
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

  if (universities) {
    universitiesOptoins = universities.map(university => (
      <option value={university._id} key={university._id}>
        {university.name}
      </option>
    ));
  }

  console.log(schools);

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
                    <th >Actions</th>
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
                <h3 className="card-title">Add a new school</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInputsChange}
                    value={inputs.name}
                    onChange={handleInputsChange}
                    name="name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInputsChange}
                    value={inputs.address}
                    onChange={handleInputsChange}
                    name="address"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">University</label>

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

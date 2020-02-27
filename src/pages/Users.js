import React, { Fragment, useEffect, useState } from "react";
import $ from "jquery";
import "datatables";
import { useHttp, useInputForm } from "../hooks/http";
import axios from "axios";

const Users = props => {
  let [dataVersion, setDataVersion] = useState(0);
  let [formAction, setFormAction] = useState("add");
  const [editedUserId, setEditedUserId] = useState(0);
  let [isLoading, users] = useHttp(
    process.env.REACT_APP_BACKEND_API_URL + "api/user",
    [dataVersion]
  );

  useEffect(() => {
    $(".datatable").DataTable();
  }, []);

  const addUpdate = () => {
    if (formAction == "add") addUser();
    else if (formAction == "update") updateUser(editedUserId);
  };

  const { inputs, handleInputChange, handleSubmit, setInputs } = useInputForm(
    addUpdate
  );

  const editUser = user => {
    setFormAction("update");
    setEditedUserId(user._id);
    setInputs(inputs => ({
      ...inputs,
      ...user
    }));
  };
  const addUser = () => {
    console.log(inputs.email);
    console.log(inputs.password);
    
    axios
      .post(
        process.env.REACT_APP_BACKEND_API_URL + "api/user",
        {
          email: inputs.email,
          password: inputs.password
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
          email: " ",
          password: " "
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const deleteUser = user => {
    axios
      .delete(
        process.env.REACT_APP_BACKEND_API_URL +
          "api/user/" +
          user._id,
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
  const updateUser = id => {
    axios
      .put(
        process.env.REACT_APP_BACKEND_API_URL + "api/user/",
        {
          _id: id,
          email: inputs.email,
          password: inputs.password
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
          email: " ",
          password: " "
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

  if (!isLoading && users)
    content = users.map((user, index) => (
      <tr key={index}>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td className="text-center">
          <div className="dropdown">
            <a href className="icon p-2">
              <i
                className="fe fe-edit"
                onClick={() => {
                  setEditedUserId(user._id);
                  editUser(user);
                }}
              ></i>
            </a>
            <a
              href
              className="icon p-2"
              onClick={() => {
                deleteUser(user);
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
        <h1 className="page-title">Users</h1>
      </div>
      <div className="row row-cards row-deck">
        <div className="col-8">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Users</h3>
            </div>
            <div className="table-responsive">
              <table className="table card-table table-vcenter text-nowrap datatable">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Passowrd</th>
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
                <h3 className="card-title">Add a new user</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInputChange}
                    value={inputs.email}
                    name="email"
                  />
                </div>              
                <div className="form-group">
                  <label className="form-label">Passowrd</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInputChange}
                    value={inputs.password}
                    name="password"
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

export default Users;

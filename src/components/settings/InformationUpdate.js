import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";

function InformationUpdate(props) {
  const { user } = useContext(AuthContext);
  const {
    accountInformations,
    setAccountInformations,
    updateAccountInformations,
  } = props;

  useEffect(() => {
    setAccountInformations({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }, []);

  const handleAccountInformationsChange = (event) => {
    event.persist();
    setAccountInformations((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateAccountInformations();
  };

  return (
    <div className="col-md-8">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Account update</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-auto">
                <span className="avatar avatar-lg bg-blue-lt">
                  <span className="badge  bg-success"></span>
                  {accountInformations.firstName
                    ? accountInformations.firstName[0]
                    : ""}
                  {accountInformations.lastName
                    ? accountInformations.lastName[0]
                    : ""}
                </span>
              </div>
              <div className="col">
                <div className="mb-2">
                  <label className="form-label">Role</label>
                  <input
                    disabled
                    className="form-control"
                    value={user.role.replace("_", " ")}
                  />
                </div>
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label">First name</label>
              <input
                className="form-control"
                placeholder="First name"
                onChange={handleAccountInformationsChange}
                value={accountInformations.firstName}
                name="firstName"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Last name</label>
              <input
                className="form-control"
                placeholder="Last name"
                onChange={handleAccountInformationsChange}
                value={accountInformations.lastName}
                name="lastName"
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Email-Address</label>
              <input
                className="form-control"
                placeholder="your-email@domain.com"
                onChange={handleAccountInformationsChange}
                value={accountInformations.email}
                name="email"
              />
            </div>
            <div className="form-footer">
              <button className="btn btn-primary ">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InformationUpdate;

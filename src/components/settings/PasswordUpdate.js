import React from "react";

function PasswordUpdate(props) {
  const { passwordUpdate, setPasswordUpdate, updatePassword } = props;

  const handlePasswordUpdateChange = (event) => {
    event.persist();

    setPasswordUpdate((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updatePassword();
  };

  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Password update</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="form-label">Courant password</label>
              <input
                type="password"
                className="form-control"
                onChange={handlePasswordUpdateChange}
                value={passwordUpdate.courantPassword}
                name="courantPassword"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">New password</label>
              <input
                type="password"
                className="form-control"
                onChange={handlePasswordUpdateChange}
                value={passwordUpdate.newPassword}
                name="newPassword"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Confirme new password</label>
              <input
                type="password"
                className="form-control"
                onChange={handlePasswordUpdateChange}
                value={passwordUpdate.confirmedNewPassword}
                name="confirmedNewPassword"
              />
            </div>

            <div className="form-footer">
              <button className="btn btn-primary ">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordUpdate;

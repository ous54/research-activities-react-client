import React, { useState, useContext } from "react";
import InformationUpdate from "../../components/settings/InformationUpdate";
import PasswordUpdate from "../../components/settings/PasswordUpdate";
import SettingsAlert from "../../components/settings/SettingsAlert";
import { AuthContext } from "../../context/auth";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function AccountSettings() {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + user.token,
  };

  const [passwordUpdate, setPasswordUpdate] = useState({
    courantPassword: "",
    newPassword: "",
    confirmedNewPassword: "",
  });

  const [accountInformations, setAccountInformations] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [isInformationUpdated, setIsInformationUpdated] = useState(false);
  const [isPasswordNotConfirmed, setIsPasswordNotConfirmed] = useState(false);
  const [isError, setIsError] = useState(false);

  const showInformationUpdated = () => {
    setIsInformationUpdated(true);
    setTimeout(() => {
      setIsInformationUpdated(false);
    }, 1000);
  };

  const showError = () => {
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 1000);
  };

  const showPasswordNotConfirmed = () => {
    setIsPasswordNotConfirmed(true);
    setTimeout(() => {
      setIsPasswordNotConfirmed(false);
    }, 1000);
  };

  const updateAccountInformations = () => {
    console.log("Save");
    
    Axios.put(
      process.env.REACT_APP_BACKEND_API_URL + "/api/user",
      { ...accountInformations, _id: user._id },
      {
        headers,
      }
    )
      .then((response) => {
        console.log(response);
        
        if (response.data.ok) {
          setUser({
            ...user,
            ...accountInformations,
            has_confirmed: true,
          });
          showInformationUpdated();
        }
      })
      .catch((error) => {
        console.log(error);
        showError();
      });
  };
  const updatePassword = () => {
    const {
      courantPassword,
      newPassword,
      confirmedNewPassword,
    } = passwordUpdate;

    if (newPassword !== confirmedNewPassword) {
      showPasswordNotConfirmed();
      return;
    }

    Axios.post(
      process.env.REACT_APP_BACKEND_API_URL +
        "/api/user/" +
        user._id +
        "/update-password",
      { password: newPassword },
      {
        headers,
      }
    )
      .then((response) => {
        if (response.data.ok) {
          showInformationUpdated();
          setTimeout(() => {
            history.push("/login");
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
        showError();
      });
  };

  return (
    <div className="row">
      {isInformationUpdated && (
        <SettingsAlert message="INFORMATION_UPDATED_MESSAGE" badge="success" />
      )}

      {!user.has_confirmed && (
        <SettingsAlert message="HAS_NOT_CONFIRMED_MESSAGE" badge="info" />
      )}

      {isError && (
        <SettingsAlert
          message="INFORMATION_NOT_UPDATED_MESSAGE"
          badge="danger"
        />
      )}

      {isPasswordNotConfirmed && (
        <SettingsAlert
          message="PASSWORD_NOT_CONFIRMED_MESSAGE"
          badge="danger"
        />
      )}

      <InformationUpdate
        accountInformations={accountInformations}
        setAccountInformations={setAccountInformations}
        updateAccountInformations={updateAccountInformations}
      />
      <PasswordUpdate
        passwordUpdate={passwordUpdate}
        setPasswordUpdate={setPasswordUpdate}
        updatePassword={updatePassword}
      />
    </div>
  );
}

export default AccountSettings;

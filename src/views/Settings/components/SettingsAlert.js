import React from "react";
import {
  HAS_NOT_CONFIRMED_MESSAGE,
  INFORMATION_UPDATED_MESSAGE,
  INFORMATION_NOT_UPDATED_MESSAGE,
  PASSWORD_NOT_CONFIRMED_MESSAGE,
  AUTHOR_HAS_UPDATES,
  NO_MESSAGE,
} from "./AlertMessages";

function SettingsAlert(props) {
  const alertMessage =
    props.message === "HAS_NOT_CONFIRMED_MESSAGE"
      ? HAS_NOT_CONFIRMED_MESSAGE
      : props.message === "INFORMATION_UPDATED_MESSAGE"
      ? INFORMATION_UPDATED_MESSAGE
      : props.message === "INFORMATION_NOT_UPDATED_MESSAGE"
      ? INFORMATION_NOT_UPDATED_MESSAGE
      : props.message === "PASSWORD_NOT_CONFIRMED_MESSAGE"
      ? PASSWORD_NOT_CONFIRMED_MESSAGE      
      : props.message === "AUTHOR_HAS_UPDATES"
      ? AUTHOR_HAS_UPDATES
      : NO_MESSAGE;
      
  return (
    <div className="col-md-12">
      <div
        className={"alert alert-dismissible alert-" + props.badge ?? "success"}
        role="alert"
      >
        <h3>{alertMessage.title}</h3>
        <p>{alertMessage.message}</p>

        <a href className="close" data-dismiss="alert" aria-label="close">
          &times;
        </a>
      </div>
    </div>
  );
}

export default SettingsAlert;

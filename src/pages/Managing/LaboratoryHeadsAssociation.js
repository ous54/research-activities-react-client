import React, { useState, useContext, useEffect } from "react";
import GeneratedUser from "../../components/Managing/GeneratedUser";
import PageHeader from "../../components/layout/PageHeader";
import Axios from "axios";
import { AuthContext } from "../../context/auth";
import LaboratoryBox from "../../components/Managing/LaboratoryBox";

const LaboratoryHeadsAssociation = (props) => {
  const [laboratoryHeads, setLaboratoryHeads] = useState([]);
  const [laboratories, setLaboratories] = useState([]);
  const [laboratoriesUpdate, setLaboratoriesUpdate] = useState(1);
  const { user } = useContext(AuthContext);

  const requestUpdate = () => {
    setLaboratoriesUpdate(laboratoriesUpdate*2);
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + user.token,
  };

  useEffect(() => {
    console.log("useEffect 1");
    
    Axios.get(process.env.REACT_APP_BACKEND_API_URL + "/api/laboratory", {
      headers,
    })
      .then((response) => {
        console.log(response.data);
        setLaboratories([]);
        setLaboratories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [laboratoriesUpdate]);

  useEffect(() => {
    console.log("useEffect 2");
    
    Axios.get(process.env.REACT_APP_BACKEND_API_URL + "/api/lab-heads", {
      headers,
    })
      .then((response) => {
        setLaboratoryHeads([])
        setLaboratoryHeads(response.data.labHeads);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [laboratoriesUpdate]);

  return (
    <div class="container">
      <div class="row">
        <div class="col-6">
          <PageHeader title="Laboratoires sans chef désigné" />
          <div class="row">
            {laboratories
              .filter((laboratory) => !laboratory.head_id)
              .map((laboratory) => (
                <LaboratoryBox
                  laboratory={laboratory}
                  laboratoryHeads={laboratoryHeads}
                  requestUpdate={requestUpdate}
                />
              ))}
          </div>
        </div>
        <div class="col-6">
          <PageHeader title="Laboratoires avec un chef désigné" />
          <div class="row">
            {laboratories
              .filter((laboratory) => laboratory.head_id)
              .map((laboratory) => (
                <LaboratoryBox
                  laboratory={laboratory}
                  laboratoryHeads={laboratoryHeads}
                  requestUpdate={requestUpdate}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryHeadsAssociation;

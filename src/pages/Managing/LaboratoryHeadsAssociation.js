import React, { useState, useContext, useEffect } from "react";
import GeneratedUser from "../../components/Managing/GeneratedUser";
import PageHeader from "../../components/layout/PageHeader";
import Axios from "axios";
import { AuthContext } from "../../context/auth";
import LaboratoryBox from "../../components/Managing/LaboratoryBox";

const LaboratoryHeadsAssociation = (props) => {
  const [laboratoryHeads, setLaboratoryHeads] = useState([]);
  const [laboratories, setLaboratories] = useState([]);

  const { user, setUser } = useContext(AuthContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + user.token,
  };

  useEffect(() => {
    Axios.get(process.env.REACT_APP_BACKEND_API_URL + "/api/laboratory", {
      headers,
    })
      .then((response) => {
        console.log(response.data);
        setLaboratories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get(process.env.REACT_APP_BACKEND_API_URL + "/api/lab-heads", {
      headers,
    })
      .then((response) => {
        setLaboratoryHeads(response.data.labHeads);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div class="container">
      <div class="row">
        <div class="col-6">
          <PageHeader title="L'association des chefs de laboratoires" />
          <div class="row">
            {laboratories
              .filter((laboratory) => !laboratory.head_id)
              .map((laboratory) => (
                <LaboratoryBox
                  laboratory={laboratory}
                  laboratoryHeads={laboratoryHeads}
                />
              ))}
          </div>
        </div>
        <div class="col-6">
          <PageHeader title="La mise à jour  chefs de laboratoires" />
          <div class="row">
            {laboratories
              .filter((laboratory) => laboratory.head_id)
              .map((laboratory) => (
                <LaboratoryBox
                  laboratory={laboratory}
                  laboratoryHeads={laboratoryHeads}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryHeadsAssociation;

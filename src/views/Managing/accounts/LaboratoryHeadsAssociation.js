import React, { useState, useContext, useEffect } from "react";

import LaboratoryBox from "../_components/LaboratoryBox";
import PageHeader from "../../_common/_components/PageHeader";
import { AppContext } from "../../../AppContext";

const LaboratoryHeadsAssociation = (props) => {
  const [laboratoryHeads, setLaboratoryHeads] = useState([]);
  const [laboratories, setLaboratories] = useState([]);
  const [laboratoriesUpdate, setLaboratoriesUpdate] = useState(1);

  const { ApiServices } = useContext(AppContext);
  const { laboratoryService, userService } = ApiServices;

  const requestUpdate = () => {
    setLaboratoriesUpdate(laboratoriesUpdate * 2);
  };

  useEffect(() => {
    laboratoryService
      .findAllLaboratories()
      .then((response) => {
        setLaboratories([]);
        setLaboratories(response.data);
      })
      .catch((error) => {
      });
  }, [laboratoriesUpdate]);

  useEffect(() => {
    userService
      .getLabHeads()
      .then((response) => {
        setLaboratoryHeads([]);
        setLaboratoryHeads(response.data.labHeads);
      })
      .catch((error) => {
      });
  }, [laboratoriesUpdate]);

  return (
    <div  className="container">
      <div  className="row">
        <div  className="col-6">
          <PageHeader title="Laboratoires sans chef désigné" />
          <div  className="row">
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
        <div  className="col-6">
          <PageHeader title="Laboratoires avec un chef désigné" />
          <div  className="row">
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

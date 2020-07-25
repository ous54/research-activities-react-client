import React, { Fragment, useEffect, useState, useContext, useCallback } from "react";
import { AppContext } from "../../../context/AppContext";
import CRUDTable from "../../_common/_components/CRUDTable";
import CRUDForm from "../../_common/_components/CRUDForm";
import PageHeader from "../../_common/_components/PageHeader";

const Establishments = (props) => {
  const { ApiServices } = useContext(AppContext);
  const { establishmentService, universityService } = ApiServices;

  const [establishments, setEstablishments] = useState([]);
  const [universities, setUniversities] = useState([]);

  const [inputs, setInputs] = useState({});
  const [action, setAction] = useState("ADDING");

  const columns = ["Nom", "Abréviation", "Adresse", "Université"];

  const inputsSkeleton = [
    { name: "name", label: columns[0], type: "input" },
    { name: "abbreviation", label: columns[1], type: "input" },
    { name: "address", label: columns[2], type: "input" },
    {
      name: "university",
      label: columns[3],
      type: "select",
      options: universities,
    },
  ];

  const clearInputs = () => {
    setInputs((inputs) => ({
      name: "",
      abbreviation: "",
      address: "",
      university_id: "",
    }));
  };

  
  const updateEstablishmentData = useCallback(() => {
    establishmentService.findAllEstablishments().then((response) => {
      setEstablishments(
        response.data.map((establishment) => ({
          ...establishment,
          university: establishment.university.name,
        }))
      );
    });
  },[establishmentService]);

  const updateUniversitiesData = useCallback(() => {
    universityService.findAllUniversities().then((response) => {
      setUniversities(response.data);
    });
  },[universityService]);

  useEffect(() => {
    updateEstablishmentData();
    updateUniversitiesData();
    clearInputs();
  }, [updateEstablishmentData, updateUniversitiesData]);


  const editEstablishment = (establishment) => {
    setAction("EDITING");
    setInputs((inputs) => ({
      ...inputs,
      ...establishment,
    }));
  };

  const addEstablishment = () => {
    establishmentService.createEstablishment(inputs).then((response) => {
      updateEstablishmentData();
      clearInputs();
    });
  };

  const updateEstablishment = (establishment) => {
    establishmentService
      .updateEstablishment({
        ...establishment,
        ...inputs,
      })
      .then((response) => {
        setAction("ADDING");
        updateEstablishmentData();
        clearInputs();
      });
  };

  const deleteEstablishment = (establishment) => {
    establishmentService.deleteEstablishment(establishment._id).then((response) => {
      updateEstablishmentData();
    });
  };

  const handleSubmit = (event) => {
    if (inputs.university_id === "")
      setInputs(() => ({
        ...inputs,
        university_id: inputsSkeleton[2].options[0]._id,
      }));

    action === "ADDING"
      ? addEstablishment()
      : action === "EDITING"
      ? updateEstablishment()
      : updateEstablishmentData();

    event.preventDefault();
  };

  const cancelEdit = (event) => {
    event.preventDefault();
    clearInputs();
    setAction("ADDING");
  };

  return (
    <Fragment>
      <div className="page-header">
        <PageHeader title="Établissements" subTitle={`${establishments.length} établissement(s)`} />
      </div>
      <div className="row row-cards row-deck">
        <div className="col-md-8">
          <CRUDTable
            columns={columns}
            data={establishments}
            tableSkeleton={inputsSkeleton}
            actions={[
              { name: "Modifier", function: editEstablishment, style: "primary" },
              {
                name: "Supprimer",
                function: deleteEstablishment,
                style: "danger",
              },
            ]}
          />
        </div>
        <div className="col-md-4">
          <CRUDForm
            {...{
              inputs,
              setInputs,
              inputsSkeleton,
              handleSubmit,
              cancelEdit,
              action,
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Establishments;

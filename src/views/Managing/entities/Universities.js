import React, { Fragment, useEffect, useState, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import CRUDTable from "../../_common/_components/CRUDTable";
import CRUDForm from "../../_common/_components/CRUDForm";
import PageHeader from "../../_common/_components/PageHeader";

const Universities = (props) => {
  const { ApiServices } = useContext(AppContext);
  const { universityService } = ApiServices;
  const [universities, setUniversities] = useState([]);
  const [inputs, setInputs] = useState({});
  const [action, setAction] = useState("ADDING");

  const columns = ["Nom", "Abréviation", "Ville", "Pays"];
  const inputsSkeleton = [
    { name: "name", label: columns[0], type: "input" },
    { name: "abbreviation", label: columns[1], type: "input" },
    { name: "city", label: columns[2], type: "input" },
    { name: "country", label: columns[3], type: "input" },
  ];

  const clearInputs = () => {
    setInputs((inputs) => ({
      name: " ",
      abbreviation: " ",
      city: " ",
      country: " ",
    }));
  };

  useEffect(() => {
    updateData();
    clearInputs();
  }, []);

  const updateData = () => {
    universityService.findAllUniversities().then((response) => {
      setUniversities(response.data);
    });
  };

  const editUniversity = (university) => {
    setAction("EDITING");
    setInputs((inputs) => ({
      ...inputs,
      ...university,
    }));
  };

  const addUniversity = () => {
    universityService.createUniversity(inputs).then((response) => {
      updateData();
    });
  };

  const updateUniversity = (university) => {
    universityService
      .updateUniversity({
        ...university,
        ...inputs,
      })
      .then((response) => {
        setAction("ADDING");
        updateData();
        clearInputs();
      });
  };

  const deleteUniversity = (university) => {
    universityService.deleteUniversity(university._id).then((response) => {
      updateData();
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    return action === "ADDING"
      ? addUniversity()
      : action === "EDITING"
      ? updateUniversity()
      : updateData();
  };

  const cancelEdit = () => {
    clearInputs();
    setAction("ADDING");
  };

  return (
    <Fragment>
      <div className="page-header">
        <PageHeader
          title="Universités"
          subTitle={`${universities.length} université(s)`}
        />
      </div>
      <div className="row row-cards row-deck">
        <div className="col-md-8">
          <CRUDTable
            columns={columns}
            data={universities}
            tableSkeleton={inputsSkeleton}
            actions={[
              { name: "Modifier", function: editUniversity, style: "primary" },
              {
                name: "Supprimer",
                function: deleteUniversity,
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

export default Universities;

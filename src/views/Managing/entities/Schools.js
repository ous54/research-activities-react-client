import React, { Fragment, useEffect, useState, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import CRUDTable from "../../_common/_components/CRUDTable";
import CRUDForm from "../../_common/_components/CRUDForm";
import PageHeader from "../../_common/_components/PageHeader";

const Schools = (props) => {
  const { ApiServices } = useContext(AppContext);
  const { schoolService, universityService } = ApiServices;

  const [schools, setSchools] = useState([]);
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
      name: " ",
      abbreviation: " ",
      address: " ",
      university_id: "",
    }));
  };

  useEffect(() => {
    updateSchoolData();
    updateUniversitiesData();
    clearInputs();
  }, []);

  const updateSchoolData = () => {
    schoolService.findAllSchools().then((response) => {
      setSchools(
        response.data.map((school) => ({
          ...school,
          university: school.university.name,
        }))
      );
    });
  };

  const updateUniversitiesData = () => {
    universityService.findAllUniversities().then((response) => {
      setUniversities(response.data);
    });
  };

  const editSchool = (school) => {
    setAction("EDITING");
    setInputs((inputs) => ({
      ...inputs,
      ...school,
    }));
  };

  const addSchool = () => {
    schoolService.createSchool(inputs).then((response) => {
      updateSchoolData();
      clearInputs();
    });
  };

  const updateSchool = (school) => {
    schoolService
      .updateSchool({
        ...school,
        ...inputs,
      })
      .then((response) => {
        setAction("ADDING");
        updateSchoolData();
        clearInputs();
      });
  };

  const deleteSchool = (school) => {
    schoolService.deleteSchool(school._id).then((response) => {
      updateSchoolData();
    });
  };

  const handleSubmit = (event) => {
    if (inputs.university_id === "")
      setInputs(() => ({
        ...inputs,
        university_id: inputsSkeleton[2].options[0]._id,
      }));

    action === "ADDING"
      ? addSchool()
      : action === "EDITING"
      ? updateSchool()
      : updateSchoolData();

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
        <PageHeader title="Écoles" subTitle={`${schools.length} école(s)`} />
      </div>
      <div className="row row-cards row-deck">
        <div className="col-md-8">
          <CRUDTable
            columns={columns}
            data={schools}
            tableSkeleton={inputsSkeleton}
            actions={[
              { name: "Modifier", function: editSchool, style: "primary" },
              {
                name: "Supprimer",
                function: deleteSchool,
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

export default Schools;

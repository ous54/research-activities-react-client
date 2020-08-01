import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { AppContext } from "../../context/AppContext";
import CRUDTable from "../components/CRUDTable";
import CRUDForm from "../components/CRUDForm";
import PageHeader from "../components/PageHeader";
import { useHistory } from "react-router-dom";

const Laboratories = () => {
  const history = useHistory();

  const { ApiServices } = useContext(AppContext);
  const { laboratoryService, establishmentService } = ApiServices;

  const [laboratories, setLaboratories] = useState([]);
  const [establishments, setEstablishments] = useState([]);

  const [inputs, setInputs] = useState({});
  const [action, setAction] = useState("ADDING");

  const columns = ["Nom", "Abréviation", "Établissement"];

  const inputsSkeleton = [
    { name: "name", label: columns[0], type: "input" },
    { name: "abbreviation", label: columns[1], type: "input" },
    {
      name: "establishment",
      label: columns[2],
      type: "select",
      options: establishments,
    },
  ];

  const clearInputs = () => {
    setInputs((inputs) => ({
      name: "",
      abbreviation: "",
      establishment_id: "",
    }));
  };

  const updateLaboratoryData = useCallback(async () => {
    let response = await laboratoryService.findAllLaboratories();
    setLaboratories(
        response.data.map((laboratory) => ({
          ...laboratory,
          establishment: laboratory.establishment.name,
        }))
    );
  }, [laboratoryService]);

  const updateEstablishmentsData = useCallback(async () => {
    let response = await establishmentService.findAllEstablishments();
    setEstablishments(response.data);
  }, [establishmentService]);

  useEffect(() => {
    updateLaboratoryData();
    updateEstablishmentsData();
    clearInputs();
  }, [updateEstablishmentsData, updateLaboratoryData]);

  const editLaboratory = (laboratory) => {
    setAction("EDITING");
    setInputs((inputs) => ({
      ...inputs,
      ...laboratory,
    }));
  };

  const manageLaboratory = ({ _id }) => {
    history.push(`/laboratory/${_id}`);
  };

  const addLaboratory = async () => {
    await laboratoryService.createLaboratory(inputs);
    updateLaboratoryData();
    clearInputs();
  };

  const updateLaboratory = async (laboratory) => {
    await laboratoryService
        .updateLaboratory({
          ...laboratory,
          ...inputs,
        });
    setAction("ADDING");
    updateLaboratoryData();
    clearInputs();
  };

  const deleteLaboratory = async (laboratory) => {
    await laboratoryService.deleteLaboratory(laboratory._id);
    updateLaboratoryData();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    return action === "ADDING"
      ? addLaboratory()
      : action === "EDITING"
      ? updateLaboratory()
      : updateLaboratoryData();
  };

  const cancelEdit = () => {
    clearInputs();
    setAction("ADDING");
  };

  return (
    <Fragment>
      <div className="page-header">
        <PageHeader
          title="Laboratoires"
          subTitle={`${laboratories.length} laboratoire(s)`}
        />
      </div>
      <div className="row row-cards row-deck">
        <div className="col-md-8">
          <CRUDTable
            columns={columns}
            data={laboratories}
            tableSkeleton={inputsSkeleton}
            actions={[
              { name: "Gérer", function: manageLaboratory, style: "primary" },
              { name: "Modifier", function: editLaboratory, style: "primary" },
              {
                name: "Supprimer",
                function: deleteLaboratory,
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

export default Laboratories;

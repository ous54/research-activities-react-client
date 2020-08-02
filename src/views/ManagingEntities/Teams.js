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
import { useHistory, Link } from "react-router-dom";

const Teams = () => {
  const history = useHistory();
  const { user, ApiServices, UserHelper } = useContext(AppContext);
  const { teamService } = ApiServices;

  const [teams, setTeams] = useState([]);
  const [laboratories, setLaboratories] = useState([]);

  const [inputs, setInputs] = useState({});
  const [action, setAction] = useState("ADDING");

  const columns = ["Nom", "Abréviation", "laboratoire"];

  const inputsSkeleton = [
    { name: "name", label: columns[0], type: "input" },
    { name: "abbreviation", label: columns[1], type: "input" },
    {
      name: "laboratory",
      label: columns[2],
      type: "select",
      options: laboratories,
    },
  ];

  const clearInputs = () => {
    setInputs(() => ({
      name: "",
      abbreviation: "",
      laboratory_id: "",
    }));
  };

  const updateTeamData = useCallback(async () => {
    let response = await teamService.findAllTeams();
    const filteredLaboratoiresIds = user.laboratoriesHeaded.map(
      ({ _id }) => _id
    );
    const filteredTeams = response.data
      .filter(
        (team) => filteredLaboratoiresIds.indexOf(team.laboratory_id) !== -1
      )
      .map((team) => ({
        ...team,
        laboratory: team.laboratory.name,
      }));
    setTeams(filteredTeams);
  }, [teamService, user.laboratoriesHeaded]);

  const updateLaboratoriesData = useCallback(() => {
    setLaboratories(user.laboratoriesHeaded);
  }, [user.laboratoriesHeaded]);

  const editTeam = (team) => {
    setAction("EDITING");
    setInputs((inputs) => ({
      ...inputs,
      ...team,
    }));
  };

  const addTeam = async () => {
    console.log(inputs);
    await teamService.createTeam(inputs);
    updateTeamData();
    clearInputs();
  };

  const updateTeam = async (team) => {
    await teamService.updateTeam({
      ...team,
      ...inputs,
    });
    setAction("ADDING");
    updateTeamData();
    clearInputs();
  };

  const deleteTeam = async (team) => {
    await teamService.deleteTeam(team._id);
    updateTeamData();
  };
  const manageTeam = ({ _id }) => {
    history.push(`/team/${_id}`);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    return action === "ADDING"
      ? addTeam()
      : action === "EDITING"
      ? updateTeam()
      : updateTeamData();
  };

  const cancelEdit = () => {
    clearInputs();
    setAction("ADDING");
  };

  useEffect(() => {
    updateTeamData();
    updateLaboratoriesData();
    clearInputs();
  }, [updateLaboratoriesData, updateTeamData]);

  return (
    <Fragment>
      <div className="page-header">
        <PageHeader
          title={`Équipes de votre laboratoire ${UserHelper.userHeadedLaboratories(
            user
          )}`}
          subTitle={`${teams.length} équipe(s)`}
        />
      </div>
      <div className="row row-cards row-deck">
        <div className="col-md-8">
          <CRUDTable
            columns={columns}
            data={teams}
            tableSkeleton={inputsSkeleton}
            actions={[
              { name: "Gérer", function: manageTeam, style: "primary" },
              { name: "Modifier", function: editTeam, style: "primary" },
              {
                name: "Supprimer",
                function: deleteTeam,
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

export default Teams;

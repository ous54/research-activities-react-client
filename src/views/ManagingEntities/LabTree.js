import React, { useEffect, Fragment, useContext, useState, useCallback } from "react";
import PageHeader from "../components/PageHeader";
import { UserHelper } from "../../context/contextHelper";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import LabReport from "./LabReport";
import Teams from "./Teams";

const LabTree = () => {
  const history = useHistory();
  const { user, ApiServices, UserHelper } = useContext(AppContext);
  const { teamService, userService } = ApiServices;

  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tHNames, setTHNames] = useState([]);
  const [membersNames, setMembersNames] = useState([]);

  const [laboratories, setLaboratories] = useState([]);
  const [inputs, setInputs] = useState({});
  const [action, setAction] = useState("ADDING");
  const clearInputs = () => {
    setInputs(() => ({
      name: "",
      abbreviation: "",
      laboratory_id: "",
    }));
  };

  const updateTeamData = useCallback(() => {
    teamService.findAllTeams().then((response) => {
      const filteredLaboratoiresIds = user.laboratoriesHeaded.map(({ _id }) => _id);

      const filteredTeams = response.data
        .filter((team) => filteredLaboratoiresIds.indexOf(team.laboratory_id) !== -1)
        .map((team) => ({
          ...team,
          laboratory: team.laboratory.name,
        }));
      setTeams(filteredTeams);
    });
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

  const addTeam = () => {
    console.log(inputs);
    teamService.createTeam(inputs).then((response) => {
      updateTeamData();
      clearInputs();
    });
  };

  const updateTeam = (team) => {
    teamService
      .updateTeam({
        ...team,
        ...inputs,
      })
      .then((response) => {
        setAction("ADDING");
        updateTeamData();
        clearInputs();
      });
  };

  const deleteTeam = (team) => {
    teamService.deleteTeam(team._id).then((response) => {
      updateTeamData();
    });
  };
  const manageTeam = ({ _id }) => {
    history.push(`/team/${_id}`);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    return action === "ADDING" ? addTeam() : action === "EDITING" ? updateTeam() : updateTeamData();
  };

  useEffect(() => {
    if (teams.length > 0) {
      setIsLoading(true);
      (async function getHeadNames() {
        let names = [];
        for (const team of teams) {
          let res = await userService.findUser(team.head_id);
          let name = [res.data.firstName, res.data.lastName].join(" ");
          console.log("tHNAMES BEFORE", { team_id:team._id, labName: team.name, headName: name,headId:team.head_id });
          names.push({team_id:team._id, teamName: team.name, headName: name,headId:team.head_id });
        }
        setTHNames(names);

        setIsLoading(false);
      })();
      (async function getNames() {
        let names = [];
        for (const team of teams) {
            for(const member of team.teamMemberShip){
          let res = await userService.findUser(member.user_id);
          console.log("RES",res)
          console.log("Team",team)
          let name = [res.data.firstName, res.data.lastName].join(" ");
          console.log("tHNAMES BEFORE", { team_id:team._id,labName: team.name, headName: name,memberId:member.user_id });
          names.push({team_id:team._id,teamName: team.name, memberName: name,memberId:member.user_id });
        }
      }
        setMembersNames(names);

        setIsLoading(false);
      })();
    }
    console.log("TEAMS", teams);
  }, [teams]);

  

  useEffect(() => {
    updateTeamData();
    updateLaboratoriesData();
    clearInputs();
  }, [updateLaboratoriesData, updateTeamData]);

  return (
    <Fragment>
      <div className="page-header">
        <PageHeader title={`${[user.firstName, user.lastName].join(" ")} : Chef de laboratoire ${UserHelper.userHeadedLaboratories(user)}`} />
      </div>
      
      <PDFDownloadLink
                  className="btn  btn-sm m-1  btn-outline-primary"
                  document={<LabReport user={user} teams={Teams} tHNames={tHNames} membersNames={membersNames}  />}
                  fileName={`${[user.firstName, user.lastName].join(" ")}` + `.pdf`}
                >
                  {({ blob, url, loading, error }) =>
                    loading
                      ? "Chargement du document..."
                      : "Imprimer le rapport"
                  }
                </PDFDownloadLink>
      {!isLoading &&
        tHNames.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-header">
              <h3 className="card-title">{`EQUIPE ${index + 1} : ${item.teamName}`}</h3>
            </div>
            <div className="card-header">
              {" "}
              <h2 className="card-title">{`Chef d'équipe : ${item.headName}`}</h2>
            </div>
            <div className="table-responsive">
              <table className="table card-table table-vcenter text-nowrap datatable">
                <thead>
                  <tr>
                    <th className="text-center">Nom</th>
                    <th className="text-center">Rôle</th>
                  </tr>
                </thead>
                <tbody>
                  {membersNames.filter(mem => mem.team_id === item.team_id && mem.memberId !== item.headId).map((member, index) => (
                    <tr style={{ whiteSpace: "break-spaces " }} key={index}>
                      <td>
                        {member.memberName}
                      </td>
                      <td className="text-center">CHERCHEUR</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default LabTree;

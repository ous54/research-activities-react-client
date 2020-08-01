import React, { useEffect, Fragment, useContext, useState, useCallback } from "react";
import PageHeader from "../components/PageHeader";
import { UserHelper } from "../../context/contextHelper";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import LabReport from "./LabReport";
import Teams from "./Teams";

const LabTree = () => {
  const { user, ApiServices, UserHelper } = useContext(AppContext);
  const { teamService, userService } = ApiServices;

  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tHNames, setTHNames] = useState([]);
  const [membersNames, setMembersNames] = useState([]);

  const [laboratories, setLaboratories] = useState([]);

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

  useEffect(() => {
    if (teams.length > 0) {
      setIsLoading(true);
      (async function getHeadNames() {
        let names = [];
        for (const team of teams) {
          let name;
          if (typeof team.head_id !== "undefined" || team.head_id === null) {
            console.log("HEAD", typeof team.head_id);
            let res = await userService.findUser(team.head_id);
            console.log("RES", res);
            name = [res.data.firstName, res.data.lastName].join(" ");
            console.log("tHNAMES BEFORE", { team_id: team._id, labName: team.name, headName: name, headId: team.head_id });
            names.push({ team_id: team._id, teamName: team.name, headName: name, headId: team.head_id });
          } else {
            name = null;
            names.push({ team_id: team._id, teamName: team.name, headName: name, headId: null });
          }
        }
        setTHNames(names);

        setIsLoading(false);
      })().catch((err) => console.log(err));
      (async function getNames() {
        let names = [];
        for (const team of teams) {
          for (const member of team.teamMemberShip) {
            let res = await userService.findUser(member.user_id);
            console.log("RES", res);
            console.log("Team", team);
            let name = [res.data.firstName, res.data.lastName].join(" ");
            console.log("tHNAMES BEFORE", { team_id: team._id, labName: team.name, headName: name, memberId: member.user_id });
            if (member.user_id !== team.head_id) {
              names.push({ team_id: team._id, teamName: team.name, memberName: name, memberId: member.user_id });
            }
          }
        }
        setMembersNames(names);

        setIsLoading(false);
      })().catch((err) => console.log("ERROR", err));
    }
    console.log("TEAMS", teams);
  }, [teams]);

  useEffect(() => {
    updateTeamData();
    updateLaboratoriesData();
  }, [updateLaboratoriesData, updateTeamData]);

  return (
    <Fragment>
      <div className="page-header">
        <PageHeader title={`${[user.firstName, user.lastName].join(" ")} : Chef de laboratoire ${UserHelper.userHeadedLaboratories(user)}`} />
      </div>

      {teams.length > 0 ? (
        <PDFDownloadLink className="btn  btn-sm m-1  btn-outline-primary" document={<LabReport user={user} teams={Teams} tHNames={tHNames} membersNames={membersNames} />} fileName={`${[user.firstName, user.lastName].join(" ")}` + `.pdf`}>
          {({ blob, url, loading, error }) => (loading ? "Chargement du document..." : "Imprimer le rapport")}
        </PDFDownloadLink>
      ) : (
        "Vous possédez aucune équipe"
      )}
      {console.log("TEAAAMS", tHNames)}
      {!isLoading &&
        tHNames.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-header">
              <h3 className="card-title">{`EQUIPE ${index + 1} : ${item.teamName}`}</h3>
            </div>
            <div className="card-header">{item.headName === null ? "Votre équipe n'a pas de chef d'équipe" : <h2 className="card-title">{`Chef d'équipe : ${item.headName}`}</h2>}</div>
            {membersNames.length > 0 ? (
              <div className="table-responsive">
                <table className="table card-table table-vcenter text-nowrap datatable">
                  <thead>
                    <tr>
                      <th className="text-center">Nom</th>
                      <th className="text-center">Rôle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {membersNames
                      .filter((mem) => mem.team_id === item.team_id)
                      .map((member, index) => (
                        <tr style={{ whiteSpace: "break-spaces " }} key={index}>
                          <td>{member.memberName}</td>
                          <td className="text-center">CHERCHEUR</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              "Vous n'avez aucun membre dans cette équipe"
            )}
          </div>
        ))}
    </Fragment>
  );
};

export default LabTree;

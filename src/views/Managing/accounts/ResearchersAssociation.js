import React, { useState, useContext, useEffect } from "react";
import PageHeader from "../../_common/_components/PageHeader";

import { AppContext } from "../../../context/AppContext";
import UserPicture from "../../_common/_components/UserPicture";
import { Link } from "react-router-dom";
const ResearchersAssociation = () => {
  const { user, ApiServices, UserHelper } = useContext(AppContext);
  const { userService, teamService } = ApiServices;

  const [researchers, setResearchers] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    updateData();
  }, []);

  const updateData = () => {
    userService.getResearchers().then((response) => {
      setResearchers(response.data);
    });
    teamService.findAllTeams().then((response) => {
      const filteredLaboratoiresIds = user.laboratoriesHeaded.map(
        ({ _id }) => _id
      );
      const filteredTeams = response.data.filter(
        (team) => filteredLaboratoiresIds.indexOf(team.laboratory_id) !== -1
      );
      setTeams(filteredTeams);
    });
  };

  const addToTeam = (team_id) => (user_id) => {
    teamService.addUserToTeam(team_id, user_id).then((response) => {
      updateData();
    });
  };

  const removeFromTeam = (team_id) => (user_id) => {
    teamService.removeFromTeam(team_id, user_id).then((response) => {
      updateData();
    });
  };

  const makeAsTeamHead = (team_id) => (user_id) => {
    teamService.associateHeadToTeam(team_id, user_id).then((response) => {
      updateData();
    });
  };

  return (
    <div className="container">
      <PageHeader
        title={`Équipes de votre laboratoire ${UserHelper.userHeadedLaboratories(
          user
        )}`}
        subTitle={`${teams.length} équipe(s)`}
      />
      <div className="row">
        {teams.map((team) => (
          <TeamBox
            addToTeam={addToTeam(team._id)}
            removeFromTeam={removeFromTeam(team._id)}
            makeAsTeamHead={makeAsTeamHead(team._id)}
            team={team}
            researchers={researchers}
          />
        ))}
      </div>
    </div>
  );
};

export default ResearchersAssociation;

const TeamBox = ({
  researchers,
  team,
  addToTeam,
  removeFromTeam,
  makeAsTeamHead,
}) => {
  const [selectedResearcher, setSelectedResearcher] = useState(null);

  const handleSelectedResearcherChange = (event) => {
    event.persist();
    setSelectedResearcher(event.target.value);
  };

  const handSubmit = (event) => {
    event.preventDefault();
    addToTeam(selectedResearcher);
  };
  return (
    <div className="col-md-6">
      <div className="card">
        <div className="card-header d-block">
          <h3 className="card-title ">{team.abbreviation}</h3>
          <div className=" text-muted text-4">{team.name}</div>
        </div>
        {team.members.length > 0 && (
          <div className="card-body">
            <div className="row mb-n3">
              {team.members.map((user) => (
                <div className="col-6 row row-sm mb-3 align-items-center">
                  <UserPicture user={user} />
                  <div className="col text-truncate">
                    <Link
                      to={`/profile/${user._id}`}
                      className="text-body d-block text-truncate"
                    >
                      {`${user.firstName} ${user.lastName}`}
                    </Link>

                    <small className="d-block text-muted text-truncate mt-n1">
                      <Link
                        onClick={() => {
                          removeFromTeam(user._id);
                        }}
                        className="text-body d-block text-truncate"
                      >
                        Retirer
                      </Link>
                      {team.head_id === user._id && (
                        <span className="badge bg-primary">chef d'équipe</span>
                      )}
                      {team.head_id !== user._id && (
                        <Link
                          onClick={() => {
                            makeAsTeamHead(user._id);
                          }}
                          className="text-body d-block text-truncate"
                        >
                          Mettre comme chef d'équipe
                        </Link>
                      )}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="card-body">
          <form onSubmit={handSubmit}>
            <label className="form-label m-2">Ajouter un chercher</label>

            <select
              required
              name="selectedResearcher"
              onChange={handleSelectedResearcherChange}
              value={selectedResearcher}
              className="form-control p-1"
            >
              <option selected disabled>
                Sélectionner ici un chercher
              </option>
              {researchers.map(({ firstName, lastName, _id }, index) => (
                <option value={_id} key={_id}>
                  {`${firstName} ${lastName}`}
                </option>
              ))}
            </select>
            <div className="d-flex mt-2">
              <button type="submit" className="btn btn-primary ml-auto">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

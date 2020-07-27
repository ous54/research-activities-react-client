import React, { useState, useContext, useEffect, useCallback } from "react";

import { AppContext } from "../../context/AppContext";
import PageHeader from "../components/PageHeader";
import UserListItem from "../Author/components/UserListItem";
import Loader from "../components/Loader";
import { useParams, Link } from "react-router-dom";
import UserPicture from "../components/UserPicture";

const Team = () => {
  const { teamId } = useParams();
  const { ApiServices } = useContext(AppContext);
  const { userService, teamService } = ApiServices;

  const [researchers, setResearchers] = useState([]);
  const [team, setTeam] = useState(null);

  const updateData = useCallback(() => {
    userService.getResearchers().then((response) => {
      setResearchers(response.data);
    });

    teamService.findTeam(teamId).then((response) => {
      setTeam(response.data);
    });
  }, [teamId, teamService, userService]);

  useEffect(() => {
    updateData();
  }, [updateData]);

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
    console.log(team_id, user_id);
    teamService.associateHeadToTeam(team_id, user_id).then((response) => {
      updateData();
    });
  };

  return (
    <div className="container">
      <PageHeader
        title={team ? `laboratoire ${team.abbreviation}` : ""}
        subTitle={team ? team.name : ""}
      />
      <div className="row">
        <div className="col-md-8">
          {team == null && <Loader size="60" />}

          {team != null && (
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 p-2 d-flex align-items-center">
                    <span className="bg-blue text-white stamp mr-1 p-1">
                      {team.university.abbreviation}
                    </span>
                    <div className=" lh-sm">
                      <div className="strong">{team.university.name}</div>
                      <div className="text-muted">{team.university.city}</div>
                    </div>
                  </div>

                  <div className="col-md-6  p-2 d-flex align-items-center">
                    <span className="bg-blue text-white stamp mr-1 p-1">
                      {team.laboratory.abbreviation}
                    </span>
                    <div className=" lh-sm">
                      <div className="strong">{team.laboratory.name}</div>
                      <div className="text-muted">
                        {team.establishment.abbreviation}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {team != null && (
            <TeamBox
              addToTeam={addToTeam(team._id)}
              removeFromTeam={removeFromTeam(team._id)}
              makeAsTeamHead={makeAsTeamHead(team._id)}
              team={team}
              researchers={researchers}
            />
          )}
        </div>

        <div className="col-md-4">
          {team != null && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Chef d'équipe</h3>
              </div>
              <div className="card-body p-0">
                <div className="list list-row list-hoverable">
                  {team.teamHead != null && (
                    <UserListItem
                      user={team.teamHead}
                      subTitle={`Chef d'équipe ${team.abbreviation}`}
                    />
                  )}
                  {team.teamHead == null && (
                    <div className="list-item ">
                      <small className=" text-center  text-muted text-truncate mt-n1">
                        Pas encore assassiné
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {team != null &&
            team.head_history != null &&
            team.head_history.length > 0 && (
              <div className="card ">
                <div className="card-header">
                  <h3 className="card-title">Historique</h3>
                </div>
                <div className="card-body p-0">
                  <div
                    style={{ maxHeight: "300px" }}
                    className="list overflow-auto list-row list-hoverable"
                  >
                    {team.head_history
                      .slice(0)
                      .reverse()
                      .map(({ head, start, end }) => (
                        <UserListItem
                          user={head}
                          subTitle={`Chef depuis ${start}  ${
                            end ? "vers " + end : ""
                          }`}
                        />
                      ))}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Team;

const TeamBox = ({
  researchers,
  team,
  addToTeam,
  removeFromTeam,
  makeAsTeamHead,
}) => {
  const [selectedResearcher, setSelectedResearcher] = useState(null);
  const { user } = useContext(AppContext);

  const handleSelectedResearcherChange = (event) => {
    event.persist();
    setSelectedResearcher(event.target.value);
  };

  const handSubmit = (event) => {
    event.preventDefault();
    addToTeam(selectedResearcher);
  };
  return (
    <div className="card">
      <div className="card-header d-block">
        <h3 className="card-title ">Membres</h3>
        <div className=" text-muted m-0">{team.members.length} Chercheurs</div>
      </div>
      {team.members.length > 0 && (
        <div className="card-body">
          <div className="row mb-n3">
            {team.members.map((member, index) => (
              <div
                key={index}
                className="col-6 row row-sm mb-3 align-items-center"
              >
                <UserPicture user={member} />
                <div className="col text-truncate">
                  <Link
                    to={`/profile/${member._id}`}
                    className="text-body d-block text-truncate"
                  >
                    {`${member.firstName} ${member.lastName}`}
                  </Link>

                  <small className="d-block text-muted text-truncate mt-n1">
                    <button
                      onClick={() => {
                        removeFromTeam(member._id);
                      }}
                      className="btn-sm p-0 btn text-small d-block text-truncate"
                    >
                      Retirer
                    </button>
                    {team.head_id === member._id && (
                      <span className="badge bg-primary">Chef d'équipe</span>
                    )}
                    {team.head_id !== member._id && user.role !== "TEAM_HEAD" && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          makeAsTeamHead(member._id);
                        }}
                        className="btn-sm p-0 btn text-small d-block text-truncate"
                      >
                        Mettre comme Chef d'équipe
                      </button>
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
  );
};

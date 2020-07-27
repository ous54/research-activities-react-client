import React, { useContext } from "react";

import image from "../../assets/images/illustrations/undraw_people_search_wctu.svg";
import { Link } from "react-router-dom";
import { LoopIcon, SettingsIcon } from "../components/icons";
import { AppContext } from "../../context/AppContext";

const HomePage = () => {
  const { user, UserHelper } = useContext(AppContext);

  return (
    <div className="row">
      <div
        className={`empty container text-center${
          user.role === "TEAM_HEAD" ? "col-md-6" : "12"
        }`}
      >
        <div className="empty-icon">
          <img src={image} className="h-8 mb-4" alt="" />
        </div>
        <p className="empty-title h3">Bienvenue sur la page d'accueil </p>
        <p className="empty-subtitle text-muted">
          Essayez de utiliser la barre de recherche pour trouver l'auteur que
          vous recherchez.
        </p>
        <div className="empty-action">
          <Link to="/" className="btn btn-primary">
            <LoopIcon />
            Rechercher un auteur
          </Link>
        </div>
      </div>

      {user.role === "TEAM_HEAD" && (
        <div className="empty col-md-6">
          <div className="empty-icon">
            <img src={image} className="h-8 mb-4" alt="" />
          </div>
          <p className="empty-title h3">
            Etant {UserHelper.userShortBio(user)}{" "}
          </p>
          <p className="empty-subtitle text-muted">
            vous pouvez gerer cette equipe
          </p>
          {user.teamsHeaded.map(({ abbreviation, _id }) => (
            <div className="empty-action">
              <Link to={`/team/${_id}`} className="btn btn-primary">
                <SettingsIcon />
                Gérer votre equipe {abbreviation}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

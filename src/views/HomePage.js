import React from "react";

import image from "../assets/images/illustrations/undraw_people_search_wctu.svg";
import { Link } from "react-router-dom";
import { LoopIcon } from "./_common/_components/icons";

const HomePage = () => {
  return (
    <div className="empty">
      <div className="empty-icon">
        <img src={image} className="h-8 mb-4" alt="" />
      </div>
      <p className="empty-title h3">Bienvenue sur la page d'accueil </p>
      <p className="empty-subtitle text-muted">
        Essayez de utiliser la barre de recherche pour trouver l'auteur que vous
        recherchez.
      </p>
      <div className="empty-action">
        <Link to="/home" className="btn btn-primary">
          <LoopIcon />
          Rechercher un auteur
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

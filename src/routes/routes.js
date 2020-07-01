import Author from "../views/Author/Author";
import AuthorSearch from "../views/Author/AuthorSearch";
import HomePage from "../views/HomePage";
import NotFoundPage from "../views/NotFoundPage";

import University from "../views/Managing/entities/University";
import Schools from "../views/Managing/entities/Schools";
import Laboratories from "../views/Managing/entities/Laboratories";
import Teams from "../views/Managing/entities/Teams";

import AccountSettings from "../views/Settings/AccountSettings";
import LaboratoryHeads from "../views/Managing/accounts/LaboratoryHeads";
import Researchers from "../views/Managing/accounts/Researchers";
import { default as LHAssociation } from "../views/Managing/accounts/LaboratoryHeadsAssociation";
import { default as RAssociation } from "../views/Managing/accounts/ResearchersAssociation";
import FollowedResearchers from "../views/Managing/accounts/FollowedResearchers";
import Statistics from "../views/Statistics/Statistics";

import {
  HomeIcon,
  StatisticsIcon,
  UserCheckIcon,
  TeamIcon,
  SettingsIcon,
} from "../views/_common/_components/icons";
import Profile from "../views/Profile";

const allRoles = ["ADMIN", "CED_HEAD", "LABORATORY_HEAD", "RESEARCHER"];

const entitiesPathsCategory = {
  title: "Entités",
  isDropdown: true,
  icon: SettingsIcon,
  routes: [
    {
      title: "Université",
      path: "/university",
      component: University,
      roles: ["ADMIN", "CED_HEAD"],
      inMenu: true,
    },
    {
      title: "Écoles",
      path: "/schools",
      component: Schools,
      roles: ["ADMIN", "CED_HEAD"],
      inMenu: true,
    },
    {
      title: "Laboratoires",
      path: "/laboratories",
      component: Laboratories,
      roles: ["ADMIN", "CED_HEAD"],
      inMenu: true,
    },
    {
      title: "Équipes",
      path: "/teams",
      component: Teams,
      roles: ["ADMIN", "LABORATORY_HEAD"],
      inMenu: true,
    },
  ],
};

const accountsManagementPathsCategory = {
  title: "Gestion des comptes",
  isDropdown: true,
  icon: TeamIcon,
  routes: [
    {
      title: "Chefs de Laboratoires",
      path: "/laboratory-heads",
      component: LaboratoryHeads,
      roles: ["ADMIN", "CED_HEAD"],
      inMenu: true,
    },
    {
      title: "Chercheurs",
      path: "/researchers",
      component: Researchers,
      roles: ["ADMIN", "LABORATORY_HEAD"],
      inMenu: true,
    },
    {
      title: "Association entre Chefs et Laboratoires",
      path: "/laboratory-heads-association",
      component: LHAssociation,
      roles: ["ADMIN", "CED_HEAD"],
      inMenu: true,
    },
    {
      title: "researchers-association",
      path: "/researchers-association",
      component: RAssociation,
      roles: ["ADMIN", "LABORATORY_HEAD"],
      inMenu: true,
    },
  ],
};

const StatisticsPaths = {
  title: "Statistiques",
  isDropdown: false,
  icon: StatisticsIcon,
  routes: [
    {
      title: "Statistiques",
      path: "/statistics",
      component: Statistics,
      icon: StatisticsIcon,
      inMenu: true,
      roles: ["LABORATORY_HEAD"],
    },
  ],
};

const followedResearchersPaths = {
  title: "Chercheur suivis",
  isDropdown: false,
  routes: [
    {
      title: "Chercheur suivis",
      path: "/followed-researchers",
      component: FollowedResearchers,
      icon: UserCheckIcon,
      roles: ["LABORATORY_HEAD"],
      inMenu: true,
    },
  ],
};
const communPathsCategory = {
  isDropdown: false,
  routes: [
    {
      title: "Accueil",
      path: "/home",
      component: HomePage,
      icon: HomeIcon,
      inMenu: true,
      roles: allRoles,
    },
    {
      title: "Profile",
      path: "/Profile/:id",
      component: Profile,
      inMenu: false,
      roles: allRoles,
    },
    {
      title: "Compte",
      path: "/account",
      component: AccountSettings,
      inMenu: false,
      roles: allRoles,
    },
  ],
};

const authorPathsCategory = {
  isDropdown: false,
  inMenu: false,
  routes: [
    {
      title: "Auteur",
      path: "/author/:scholarId",
      component: Author,
      inMenu: false,
      roles: allRoles,
    },
    {
      title: "Recherche d'auteur",
      path: "/author-search/:authorName",
      component: AuthorSearch,
      inMenu: false,
      roles: allRoles,
    },
  ],
};

const errorPathsCategory = {
  title: "Errors",
  isDropdown: false,
  routes: [
    {
      title: "Errors",
      path: "/*",
      component: NotFoundPage,
      inMenu: false,
      roles: allRoles,
    },
  ],
};

const menus = [
  communPathsCategory,
  authorPathsCategory,
  entitiesPathsCategory,
  accountsManagementPathsCategory,
  followedResearchersPaths,
  StatisticsPaths,
  errorPathsCategory,
];

const routes = [
  ...communPathsCategory.routes,
  ...authorPathsCategory.routes,
  ...entitiesPathsCategory.routes,
  ...accountsManagementPathsCategory.routes,
  ...followedResearchersPaths.routes,
  ...StatisticsPaths.routes,
  ...errorPathsCategory.routes,
];

export { routes, menus };

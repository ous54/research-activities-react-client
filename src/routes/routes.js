import Author from "../views/Author/Author";
import AuthorSearch from "../views/Author/AuthorSearch";
import HomePage from "../views/HomePage/HomePage";
import PageNotFound from "../views/components/PageNotFound";

import University from "../views/ManagingEntities/University";
import Establishments from "../views/ManagingEntities/Establishments";
import Laboratories from "../views/ManagingEntities/Laboratories";
import Teams from "../views/ManagingEntities/Teams";
import AccountSettings from "../views/Settings/AccountSettings";
import LaboratoryHeads from "../views/ManagingAccounts/LaboratoryHeads";
import Researchers from "../views/ManagingAccounts/Researchers";
import FollowedResearchers from "../views/ManagingAccounts/FollowedResearchers";
import Statistics from "../views/Statistics/Statistics";
import Profile from "../views/Profile/Profile";
import Team from "../views/ManagingEntities/Team";
import Laboratory from "../views/ManagingEntities/Laboratory";
import LabTree from "../views/ManagingEntities/LabTree";


import {
  HomeIcon,
  StatisticsIcon,
  UserCheckIcon,
  TeamIcon,
  SettingsIcon,
} from "../views/components/icons";


const allRoles = [
  "CED_HEAD",
  "CED_HEAD",
  "TEAM_HEAD",
  "LABORATORY_HEAD",
  "RESEARCHER",
];

const entitiesPathsCategory = {
  title: "Entités",
  isDropdown: true,
  icon: SettingsIcon,
  routes: [
    {
      title: "Université",
      path: "/university",
      component: University,
      roles: ["CED_HEAD", "CED_HEAD"],
      inMenu: true,
    },
    {
      title: "Établissements",
      path: "/establishments",
      component: Establishments,
      roles: ["CED_HEAD", "CED_HEAD"],
      inMenu: true,
    },
    {
      title: "Laboratoires",
      path: "/laboratories",
      component: Laboratories,
      roles: ["CED_HEAD", "CED_HEAD"],
      inMenu: true,
    },
    {
      title: "Équipes",
      path: "/teams",
      component: Teams,
      roles: ["LABORATORY_HEAD"],
      inMenu: true,
    },
    {
      title: "arborescence",
      path: "/labTree",
      component: LabTree,
      inMenu: false,
      roles: ["LABORATORY_HEAD"],
    },
    {
      title: "Équipe",
      path: "/team/:teamId",
      component: Team,
      roles: ["CED_HEAD", "LABORATORY_HEAD", "TEAM_HEAD"],
      inMenu: false,
    },
    {
      title: "Laboratoire",
      path: "/Laboratory/:laboratoryId",
      component: Laboratory,
      roles: ["CED_HEAD", "CED_HEAD"],
      inMenu: false,
    },
  ],
};

const accountsManagementPathsCategory = {
  title: "Gestion des comptes",
  isDropdown: false,
  routes: [
    {
      title: "Comptes chefs des Laboratoires",
      path: "/laboratory-heads",
      component: LaboratoryHeads,
      roles: ["CED_HEAD"],
      icon: TeamIcon,
      inMenu: true,
    },
    {
      title: "Comptes chercheurs",
      path: "/researchers",
      component: Researchers,
      roles: ["LABORATORY_HEAD"],
      icon: TeamIcon,
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
      roles: ["LABORATORY_HEAD"],
      inMenu: true,
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
      path: "/",
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
      component: PageNotFound,
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

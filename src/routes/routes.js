import Author from "../views/Author/Author";
import HomePage from "../views/HomePage";
import NotFoundPage from "../views/NotFoundPage";

import Universities from "../views/Managing/entities/Universities";
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

const routes = [
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/settings/account",
    component: AccountSettings,
  },
  {
    path: "/author/:authorName",
    component: Author,
  },
  {
    path: "/universities",
    component: Universities,
    role: ["CED_HEAD"],
  },
  {
    path: "/schools",
    component: Schools,
    role: ["CED_HEAD"],
  },
  {
    path: "/laboratories",
    component: Laboratories,
    role: ["CED_HEAD"],
  },
  {
    path: "/teams",
    component: Teams,
    role: ["LABORATORY_HEAD"],
  },
  {
    path: "/laboratory-heads",
    component: LaboratoryHeads,
    role: ["CED_HEAD"],
  },
  {
    path: "/researchers",
    component: Researchers,
    role: ["LABORATORY_HEAD"],
  },
  {
    path: "/laboratory-heads-association",
    component: LHAssociation,
    role: ["CED_HEAD"],
  },
  {
    path: "/followed-researchers",
    component: FollowedResearchers,
    role: ["CED_HEAD"],
  },
  {
    path: "/researchers-association",
    component: RAssociation,
    role: ["LABORATORY_HEAD"],
  },
  {
    path: "/statistics",
    component: Statistics,
  },
  {
    path: "/*",
    component: NotFoundPage,
  },
];

export default routes;

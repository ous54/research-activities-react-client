import {
  SettingsIcon,
  HomeIcon,
  TeamIcon,
  ConfigurationIcon,
  StatistiquesIcon,
} from "../_components/icons";

const CED_HEAD_MENUS = [
  {
    title: "Accueil",
    isDropdown: false,
    icon: HomeIcon,
    link: "/home",
  },
  {
    title: "Entités",
    isDropdown: true,
    icon: ConfigurationIcon,
    subMenus: [
      { title: "Universités", link: "/universities" },
      { title: "Ecoles", link: "/schools" },
      { title: "Laboratoires", link: "/laboratories" },
    ],
  },
  {
    title: "Chefs de Laboratoires",
    isDropdown: true,
    icon: TeamIcon,
    subMenus: [
      { title: "Creation des comptes", link: "/laboratory-heads" },
      {
        title: "Associer les chefs des Laboratoires",
        link: "/laboratory-heads-association",
      },
    ],
  },
  {
    title: "Chercheurs suivis",
    isDropdown: false,
    icon: TeamIcon,
    link: "/followed-researchers",
  },
  {
    title: "Statistiques",
    isDropdown: false,
    icon: StatistiquesIcon,
    link: "/statistics",
  },
];

const LABORATORY_HEAD_MENUS = [
  {
    title: "Accueil",
    isDropdown: false,
    icon: HomeIcon,
    link: "/home",
  },
  {
    title: "Entités",
    isDropdown: true,
    icon: ConfigurationIcon,
    subMenus: [{ title: "Équipes", link: "/teams" }],
  },
  {
    title: "Chercheurs",
    isDropdown: true,
    icon: TeamIcon,
    subMenus: [
      { title: "Creation des comptes", link: "/researchers" },
      {
        title: "Associer les researchers",
        link: "/researchers-association",
      },
    ],
  },
  {
    title: "Statistiques",
    isDropdown: false,
    icon: StatistiquesIcon,
    link: "/statistics",
  },
];

const SEARCHER_MENUS = [
  {
    title: "Accueil",
    isDropdown: false,
    icon: HomeIcon,
    link: "/home",
  },
  {
    title: "Laboratoire",
    isDropdown: false,
    icon: HomeIcon,
    link: "/home",
  },
  {
    title: "Équipes",
    isDropdown: false,
    icon: HomeIcon,
    link: "/home",
  },
  {
    title: "Statistiques",
    isDropdown: false,
    icon: StatistiquesIcon,
    link: "/statistics",
  },
];

export { CED_HEAD_MENUS, LABORATORY_HEAD_MENUS, SEARCHER_MENUS };

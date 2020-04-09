import {
  SettingsIcon,
  HomeIcon,
  TeamIcon,
  ConfigurationIcon,
} from "../icons/icons";

const CED_HEAD_MENUS = [
  {
    title: "Accueil",
    isDropdown: false,
    icon: HomeIcon,
    link: "/home",
  },
  {
    title: "Gestion",
    isDropdown: true,
    icon: ConfigurationIcon,
    subMenus: [
      { title: "Universités", link: "/universities" },
      { title: "Ecoles", link: "/schools" },
      { title: "Laboratoires", link: "/laboratories" },
      { title: "Chefs de Laboratoires", link: "/laboratory-heads" },
      {
        title: "Associer les chefs des Laboratoires",
        link: "/laboratory-heads-association",
      },
    ],
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
    title: "Gestion",
    isDropdown: true,
    icon: ConfigurationIcon,
    subMenus: [
      {
        title: "Creation des chercheurs ",
        link: "/teams-researchers-association",
      },
      { title: "Ecoles", link: "/schools" },
    ],
  },
  {
    title: "Equipes de laboratoire",
    isDropdown: true,
    icon: TeamIcon,
    subMenus: [
      {
        title: "Gestion des équipes du laboratoire",
        link: "/laboratory-heads",
      },
      {
        title: "Ajouter des chercheurs ",
        link: "/teams-researchers-association",
      },
    ],
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
    title: "Gestion",
    isDropdown: true,
    icon: SettingsIcon,
    subMenus: [
      { title: "Universités", link: "/universities" },
      { title: "Ecoles", link: "/schools" },
      { title: "Laboratoires", link: "/laboratories" },
      { title: "Chefs de Laboratoires", link: "/laboratory-heads" },
    ],
  },
];

export { CED_HEAD_MENUS, LABORATORY_HEAD_MENUS, SEARCHER_MENUS };

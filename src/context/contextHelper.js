const userShortBio = ({ laboratoriesHeaded, teamsMemberships, ...user }) => {
  if (user.role === "CED_HEAD") return `chef de CED`;

  const laboratoriesHeadedString = laboratoriesHeaded
    .map(({ abbreviation }) => `chef de laboratoire ${abbreviation}`)
    .join(" , ");

  const teamsMembershipsString = teamsMemberships
    .map(({ abbreviation }) => `membre de l'équipe ${abbreviation}`)
    .join(" , ");

  if (laboratoriesHeadedString.length && teamsMembershipsString)
    return `${laboratoriesHeadedString} et ${teamsMembershipsString}`;

  if (laboratoriesHeadedString.length) return `${laboratoriesHeadedString}`;

  if (teamsMembershipsString.length) return `${teamsMembershipsString}`;

  return `Chercheur`;
};

const userHeadedLaboratories = ({ laboratoriesHeaded }) =>
  laboratoriesHeaded.map(({ name, abbreviation }) => abbreviation).join(" , ");

const UserHelper = {
  userShortBio,
  userHeadedLaboratories,
};

export { UserHelper };

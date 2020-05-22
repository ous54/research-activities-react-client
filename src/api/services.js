const makeAuthentificationService = (api) => ({
  signup: (user) => api.post(`/signup`, user),
  login: (user) => api.post(`/login`, user),
});

const makeScraperService = (api) => ({
  authorSearch: (authorName) => api.get(`/author-search/${authorName}`),
  getAuthorData: (scholarId) => api.get(`/author/${scholarId}`),
  getPublicationData: (publicationName) =>
    api.get(`/publication/${publicationName}`),
  getPublicationDetails: (scholarId, publicationName) =>
    api.get(`/publication-details/${scholarId}/${publicationName}`),
});

const makeUserService = (api) => ({
  createUser: (user) => api.post(`/users`, user),
  updateUser: (user) => api.put(`/users`, user),
  findUser: (_id) => api.get(`/users/${_id}`),
  findAllUsers: () => api.get(`/users`),
  deleteUser: (_id) => api.delete(`/users/${_id}`),
  updatePassword: (_id, passwords) =>
    api.post(`/users/${_id}/update-password`, passwords),
  updateProfilePicture: (formData) =>
    api.post(`/upload-profile-picture`, formData),
  getLaboratoryHeads: () => api.get(`/laboratory-heads`),
  getResearchers: () => api.get(`/researchers`),
  followUser: (user) => api.post(`/follow`, user),
  unfollowUser: (_id) => api.get(`/unfollow/${_id}`),
  isFollowing: (name) => api.get(`/is-following/${name}`),
  getFollowedUsers: (filter) => api.get(`/followed-users`, { params: filter }),
  getFilteringOptions: () => api.get(`/filtering-options`),
});

const makeUniversityService = (api) => ({
  createUniversity: (university) => api.post(`/universities`, university),
  updateUniversity: (university) => api.put(`/universities`, university),
  findUniversity: (_id) => api.get(`/universities/${_id}`),
  findAllUniversities: () => api.get(`/universities`),
  deleteUniversity: (_id) => api.delete(`/universities/${_id}`),
  getUniversitySchools: (_id) => api.get(`/universities/${_id}/schools`),
});

const makeSchoolService = (api) => ({
  createSchool: (school) => api.post(`/schools`, school),
  updateSchool: (school) => api.put(`/schools`, school),
  findSchool: (_id) => api.get(`/schools/${_id}`),
  findAllSchools: () => api.get(`/schools`),
  deleteSchool: (_id) => api.delete(`/schools/${_id}`),
  getSchoolLaboratories: (_id) => api.get(`/schools/${_id}/laboratories`),
});

const makeLaboratoryService = (api) => ({
  createLaboratory: (laboratory) => api.post(`/laboratories`, laboratory),
  updateLaboratory: (laboratory) => api.put(`/laboratories`, laboratory),
  findLaboratory: (_id) => api.get(`/laboratories/${_id}`),
  findAllLaboratories: () => api.get(`/laboratories`),
  deleteLaboratory: (_id) => api.delete(`/laboratories/${_id}`),
  getTeamsOfLaboratory: (_id) => api.get(`/laboratories/${_id}/teams`),
  getLaboratoryOfHead: (head_id) => api.get(`/laboratories-of-head/${head_id}`),
  getFreeLaboratories: () => api.get(`/free-laboratories`),
  associateHeadToLaboratory: (head_id, lab_id) =>
    api.get(`/entitle-laboratory/${head_id}/${lab_id}`),
});

const makeTeamService = (api) => ({
  createTeam: (team) => api.post(`/teams`, team),
  updateTeam: (team) => api.put(`/teams`, team),
  findAllTeams: () => api.get(`/teams`),
  findTeam: (_id) => api.get(`/teams/${_id}`),
  deleteTeam: (_id) => api.delete(`/teams/${_id}`),
  addUserToTeam: (team_id, user_id) =>
    api.get(`/add-to-team/${team_id}/${user_id}`),
  removeFromTeam: (team_id, user_id) =>
    api.get(`/remove-from-team/${team_id}/${user_id}`),
});

const makeStatisticsService = (api) => ({
  getStatistics: (filter) => api.get(`/statistics`, { params: filter }),
});

export {
  makeUserService,
  makeUniversityService,
  makeSchoolService,
  makeLaboratoryService,
  makeTeamService,
  makeScraperService,
  makeAuthentificationService,
  makeStatisticsService,
};

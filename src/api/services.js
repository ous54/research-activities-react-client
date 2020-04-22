const makeAuthentificationService = (api) => ({
  signup: (user) => api.post(`/signup`, user),
  login: (user) => api.post(`/login`, user),
});

const makeAuthorService = (api) => ({
  getAuthorByName: (authorName) => api.get(`/authors/${authorName}`),
});

const makeUserService = (api) => ({
  createUser: (user) => api.post(`/user`, user),
  updateUser: (user) => api.put(`/user`, user),
  findUser: (_id) => api.get(`/user/${_id}`),
  findAllUsers: () => api.get(`/user`),
  deleteUser: (_id) => api.delete(`/user/${_id}`),
  updatePassword: (_id, passwords) =>
    api.post(`/user/${_id}/update-password`, passwords),
  getLabHeads: () => api.get(`/lab-heads`),
  followUser: (user) => api.post(`/follow`, user),
  unfollowUser: (_id) => api.get(`/unfollow/${_id}`),
  isFollowing: (name) => api.get(`/is-following/${name}`),
  getFollowedUsers: () => api.get(`/followed-users`),
});

const makeUniversityService = (api) => ({
  createUniversity: () => api.post(`/university`),
  updateUniversity: () => api.put(`/university`),
  findUniversity: (_id) => api.get(`/university/${_id}`),
  findAllUniversities: () => api.get(`/university`),
  deleteUniversity: (_id) => api.delete(`/university/${_id}`),
  getUniversitySchools: (_id) => api.get(`/university/${_id}/schools`),
});

const makeSchoolService = (api) => ({
  createSchool: (school) => api.post(`/school`, school),
  updateSchool: () => api.put(`/school`),
  findSchool: (_id) => api.get(`/school/${_id}`),
  findAllSchools: () => api.get(`/school`),
  deleteSchool: (_id) => api.delete(`/school/${_id}`),
  getSchoolLaboratories: (_id) => api.get(`/school/${_id}/laboratories`),
});

const makeLaboratoryService = (api) => ({
  createLaboratory: (laboratory) => api.post(`/laboratory`, laboratory),
  updateLaboratory: (laboratory) => api.put(`/laboratory`, laboratory),
  findLaboratory: (_id) => api.get(`/laboratory/${_id}`),
  findAllLaboratories: () => api.get(`/laboratory`),
  deleteLaboratory: (_id) => api.delete(`/laboratory/${_id}`),
  getTeamsOfLaboratory: (_id) => api.get(`/laboratory/${_id}/teams`),
  getLaboratoryOfHead: (head_id) => api.get(`/laboratory-of-head/${head_id}`),
  getFreeLaboratories: () => api.get(`/free-laboratories`),
  associateHeadToLaboratory: (head_id, lab_id) =>
    api.get(`/entitle-laboratory/${head_id}/${lab_id}`),
});

const makeTeamService = (api) => ({
  createTeam: (team) => api.post(`/team`, team),
  updateTeam: (team) => api.put(`/team`, team),
  findAllTeams: () => api.get(`/team`),
  findTeam: (_id) => api.get(`/team/${_id}`),
  deleteTeam: (_id) => api.delete(`/team/${_id}`),
  addUserToTeam: (team_id, user_id) =>
    api.get(`/add-to-team/${team_id}/${user_id}`),
  removeFromTeam: (team_id, user_id) =>
    api.get(`/remove-from-team/${team_id}/${user_id}`),
});

const makeStatisticsService = (api) => ({
  getPublicationsBetweenTwoDates: (start, end) =>
    api.get(`/statistics/?start=${start}&end=${end}`),
});

export {
  makeUserService,
  makeUniversityService,
  makeSchoolService,
  makeLaboratoryService,
  makeTeamService,
  makeAuthorService,
  makeAuthentificationService,
  makeStatisticsService,
};

/*




})


*/

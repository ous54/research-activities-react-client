/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    useState,
    useContext,
    useEffect,
    useCallback,
    Fragment,
  } from "react";
  
  import PageHeader from "../components/PageHeader";
  import { AppContext } from "../../context/AppContext";
  import { useParams } from "react-router-dom";
  import Loader from "../components/Loader";
  import UserListItem from "../Author/components/UserListItem";
  
  const Laboratory = () => {
    const { laboratoryId } = useParams();
  
    const [laboratoryHeads, setLaboratoryHeads] = useState([]);
    const [laboratory, setLaboratory] = useState(null);
    const [university, setUniversity] = useState(null);
    const [researchDirector, setResearchDirector] = useState(null);
    const [users, setUsers] = useState([]);
  
    const { ApiServices, alertService } = useContext(AppContext);
    const { pushAlert } = alertService;
    const { laboratoryService, userService, universityService } = ApiServices;
  
    const getLaboratoryData = useCallback(async () => {
      try {
        const response = await laboratoryService.findLaboratory(laboratoryId);
        if (response.data) setLaboratory(response.data);
        else setLaboratory(
            {_id: "5f215c04a4a9d11820be456f"
        ,name:"Laboratoire de Technologies de l'Information",
        abbreviation:"LTI",
        establishment_id: "5f215c04a4a9d11820be456e",
        head_id:"5f215c02a4a9d11820be453b",
        head_history:[]
    });
      } catch (error) {
        pushAlert({ message: "Incapable d'obtenir les données de laboratoire" });
      }
    }, [laboratoryId]);
  
    const getLaboratoryHeadsData = useCallback(async () => {
      try {
        const response = await userService.getLaboratoryHeads();
        if (response.data) setLaboratoryHeads(response.data);
        else throw Error();
      } catch (error) {
        pushAlert({
          message: "Incapable d'obtenir les données des chefs des laboratoires",
        });
      }
    }, []);

    const getUniversity = useCallback(async () => {
        try {
          const response = await universityService.findAllUniversities();
          if (response.data) setUniversity(response.data[0]);
          else throw Error();
        } catch (error) {
          pushAlert({
            message: "Incapable d'obtenir les données des chefs des laboratoires",
          });
        }
      }, []);


    const getResearchDirector = useCallback(async () => {
        try {
          const response = await universityService.getResearchDirector();
          if (response.data) setResearchDirector(response.data);
          else throw Error();
        } catch (error) {
          pushAlert({
            message: "Incapable d'obtenir les données des chefs des laboratoires",
          });
        }
      }, []);

      const getResearchers = useCallback(async () => {
          try{
              const response = await userService.findAllUsers();
              if(response.data) setUsers(response.data);
              else throw Error();
          }
          catch(error){
            pushAlert({
                message: "Incapable d'obtenir les données des chercheurs",
              });
            }
        
      }, []);
  
  
    const requestUpdate = useCallback(() => {
      getLaboratoryData();
      getLaboratoryHeadsData();
      getUniversity();
      getResearchDirector();
      getResearchers();
    }, [getLaboratoryData, getLaboratoryHeadsData, getUniversity, getResearchDirector, getResearchers]);
  
    useEffect(() => {
      requestUpdate();
    }, [requestUpdate]);
  
    const [newDirectorId, setNewDirectorId] = useState(null);
  
    const handleDirectorChange = (event) => {
      event.persist();
      setNewDirectorId((newDirectorId) => event.target.value);
    };
  
    const handelButtonClick = async (event) => {
      event.preventDefault();
      if (!newDirectorId) return;
      try {
        const response = await universityService.setResearchDirector(
          newDirectorId
        );
        if (response.data)
          pushAlert({
            message: "Le directeur de recherche a été changé avec succès.",
            type: "success",
          });
        else throw Error();
      } catch (error) {
        pushAlert({ message: "Erreur lors du changement de directeur de recherche." });
      } finally {
        requestUpdate();
      }
    };
  
    return (
      <div className="container">
        <PageHeader
          title="Gestion du compte directeur de recherche"
          subTitle="Directeur de recherche"
        />
        {university == null && <Loader size="60" />}
  
        <div className="row">
          <div className="col-md-8">
            {university != null && (
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-5 d-flex align-items-center">
                      <span className="bg-blue text-white stamp mr-1 p-1">
                        {university.abbreviation}
                      </span>
                      <div className=" lh-sm">
                        <div className="strong">{university.name}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {laboratory != null && (
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Directeur de recherche</h3>
                </div>
                <div className="card-body p-0">
                  <div className="list list-row list-hoverable">
                    {laboratory.laboratoryHead != null && (
                      <UserListItem
                        user={laboratory.laboratoryHead}
                        subTitle={`chef de laboratoire ${laboratory.abbreviation}`}
                      />
                    )}
                  </div>
                </div>
                {researchDirector != null && (
                    <ResearchDirector director = {researchDirector}/>
                )}
                <div className="p-4 pt-0 ">
                  <div className="form-label">
                    Sélectionner le directeur de recherche
                  </div>
                  <select className="form-select" onChange={handleDirectorChange}>
                    <option selected disabled>
                      Sélectionner ici le chef
                    </option>
                    {users.map((user) => (
                      <option
                        key={user._id}
                        value={user._id}
                        selected={user._id === researchDirector._id}
                      >
                        {user.firstName} {user.lastName}
                        
                      </option>
                    ))}
                  </select>
                  <div className="form-footer mt-2">
                    <button
                      onClick={handelButtonClick}
                      className="btn mt-0 btn-outline-primary btn-block "
                    >
                      {researchDirector
                        ? "Modifier le chef du laboratoire"
                        : "Sauvegarder"}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {laboratory != null &&
              laboratory.head_history != null &&
              laboratory.head_history.length > 0 && (
                <div className="card ">
                  <div className="card-header">
                    <h3 className="card-title">Historique</h3>
                  </div>
                  <div className="card-body p-0">
                    <div
                      style={{ maxHeight: "300px" }}
                      className="list overflow-auto list-row list-hoverable"
                    >
                      {laboratory.head_history
                        .slice(0)
                        .reverse()
                        .map(({ head, start, end }) => (
                          <UserListItem
                            user={head}
                            subTitle={`Chef depuis ${start}  ${
                              end ? "vers " + end : ""
                            }`}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  };
  
  const TeamsList = ({ teams }) => (
    <div className="list row list-hoverable  ">
      {teams.map((team, index) => (
        <TeamListItem key={index} team={team} />
      ))}
    </div>
  );
  
  const TeamListItem = ({ team }) => {
    return (
      <Fragment>
        <div className="m-3 d-flex align-items-center">
          <span className="bg-blue text-white stamp mr-1">
            {team.abbreviation}
          </span>
          <div className="mr-3 lh-sm">
            <div className="strong"> {team.name}</div>
            <div className="text-muted">
              {team.teamMemberShipCount.length}{" "}
              {team.teamMemberShipCount.length > 1 ? "Membres" : "Membre"}
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const ResearchDirector = ({ director }) => {
    return (
      <Fragment>
        <div className="m-3 d-flex align-items-center">
          <span className="stamp mr-1 px-3">
           {director.firstName} {director.lastName}
          </span>
          <div className="mr-3 lh-sm">
            <div className="strong">{director.email}</div>
          </div>
        </div>
      </Fragment>
    )};

  
  export default Laboratory;
  
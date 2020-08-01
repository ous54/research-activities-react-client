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
import "c3/c3.css";
import C3Chart from "react-c3js";

const Laboratory = () => {
  const { laboratoryId } = useParams();
  const [laboratoryHeads, setLaboratoryHeads] = useState([]);
  const [laboratory, setLaboratory] = useState(null);
  const [labMembers, setLabMembers] = useState(null);
  const [auth, setAuth] = useState( {
    
    indexes: [
      {
        "name": "Citations",
        "total": "81",
        "lastFiveYears": "80"
      },
      {
        "name": "indice h",
        "total": "5",
        "lastFiveYears": "5"
      },
      {
        "name": "indice i10",
        "total": "3",
        "lastFiveYears": "3"
      }
    ],
   
    citationsPerYear: [
      {
        "year": "2015",
        "citations": "1"
      },
      {
        "year": "2016",
        "citations": "16"
      },
      {
        "year": "2017",
        "citations": "30"
      },
      {
        "year": "2018",
        "citations": "14"
      },
      {
        "year": "2019",
        "citations": "11"
      },
      {
        "year": "2020",
        "citations": "8"
      }
    ]
  });  

  const { ApiServices } = useContext(AppContext);
  const { laboratoryService, userService, statisticsService } = ApiServices;


 
  const ListMembers =  useCallback((Laboratory) => {
    let members= [];
    let memberIds=[];
    let labMembers=[];
    Laboratory.teams.map(({teamMemberShipCount}) =>{
      console.log(teamMemberShipCount);
      Array.prototype.push.apply(members,teamMemberShipCount); 
  
  ;
     console.log(members);
    })
    console.log(members);
    members.map((member)=>
    {
      memberIds.push(member.user_id);
    }
    )
  
    console.log(memberIds);
    Promise.all(memberIds.map( async (id)=>{
      await userService.findUser(id).then((response)=>{
        labMembers.push({
          firstName : response.data.firstName,
          lastName :response.data.lastName
        });
      });
      
    }))
    console.log(labMembers);
  },[userService]
  );
    

  const getLaboratoryData = useCallback(() => {
    laboratoryService.findLaboratory(laboratoryId).then((response) => {
      setLaboratory(response.data);
      console.log(ListMembers(response.data));
    });
  }, [laboratoryId, laboratoryService, ListMembers]);

  const getStatistics = useCallback(() => {
    statisticsService.getStatistics().then((response) => {
      
      console.log((response.data));
    });
  }, [ statisticsService]);

 


  const getLaboratoryHeadsData = useCallback(() => {
    userService.getLaboratoryHeads().then((response) => {
      setLaboratoryHeads([]);
      setLaboratoryHeads(response.data);
      console.log(response.data);
      
    });
  }, [userService]);

  const requestUpdate = useCallback(() => {
    getLaboratoryData();
    getLaboratoryHeadsData();
    getStatistics();
  }, [getLaboratoryData, getLaboratoryHeadsData,getStatistics]);

 

  useEffect(() => {
    requestUpdate();
  }, [requestUpdate, auth]);

 

  const [newHeadId, setNewHeadId] = useState(null);

  const handleHeadChange = (event) => {
    event.persist();
    setNewHeadId((newHeadId) => event.target.value);
  };

  const handelButtonClick = async (event) => {
    event.preventDefault();
    if (!newHeadId) return;
    try {
      await laboratoryService
          .associateHeadToLaboratory(newHeadId, laboratory._id);
      requestUpdate();
    } catch (error) {
    }
  };
  

  return (
    <div className="container">
      <PageHeader
        title={laboratory ? `Laboratoire ${laboratory.abbreviation}` : ""}
        subTitle={laboratory ? laboratory.name : ""}
      />
      {laboratory == null && <Loader size="60" />}

      <div className="row">
        <div className="col-md-8">
          {laboratory != null && (
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-5 d-flex align-items-center">
                    <span className="bg-blue text-white stamp mr-1 p-1">
                      {laboratory.university.abbreviation}
                    </span>
                    <div className=" lh-sm">
                      <div className="strong">{laboratory.university.name}</div>
                      <div className="text-muted">
                        {laboratory.university.city}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7 d-flex align-items-center">
                    <span className="bg-blue text-white stamp mr-3 p-2">
                      {laboratory.establishment.abbreviation}
                    </span>
                    <div className=" lh-sm">
                      <div className="strong">
                        {laboratory.establishment.name}
                      </div>
                      <div className="text-muted">
                        {laboratory.establishment.address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {laboratory != null && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Équipes</h3>
              </div>
              <div className="card-body">
                {laboratory.teams != null && (
                  <TeamsList teams={laboratory.teams} />
                )}
              </div>
            </div>
          )}
          <AuthorCitations auth= {auth}/>
        </div>

        <div className="col-md-4">
          {laboratory != null && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Chef de laboratoire</h3>
              </div>
              <div className="card-body p-0">
                <div className="list list-row list-hoverable">
                  {laboratory.laboratoryHead != null && (
                    <UserListItem
                      user={laboratory.laboratoryHead}
                      subTitle={`chef de laboratoire ${laboratory.abbreviation}`}
                    />
                  )}
                  {laboratory.laboratoryHead == null && (
                    <div className="list-item ">
                      <small className=" text-center  text-muted text-truncate mt-n1">
                        Pas encore assassiné
                      </small>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 pt-0 ">
                <div className="form-label">
                  Sélectionner le chef de laboratoire
                </div>
                <select className="form-select" onChange={handleHeadChange}>
                  <option selected disabled>
                    Sélectionner ici le chef
                  </option>
                  {laboratoryHeads.map((laboratoryHead) => (
                    <option
                      key={laboratoryHead._id}
                      value={laboratoryHead._id}
                      selected={laboratoryHead._id === laboratory.id}
                    >
                      {laboratoryHead.hasConfirmed
                        ? laboratoryHead.firstName +
                          " " +
                          laboratoryHead.lastName
                        : laboratoryHead.email}
                    </option>
                  ))}
                </select>
                <div className="form-footer mt-2">
                  <button
                    onClick={handelButtonClick}
                    className="btn mt-0 btn-outline-primary btn-block "
                  >
                    {laboratory.head_id
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




const AuthorCitations = ({auth}) => {
  let chart = {
    title: "AuthorCitations",
    data: {
      columns: [],
      type: "bar",
      colors: {
        data1: "#467fcf",
      },
      names: {
        data1: "Citations",
      },
    },
    axis: {
      x: {
        type: "category",
        categories: [],
      },
    },
  };

  chart.data.columns[0] = ["data1"].concat(
    auth.citationsPerYear.slice(-5).map((a) => a.citations)
  );

  chart.axis.x.categories = auth.citationsPerYear
    .slice(-5)
    .map((a) => a.year);

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Citée par</h4>
      </div>
      <div className="table-responsive ">
        <table className="table table-hover table-outline   small text-muted card-table">
          <thead>
            <tr>
              <th></th>
              <th className="text-center">Toutes</th>
              <th className="text-center">
                Depuis {new Date().getFullYear() - 5}
              </th>
            </tr>
          </thead>
          <tbody>
            {auth.indexes.map(
              ({ name, total, lastFiveYears }, index) => (
                <tr key={index}>
                  <td>{name}</td>
                  <td className="text-center">{total}</td>
                  <td className="text-center">{lastFiveYears}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div className="card-body">
          <C3Chart
            data={chart.data}
            axis={chart.axis}
            legend={{
              show: false,
            }}
            padding={{
              bottom: 0,
              top: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};



export default Laboratory;

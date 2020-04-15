import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import Axios from "axios";
import PageHeader from "../../components/layout/PageHeader";
import ResearcherCard from "../../components/Managing/ResearcherCard";

const FollowedResearchers = (props) => {
  const [followedResearchers, setFollowedResearchers] = useState([]);

  const { user } = useContext(AuthContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + user.token,
  };

  useEffect(() => {
    Axios.get(process.env.REACT_APP_BACKEND_API_URL + "/api/followed-users", {
      headers,
    })
      .then((response) => {
        console.log(response.data);
        setFollowedResearchers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div class="container">
      <PageHeader
        title="Chercheurs suivis"
        subTitle={
          followedResearchers.length
            ? followedResearchers.length + " chercheurs"
            : ""
        }
      />

      <div class="row">
        {followedResearchers.map((researcher) => (
          <ResearcherCard researcher={researcher} />
        ))}
      </div>
    </div>
  );
};

export default FollowedResearchers;

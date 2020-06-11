import React, { useEffect, useContext, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import UserPicture from "./_common/_components/UserPicture";
import Publications from "./Author/_components/Publications";
import AuthorCitations from "./Author/_components/AuthorCitations";
import Coauthors from "./Author/_components/Coauthors";

const Profile = () => {
  const { id } = useParams();
  
  const [profileUser, setProfileUser] = useState(null);
  const { ApiServices, UserHelper } = useContext(AppContext);
  const { userService } = ApiServices;

  useEffect(() => {
    userService.findUser(id).then((response) => {
      setProfileUser(response.data);
    });
  }, []);

  return (
    <div className="container">
      {profileUser !== null && (
        <Fragment>
          <div className="row">
            <div className="col-md-4">
              <div class="card">
                <div class="card-body text-center">
                  <h2 class="mb-3">
                    {profileUser.firstName ? profileUser.firstName : ""}{" "}
                    {profileUser.lastName ? profileUser.lastName : ""}
                  </h2>
                  <p class="mb-4">
                    <div class="media">
                      <UserPicture user={profileUser} size="xl" />
                      <div class="media-body m-4">
                        <p class="text-muted mb-0">
                          {UserHelper.userShortBio(profileUser)}
                        </p>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              {profileUser.correspondingFollowedUser != null && ""}
            </div>
          </div>
          {profileUser.correspondingFollowedUser != null && (
            <div className="row">
              <div className="col-md-8">
                {profileUser.correspondingFollowedUser != null && (
                  <Fragment>
                    <Publications
                      author={profileUser.correspondingFollowedUser}
                    />
                  </Fragment>
                )}
              </div>
              <div className="col-md-4">
                <AuthorCitations
                  author={profileUser.correspondingFollowedUser}
                />
                <Coauthors author={profileUser.correspondingFollowedUser} />
              </div>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Profile;

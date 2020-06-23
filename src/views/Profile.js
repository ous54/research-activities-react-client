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
  const [correspondingFollowedUser, setCorrespondingFollowedUser] = useState(
    null
  );
  const { ApiServices, UserHelper } = useContext(AppContext);
  const { userService } = ApiServices;

  useEffect(() => {
    userService.findUser(id).then((response) => {
      setProfileUser(response.data);
      setCorrespondingFollowedUser(response.data.correspondingFollowedUser);
    });
  }, []);

  return (
    <div className="container">
      {profileUser !== null && (
        <Fragment>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="mb-3">
                    {profileUser.firstName ? profileUser.firstName : ""}{" "}
                    {profileUser.lastName ? profileUser.lastName : ""}
                  </h2>
                  <p className="mb-4">
                    <div className="media">
                      <UserPicture user={profileUser} size="xl" />
                      <div className="media-body m-4">
                        <p className="text-muted mb-0">
                          {UserHelper.userShortBio(profileUser)}
                        </p>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              {correspondingFollowedUser != null && ""}
            </div>
          </div>
          {correspondingFollowedUser != null && (
            <div className="row">
              <div className="col-md-8">
                {correspondingFollowedUser != null && (
                  <Fragment>
                    <Publications
                      author={correspondingFollowedUser}
                      setAuthor={setCorrespondingFollowedUser}
                    />
                  </Fragment>
                )}
              </div>
              <div className="col-md-4">
                <AuthorCitations author={correspondingFollowedUser} />
                <Coauthors author={correspondingFollowedUser} />
              </div>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Profile;

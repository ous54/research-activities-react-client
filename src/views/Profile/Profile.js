import React, { useEffect, useContext, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Publications from "../Author/components/Publications";
import AuthorCitations from "../Author/components/AuthorCitations";
import Coauthors from "../Author/components/Coauthors";
import ProfileHeader from "./components/ProfileHeader";

const Profile = () => {
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [correspondingFollowedUser, setCorrespondingFollowedUser] = useState(
    null
  );
  const { ApiServices } = useContext(AppContext);
  const { userService } = ApiServices;

  useEffect(() => {
    userService.findUser(id).then((response) => {
      setProfileUser(response.data);
      setCorrespondingFollowedUser(response.data.correspondingFollowedUser);
    });
  }, [id, userService]);

  return (
    <div className="container">
      {profileUser !== null && (
        <Fragment>
          {correspondingFollowedUser != null && (
            <div className="row">
              <div className="col-md-8">
                {correspondingFollowedUser != null && (
                  <Fragment>
                    <ProfileHeader
                      profile={{
                        ...correspondingFollowedUser,
                        ...profileUser,
                      }}
                    />
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

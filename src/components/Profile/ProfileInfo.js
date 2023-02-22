import React, { useState } from "react";
import classes from "./ProfileInfo.module.css";
import InfoContainer from "./InfoContainer";
import NameNavHeader from "./NameNavHeader";
import { useSelector } from "react-redux";
import PostList from "./PostList";
import EditProfile from "./EditProfile/EditProfile";

const ProfileInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const bannerPic = useSelector((state) => state.profileInfo.bannerPic);
  const profilePic = useSelector((state) => state.profileInfo.profilePic);

  const openEditProfileModal = () => {
    setIsEditing(true);
  }

  const closeEditProfileModal = () => {
    setIsEditing(false);
  }

  return (
    <>
    {isEditing && <EditProfile onClose={closeEditProfileModal}/>}
    <div className={classes.container}>
      <NameNavHeader />
      <div className={classes["banner-container"]}>
        <img src={bannerPic} alt="banner pic" />
      </div>
      <img src={profilePic} alt="Profile pic" className={classes['profile-pic']}/>
      <button className={classes['edit-button']} onClick={openEditProfileModal}>Edit profile</button>
      <InfoContainer />
      <PostList />
    </div>
    </>
  );
};

export default ProfileInfo;

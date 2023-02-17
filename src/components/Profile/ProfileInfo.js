import React from "react";
import classes from "./ProfileInfo.module.css";
import InfoContainer from "./InfoContainer";
import NameNavHeader from "./NameNavHeader";
import { useSelector } from "react-redux";
import PostList from "./PostList";

const ProfileInfo = () => {
  const bannerPic = useSelector((state) => state.profileInfo.bannerPic);
  const profilePic = useSelector((state) => state.profileInfo.profilePic);

  return (
    <div className={classes.container}>
      <NameNavHeader />
      <div className={classes["banner-container"]}>
        <img src={bannerPic} alt="banner pic" />
      </div>
      <img src={profilePic} alt="Profile pic" className={classes['profile-pic']}/>
      <button className={classes['edit-button']}>Edit profile</button>
      <InfoContainer />
      <PostList />
    </div>
  );
};

export default ProfileInfo;

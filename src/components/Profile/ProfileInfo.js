import React from "react";
import classes from "./ProfileInfo.module.css";
import InfoContainer from "./InfoContainer";
import NameNavHeader from "./NameNavHeader";
import { useSelector, useDispatch } from "react-redux";
import PostList from "./PostList";
import EditProfile from "./EditProfile/EditProfile";
import { showHideModalActions } from "../../store/redux/show-hide-modal-slice";

const ProfileInfo = () => {
  const bannerPic = useSelector((state) => state.profileInfo.bannerPic);
  const profilePic = useSelector((state) => state.profileInfo.profilePic);
  const isEditing = useSelector((state) => state.showHideModal.isEditing);
  const dispatch = useDispatch();

  const openEditProfileModal = () => {
    dispatch(showHideModalActions.setIsEditing(true));
  };

  const closeEditProfileModal = () => {
    dispatch(showHideModalActions.setIsEditing(false));
  };

  return (
    <>
      {isEditing && <EditProfile onClose={closeEditProfileModal} />}
      <div className={classes.container}>
        <NameNavHeader />
        <div className={classes["banner-container"]}>
          <img src={bannerPic} alt="banner pic" />
        </div>
        <img
          src={profilePic}
          alt="Profile pic"
          className={classes["profile-pic"]}
        />
        <button
          className={classes["edit-button"]}
          onClick={openEditProfileModal}
        >
          Edit profile
        </button>
        <InfoContainer />
        <PostList />
      </div>
    </>
  );
};

export default ProfileInfo;

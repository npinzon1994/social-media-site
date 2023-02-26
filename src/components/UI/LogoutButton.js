import React, { useState } from "react";
import classes from "./LogoutButton.module.css";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";

const LogoutMenuItem = (props) => {
  const username = useSelector((state) => state.profileInfo.username);
  return (
    <div className={classes["popup-container"]}>
      <div className={classes["item-body"]}>
        <Form action="logout" method="post">
          <button className={classes["item-text"]}>Log out @{username}</button>
        </Form>
      </div>
    </div>
  );
};

const LogoutButton = () => {
  const profilePic = useSelector((state) => state.profileInfo.profilePic);
  const displayName = useSelector((state) => state.profileInfo.displayName);
  const username = useSelector((state) => state.profileInfo.username);
  const [wantsToLogout, setWantsToLogout] = useState(false);

  const toggleLogoutPopup = () => {
    setWantsToLogout((prev) => !prev);
  };

  //needs a slight delay otherwise onBlur takes priority
  const closeLogoutPopup = () => {
    setTimeout(() => {
      setWantsToLogout(false);
    }, 100);
  };

  return (
    <div className={classes["wrapper"]}>
      {wantsToLogout && <LogoutMenuItem />}
      <button
        className={classes["container-button"]}
        onClick={toggleLogoutPopup}
        onBlur={closeLogoutPopup}
      >
        <img
          className={classes["profile-pic"]}
          src={profilePic}
          alt="profile pic"
        />
        <div className={classes["name-container"]}>
          <span className={classes["display-name"]}>{displayName}</span>
          <span className={classes.username}>@{username}</span>
        </div>
        <span className={classes["three-dots"]}>•••</span>
      </button>
    </div>
  );
};

export default LogoutButton;

import React from "react";
import classes from "./InfoContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import linkIcon from "../../assets/Profile/link.svg";
import calendarIcon from "../../assets/Profile/calendar.svg";
import { truncate } from "../../util/profile";
import { NavLink, useRouteLoaderData } from "react-router-dom";
import { profileInfoActions } from "../../store/redux/profile-info-slice";

const InfoContainer = () => {
  const displayName = useSelector((state) => state.profileInfo.displayName);
  const userName = useSelector((state) => state.profileInfo.username);
  const bio = useSelector((state) => state.profileInfo.bio);
  const website = useSelector((state) => state.profileInfo.website);
  const dateJoined = useSelector((state) => state.profileInfo.dateJoined);
  const following = useSelector((state) => state.profileInfo.following);
  const followers = useSelector((state) => state.profileInfo.followers);

  const loadedUserData = useRouteLoaderData("root");
  const dispatch = useDispatch();

  const userLoggedInId = localStorage.getItem("LOGIN_ID");
  for(const key in loadedUserData) {
    if(loadedUserData[key].id === userLoggedInId){
      //take everything from loaded data and store inside redux
      console.log("Loaded ID: ", loadedUserData[key].id);
      dispatch(profileInfoActions.setId(loadedUserData[key].id));

      console.log("Loaded Username: ", loadedUserData[key].username);
      dispatch(profileInfoActions.setUsername(loadedUserData[key].username));

      console.log("Loaded Display Name: ", loadedUserData[key].displayName);
      dispatch(profileInfoActions.setDisplayName(loadedUserData[key].displayName));

      console.log("Loaded Date Joined: ", loadedUserData[key].dateJoined);
      dispatch(profileInfoActions.setDateJoined(loadedUserData[key].dateJoined));
      
    }
  }
  
  localStorage.removeItem("LOGIN_ID");
  return (
    <div className={classes["main-container"]}>
      <div className={classes["name-container"]}>
        <span className={classes["display-name"]}>{displayName}</span>
        <span className={classes.username}>@{userName}</span>
      </div>
      <div className={classes["bio-container"]}>
        <span>{bio}</span>
      </div>
      <ul className={classes.list}>
        <li>
          <img src={linkIcon} alt="link icon" />
          {website !== "" ? (
            <a href={website} target="_blank" rel="noreferrer">
              {website}
            </a>
          ) : (
            "No Website"
          )}
        </li>
        <li>
          <img src={calendarIcon} alt="calendar icon" />
          Joined {dateJoined}
        </li>
      </ul>
      <ul className={classes.list}>
        <li>
          <span className={classes["follow-count"]}>{truncate(following)}</span>{" "}
          Following
        </li>
        <li>
          <span className={classes["follow-count"]}>{truncate(followers)}</span>{" "}
          Followers
        </li>
      </ul>
      <ul className={classes["post-filter"]}>
        <li>
          <NavLink to="">Posts</NavLink>
        </li>
        <li>
          <NavLink>Posts & replies</NavLink>
        </li>
        <li>
          <NavLink>Media</NavLink>
        </li>
        <li>
          <NavLink>Likes</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default InfoContainer;

import React from "react";
import classes from "./InfoContainer.module.css";
import { useSelector } from "react-redux";
import linkIcon from "../../assets/Profile/link.svg";
import calendarIcon from "../../assets/Profile/calendar.svg";
import { truncate } from "../../util/profile";
import {NavLink} from 'react-router-dom';

const InfoContainer = () => {
  const displayName = useSelector((state) => state.profileInfo.displayName);
  const userName = useSelector((state) => state.profileInfo.username);
  const bio = useSelector((state) => state.profileInfo.bio);
  const website = useSelector((state) => state.profileInfo.website);
  const dateJoined = useSelector((state) => state.profileInfo.dateJoined);
  const following = useSelector((state) => state.profileInfo.following);
  const followers = useSelector((state) => state.profileInfo.followers);

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
        <li><NavLink to="?mode=">Posts</NavLink></li>
        <li><NavLink>Posts & replies</NavLink></li>
        <li><NavLink>Media</NavLink></li>
        <li><NavLink>Likes</NavLink></li>
      </ul>
      <div className={classes['sliding-bar']}></div>
    </div>
  );
};

export default InfoContainer;

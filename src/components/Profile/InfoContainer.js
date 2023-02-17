import React from "react";
import classes from "./InfoContainer.module.css";
import { useSelector } from "react-redux";
import linkIcon from "../../assets/Profile/link.svg";
import calendarIcon from "../../assets/Profile/calendar.svg";

export const truncate = (followers) => {
  let convertedString = followers.toString();
  let followerCount = "";
  if (followers > 9999 && followers < 100000) {
    if (followers % 1000 === 0) {
      followerCount = convertedString.substring(0, 2) + "K";
      return followerCount;
    }
    const leftOfDecimal = convertedString.substring(0, 2);
    const rightOfDecimal = convertedString.substring(2, 3);
    followerCount = leftOfDecimal + "." + rightOfDecimal + "K";
    return followerCount;
  }

  if (followers > 99999 && followers < 1000000) {
    if (followers % 1000 === 0) {
      followerCount = convertedString.substring(0, 3) + "K";
      return followerCount;
    }
    const leftOfDecimal = convertedString.substring(0, 3);
    const rightOfDecimal = convertedString.substring(3, 4);
    followerCount = leftOfDecimal + "." + rightOfDecimal + "K";
    return followerCount;
  }
  return convertedString;
};

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
        <li>Posts</li>
        <li>Posts & replies</li>
        <li>Media</li>
        <li>Likes</li>
      </ul>
    </div>
  );
};

export default InfoContainer;

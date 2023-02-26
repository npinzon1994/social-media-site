import React from 'react'
import classes from './ProfilePicIcon.module.css';
import { useSelector } from 'react-redux';

const ProfilePicIcon = (props) => {
  const profilePic = useSelector(state => state.profileInfo.profilePic);
  return (
    <img
          src={profilePic}
          alt="profile pic"
          className={classes["profile-pic"]}
        />
  )
}

export default ProfilePicIcon
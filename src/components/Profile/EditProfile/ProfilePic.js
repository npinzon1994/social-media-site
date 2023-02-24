import React from 'react';
import classes from './ProfilePic.module.css';
import addImageButton from "../../../assets/Profile/add-pic.svg";

const ProfilePic = (props) => {
  
  return (
    <div className={classes["profile-pic-container"]}>
        <img
          className={classes["profile-pic"]}
          src={props.newPfp ? props.newPfp : props.loadedProfilePic}
          alt="default pfp"
        />
        <label htmlFor="pfp-upload" className={classes["file-upload-label"]}>
          <img
            className={classes["replace-profile-pic"]}
            src={addImageButton}
            alt="camera and plus sign icon for uploading new pic"
          />
          <input
            type="file"
            accept="image/*"
            id="pfp-upload"
            onChange={props.onUploadImage}
            className={classes["file-upload-input"]}
          />
        </label>
      </div>
  )
}

export default ProfilePic
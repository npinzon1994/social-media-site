import React from "react";
import classes from "./Banner.module.css";
import addImageButton from "../../../assets/Profile/add-pic.svg";
import removeImageButton from "../../../assets/cross-white.svg";

const Banner = (props) => {
  return (
    <div className={classes["banner-container"]}>
      <div className={classes["banner-overlay-container"]}>
        <label htmlFor="banner-upload" className={classes["file-upload-label"]}>
          <img
            className={classes["replace-banner-image"]}
            src={addImageButton}
            alt="camera and plus sign icon for uploading new pic"
          />
          <input
            type="file"
            accept="image/*"
            id="banner-upload"
            onChange={props.onUploadImage}
            className={classes["file-upload-input"]}
          />
        </label>
        <label>
          <img
            className={classes["delete-banner"]}
            src={removeImageButton}
            alt="X icon for closing window"
            onClick={props.onDeleteBanner}
          />
        </label>
      </div>
      <img
        src={props.newBannerPic ? props.newBannerPic : props.loadedBannerPic}
        alt="banner pic"
        className={classes["banner-pic"]}
      />
    </div>
  );
};

export default Banner;

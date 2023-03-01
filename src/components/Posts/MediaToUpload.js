import React from "react";
import classes from "./MediaToUpload.module.css";
import removeImageButton from "../../assets/cross-white.svg";

const MediaToUpload = (props) => {
  return (
    <li>
      <div className={classes.container}>
        <img
          className={`${classes.media} ${props.className}`}
          src={props.src}
          alt={props.alt}
        />
        <img
          className={classes["delete-media"]}
          src={removeImageButton}
          alt="X icon for closing window"
          onClick={props.onDelete}
        />
      </div>
    </li>
  );
};

export default MediaToUpload;

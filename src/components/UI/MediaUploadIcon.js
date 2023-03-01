import React from "react";
import classes from "./MediaUploadIcon.module.css";

const MediaUploadIcon = (props) => {
  return (
    <label htmlFor={props.id} className={classes["media-upload-container"]}>
      <div className={classes["image-wrapper"]}>
        <img
          className={classes["media-upload-icon"]}
          src={props.src}
          alt={props.alt}
        />
      </div>
      {props.type === "file" && (
        <input
          type={props.type}
          accept={props.accept}
          id={props.id}
          onChange={props.onUploadImage}
          className={classes["media-upload-input"]}
          multiple={props.multiple || null}
        />
      )}
    </label>
  );
};

export default MediaUploadIcon;

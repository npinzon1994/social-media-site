import React from "react";
import classes from "./MediaList.module.css";

const MediaList = (props) => {
  
  return <ul className={classes.list}>{props.children}</ul>;
};

export default MediaList;

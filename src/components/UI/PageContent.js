import React from "react";
import classes from './PageContent.module.css';

const PageContent = (props) => {
  return (
    <div className={classes.container}>
      <span className={classes.title}>{props.title}</span>
      {props.children}
    </div>
  );
};

export default PageContent;

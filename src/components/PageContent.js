import React from "react";
import classes from "./PageContent";

const PageContent = (props) => {
  return (
    <div>
      <h1 className={classes.title}>{props.title}</h1>
      {props.children}
    </div>
  );
};

export default PageContent;

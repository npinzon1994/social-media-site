import React from "react";
import { useSelector } from "react-redux";
import classes from './NameNavHeader.module.css';
import {truncate} from './InfoContainer';

const NameNavHeader = () => {
  const name = useSelector(state => state.profileInfo.displayName);
  const numberOfPosts = useSelector(state => state.profileInfo.numberOfPosts);
  
    return (
    <div className={classes.container}>
      <div className={classes['arrow-container']}>
        <button></button>
      </div>
      <div className={classes['name-container']}>
        <span className={classes.name}>{name}</span>
        <span className={classes['number-of-posts']}>{truncate(numberOfPosts)} Posts</span>
      </div>
    </div>
  );
};

export default NameNavHeader;

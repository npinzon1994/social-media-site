import React from "react";
import classes from './Header.module.css';
import closeButton from "../../../assets/Profile/cross.svg";

const Header = (props) => {
  return (
    <div className={classes.header}>
      <img
        src={closeButton}
        alt="close button"
        onClick={props.onClose}
        className={classes["close-button"]}
      />
      <span className={classes.title}>Edit Profile</span>
      <button className={classes["save-button"]} form={props.form}>
        Save
      </button>
    </div>
  );
};

export default Header;

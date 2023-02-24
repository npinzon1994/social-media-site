import React from "react";
import classes from './Header.module.css';
import closeButton from "../../../assets/Profile/cross.svg";
import { useSelector } from "react-redux";
import loadingSpinner from '../../../assets/loading-spinner.gif';

const Header = (props) => {
  const isSubmitting = useSelector((state) => state.showHideModal.isSubmitting);
  
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
        {isSubmitting ? <img className={classes['loading-spinner']} src={loadingSpinner} alt="loading spinner"/> : "Save"}
        {/* <img className={classes['loading-spinner']} src={loadingSpinner} alt="loading spinner"/> */}
      </button>
    </div>
  );
};

export default Header;

import React from "react";
import classes from './Header.module.css';
import { useSelector } from "react-redux";
import loadingSpinner from '../../../assets/loading-spinner.gif';
import CloseButtonX from "../../UI/CloseButtonX";

const Header = (props) => {
  const isSubmitting = useSelector((state) => state.showHideModal.isSubmitting);
  
  return (
    <div className={classes.header}>
      <CloseButtonX onClose={props.onClose}/>
      <span className={classes.title}>Edit Profile</span>
      <button className={classes["save-button"]} form={props.form}>
        {isSubmitting ? <img className={classes['loading-spinner']} src={loadingSpinner} alt="loading spinner"/> : "Save"}
      </button>
    </div>
  );
};

export default Header;

import React from "react";
import classes from "./DiscardChanges.module.css";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { showHideModalActions } from "../../../store/redux/show-hide-modal-slice";

const OuterBackdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const OuterModalOverlay = (props) => {
  const dispatch = useDispatch();
  const discardChangesHandler = () => {
    dispatch(showHideModalActions.setIsDiscarding(false));
    dispatch(showHideModalActions.setIsEditing(false));
  }
  
  return (
    <div className={classes.modal}>
      <div className={classes["inner-container"]}>
        <span className={classes.title}>Discard Changes?</span>
        <span className={classes.message}>
          This can't be undone and you'll lose your changes.
        </span>
        <div className={classes["button-div"]}>
          <button className={classes["discard-button"]} onClick={discardChangesHandler}>Discard</button>
          <button className={classes["cancel-button"]} onClick={props.onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("discard-modal");

const DiscardChanges = (props) => {
  return (
    <>
      {createPortal(<OuterBackdrop onClose={props.onClose} />, portalElement)}
      {createPortal(
        <OuterModalOverlay onClose={props.onClose} />,
        portalElement
      )}
    </>
  );
};

export default DiscardChanges;

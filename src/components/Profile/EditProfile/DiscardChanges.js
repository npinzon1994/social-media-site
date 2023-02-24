import React from "react";
import classes from "./DiscardChanges.module.css";
import { createPortal } from "react-dom";

const OuterBackdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const OuterModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes["inner-container"]}>
        <span className={classes.title}>Discard Changes?</span>
        <span className={classes.message}>
          This can't be undone and you'll lose your changes.
        </span>
        <div className={classes["button-div"]}>
          <button className={classes["discard-button"]}>Discard</button>
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

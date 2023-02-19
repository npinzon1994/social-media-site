import React from "react";
import classes from "./Modal.module.css";
import { createPortal } from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={`${classes.modal} ${props.className}`}>
      <div>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {createPortal(
        <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;

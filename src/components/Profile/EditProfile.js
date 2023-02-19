import React from "react";
import classes from "./EditProfile.module.css";
import Modal from "../UI/Modal";
import { useSelector } from "react-redux";
import closeButton from "../../assets/Profile/cross.svg";
import addImageButton from "../../assets/Profile/add-pic.svg";
import { Form } from "react-router-dom";

const EditProfile = (props) => {
  let bannerPic = useSelector((state) => state.profileInfo.bannerPic);
  let profilePic = useSelector((state) => state.profileInfo.profilePic);

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.header}>
        <img src={closeButton} alt="close button" onClick={props.onClose} />
        <span>Edit Profile</span>
        <button>Save</button>
      </div>
      <div className={classes["banner-container"]}>
        <div className={classes["banner-overlay-container"]}>
          <img
            className={classes["replace-banner-image"]}
            src={addImageButton}
            alt="camera and plus sign icon for uploading new pic"
          />
          <img
            className={classes["delete-banner"]}
            src={closeButton}
            alt="X icon for closing window"
          />
        </div>
        <img
          src={bannerPic}
          alt="banner pic"
          className={classes["banner-pic"]}
        />
      </div>

      <div className={classes["profile-pic"]}>
        <img
          className={classes["replace-profile-pic"]}
          src={addImageButton}
          alt="camera and plus sign icon for uploading new pic"
        />
      </div>

      <Form method="post" className={classes.form}>
        <input placeholder="Display Name"/>
        <input placeholder="Username"/>
        <textarea placeholder="Bio"/>
        <input placeholder="Website"/>
      </Form>
    </Modal>
  );
};

export default EditProfile;

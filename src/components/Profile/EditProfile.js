import React, { useState, useRef, useEffect } from "react";
import classes from "./EditProfile.module.css";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import closeButton from "../../assets/Profile/cross.svg";
import addImageButton from "../../assets/Profile/add-pic.svg";
import removeImageButton from "../../assets/Profile/cross-white.svg";
import { Form } from "react-router-dom";
import { profileInfoActions } from "../../store/redux/profile-info-slice";
import { storage } from "../../firebase";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";

let newBannerPicURL = "";
let newProfilePicURL = "";
let elementTriggeringFileUpload = "";

const EditProfile = (props) => {
  //Info loaded from Redux Store
  const loadedBannerPic = useSelector((state) => state.profileInfo.bannerPic);
  const loadedProfilePic = useSelector((state) => state.profileInfo.profilePic);

  const loadedDisplayName = useSelector(
    (state) => state.profileInfo.displayName
  );
  const loadedUsername = useSelector((state) => state.profileInfo.username);
  const loadedBio = useSelector((state) => state.profileInfo.bio);
  const loadedWebsite = useSelector((state) => state.profileInfo.website);

  //Refs for capturing new data to send back to backend and Redux store
  const displayNameInputRef = useRef();
  const usernameInputRef = useRef();
  const bioInputRef = useRef();
  const websiteInputRef = useRef();

  //states for capturing character counts AND the data to be sent back to Redux store
  const [enteredDisplayName, setEnteredDisplayName] =
    useState(loadedDisplayName);
  const [enteredUsername, setEnteredUsername] = useState(loadedUsername);
  const [enteredBio, setEnteredBio] = useState(loadedBio);
  const [enteredWebsite, setEnteredWebsite] = useState(loadedWebsite);

  const dispatch = useDispatch();

  //Image upload
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  console.log(file);
  const imageUploadHandler = (event) => {
    console.log("ELEMENT THAT TRIGGERED THIS EVENT:", event.target.id);
    if(event.target.id === "banner-upload" || event.target.id === "pfp-upload"){
      elementTriggeringFileUpload = event.target.id;
    }
    const image = event.target.files[0];
    setFile((file) => image);
  };

  useEffect(() => {
    const submitImageToFirebase = async (event) => {
      console.log("Start of upload...");

      try {
        if (file === "") {
          throw new Error(
            `${typeof file} is not a supported file type! Please upload either .png or .jpg.`
          );
        }
        const storageRefToBeSent = storageRef(storage, `/images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRefToBeSent, file);

        //showing upload progress
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setPercent(percent);
          },
          //handling potential errors
          (err) => console.log(err.message),
          async () => {
            //download url
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            if(elementTriggeringFileUpload === "banner-upload") {
              newBannerPicURL = url;
              dispatch(profileInfoActions.setBannerPic(newBannerPicURL));
            }
            if(elementTriggeringFileUpload === 'pfp-upload'){
              newProfilePicURL = url;
              dispatch(profileInfoActions.setProfilePic(newProfilePicURL));
            }
            console.log("SUCCESSFULLY UPLOADED BANNER IMAGE!!");
            console.log("New Banner Pic URL:", newBannerPicURL);
          }
        );
      } catch (error) {
        console.log(error.message);
      }
    };
    submitImageToFirebase();
  }, [file, dispatch]);

  //helper functions
  const displayNameIsEmpty = enteredDisplayName.length === 0;
  const usernameIsEmpty = enteredUsername.length === 0;
  const bioIsEmpty = enteredBio.length === 0;
  const websiteIsEmpty = enteredWebsite.length === 0;

  //input change handlers
  const displayNameChangeHandler = (event) => {
    setEnteredDisplayName(event.target.value);
  };
  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const bioChangeHandler = (event) => {
    setEnteredBio(event.target.value);
  };
  const websiteChangeHandler = (event) => {
    setEnteredWebsite(event.target.value);
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.header}>
        <img
          src={closeButton}
          alt="close button"
          onClick={props.onClose}
          className={classes["close-button"]}
        />
        <span className={classes.title}>Edit Profile</span>
        <button className={classes["save-button"]}>Save</button>
      </div>

      <div className={classes["banner-container"]}>
        <div className={classes["banner-overlay-container"]}>
          <label
            htmlFor="banner-upload"
            className={classes["file-upload-label"]}
          >
            <img
              className={classes["replace-banner-image"]}
              src={addImageButton}
              alt="camera and plus sign icon for uploading new pic"
            />
            <input
              type="file"
              accept="image/*"
              id="banner-upload"
              onChange={imageUploadHandler}
              className={classes["file-upload-input"]}
            />
            {/* <button type="button" className={classes['invisible-submit']}>Submit</button> */}
          </label>

          <img
            className={classes["delete-banner"]}
            src={removeImageButton}
            alt="X icon for closing window"
          />
        </div>
        <img
          src={loadedBannerPic}
          alt="banner pic"
          className={classes["banner-pic"]}
        />
      </div>

      <div className={classes["profile-pic-container"]}>
        <img
          className={classes["profile-pic"]}
          src={loadedProfilePic}
          alt="default pfp"
        />
        <label htmlFor="pfp-upload" className={classes["file-upload-label"]}>
          <img
            className={classes["replace-profile-pic"]}
            src={addImageButton}
            alt="camera and plus sign icon for uploading new pic"
          />
          <input
            type="file"
            accept="image/*"
            id="pfp-upload"
            onChange={imageUploadHandler}
            className={classes["file-upload-input"]}
          />
          {/* <button type="button" className={classes['invisible-submit']}>Submit</button> */}
        </label>
      </div>

      <Form method="post" className={classes.form}>
        <div className={classes["input-div"]}>
          <input
            ref={displayNameInputRef}
            type="text"
            id="display-name"
            value={enteredDisplayName}
            className={`${classes.input} ${
              !displayNameIsEmpty && classes["after-focus"]
            }`}
            onChange={displayNameChangeHandler}
            maxLength="50"
          />
          <div className={classes["placeholder-character-div"]}>
            <label htmlFor="display-name" className={classes.placeholder}>
              Display Name
            </label>
            <label className={classes.characters}>
              <span className={classes["used-characters"]}>
                {loadedDisplayName.length}
              </span>
              {"/"}
              <span className={classes["total-characters"]}>50</span>
            </label>
          </div>
        </div>

        <div className={classes["input-div"]}>
          <input
            ref={usernameInputRef}
            type="text"
            id="username"
            value={enteredUsername}
            className={`${classes.input} ${
              !usernameIsEmpty && classes["after-focus"]
            }`}
            onChange={usernameChangeHandler}
            maxLength="20"
          />
          <div className={classes["placeholder-character-div"]}>
            <label htmlFor="username" className={classes.placeholder}>
              Username
            </label>
            <label className={classes.characters}>
              <span className={classes["used-characters"]}>
                {enteredUsername.length}
              </span>
              {"/"}
              <span className={classes["total-characters"]}>20</span>
            </label>
          </div>
        </div>

        <div className={classes["input-div"]}>
          <textarea
            ref={bioInputRef}
            type="text"
            id="bio"
            value={enteredBio}
            className={`${classes.textarea} ${
              !bioIsEmpty && classes["after-focus"]
            }`}
            onChange={bioChangeHandler}
            maxLength="160"
            rows="4"
          />
          <div className={classes["placeholder-character-div"]}>
            <label htmlFor="bio" className={classes.placeholder}>
              Bio
            </label>
            <label className={classes.characters}>
              <span className={classes["used-characters"]}>
                {enteredBio.length}
              </span>
              {"/"}
              <span className={classes["total-characters"]}>160</span>
            </label>
          </div>
        </div>

        <div className={classes["input-div"]}>
          <input
            ref={websiteInputRef}
            type="text"
            id="website"
            value={enteredWebsite}
            className={`${classes.input} ${
              !websiteIsEmpty && classes["after-focus"]
            }`}
            onChange={websiteChangeHandler}
            maxLength="100"
          />
          <div className={classes["placeholder-character-div"]}>
            <label htmlFor="website" className={classes.placeholder}>
              Website
            </label>
            <label className={classes.characters}>
              <span className={classes["used-characters"]}>
                {enteredWebsite.length}
              </span>
              {"/"}
              <span className={classes["total-characters"]}>100</span>
            </label>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProfile;

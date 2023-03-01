import React, { useEffect } from "react";
import classes from "./EditProfile.module.css";
import Modal from "../../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { profileInfoActions } from "../../../store/redux/profile-info-slice";
import { showHideModalActions } from "../../../store/redux/show-hide-modal-slice";
import { defaultBannerPic } from "../../../util/profile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, string } from "zod";
import Header from "./Header";
import Banner from "./Banner";
import ProfilePic from "./ProfilePic";
import Input from "./Input";
import useUpload from "../../../hooks/use-upload";
import useSubmitImage from "../../../hooks/use-submit-image";
import { database } from "../../../firebase";
import { update, ref as databaseRef } from "firebase/database";
import useFirebaseId from "../../../hooks/use-firebase-id";
import DiscardChanges from "./DiscardChanges";

//form validation
const urlRegex = new RegExp(
  "^((https?://)?(www.)?[-a-zA-z0-9@:._+~#=]{2,256}.[a-z]{2,6}([-a-zA-z0-9@:%_+.~#?&//=]*))$"
);
const isValidUrl = (url) => urlRegex.test(url);

const schema = z.object({
  displayName: string().min(1, { message: "Display name required!" }),
  username: string().min(1, { message: "Username required!" }),
  bio: string().optional(),
  website: z
    .string()
    .refine(isValidUrl, (url) => ({
      message: `${url} is not a valid URL!`,
    }))
    .optional()
    .or(z.literal("")),
});

const checkInput = (value) => value.length !== 0;

const EditProfile = (props) => {
  //Info loaded from Redux Store
  const userId = useSelector((state) => state.profileInfo.id);
  const loadedBannerPic = useSelector((state) => state.profileInfo.bannerPic);
  const loadedProfilePic = useSelector((state) => state.profileInfo.profilePic);
  const loadedDisplayName = useSelector(
    (state) => state.profileInfo.displayName
  );
  const loadedUsername = useSelector((state) => state.profileInfo.username);
  const loadedBio = useSelector((state) => state.profileInfo.bio);
  const loadedWebsite = useSelector((state) => state.profileInfo.website);

  const isDiscarding = useSelector((state) => state.showHideModal.isDiscarding);

  //hooks
  const dispatch = useDispatch();
  const { files, sourceElement, uploadImage } = useUpload();
  const { submitImageToFirebase, setBanner, newBannerPic, newProfilePic } =
    useSubmitImage();
  const { getFirebaseId } = useFirebaseId();

  const { register, handleSubmit, watch, getValues } = useForm({
    defaultValues: {
      displayName: loadedDisplayName,
      username: loadedUsername,
      bio: loadedBio,
      website: loadedWebsite,
    },
    resolver: zodResolver(schema),
  });

  //To monitor number of characters used in input
  const inputChangeMonitors = {
    watchDisplayName: watch("displayName"),
    watchUsername: watch("username"),
    watchBio: watch("bio"),
    watchWebsite: watch("website"),
  };

  const { watchDisplayName, watchUsername, watchBio, watchWebsite } =
    inputChangeMonitors;

  //checking if values changed so we know whether or not to open Discard Modal
  const newDisplayName = getValues("displayName");
  const newUsername = getValues("username");
  const newBio = getValues("bio");
  const newWebsite = getValues("website");

  const displayNameChanged = loadedDisplayName !== newDisplayName;
  const usernameChanged = loadedUsername !== newUsername;
  const bioChanged = loadedBio !== newBio;
  const websiteChanged = loadedWebsite !== newWebsite;
  const bannerPicChanged = loadedBannerPic !== newBannerPic;
  const profilePicChanged = loadedProfilePic !== newProfilePic;


  //
  useEffect(() => {
    submitImageToFirebase(files, sourceElement);
  }, [files, sourceElement, submitImageToFirebase]);

  const deleteBannerImageHandler = () => {
    if (loadedBannerPic === defaultBannerPic) {
      console.log("HEY! This is already the default image there, buddy 🤨");
    } else {
      setBanner(defaultBannerPic);
      console.log("Removed banner successfully!");
    }
  };

  const submitFormHandler = async (data) => {
    //only want to submit if any info actually changed
    if (
      displayNameChanged ||
      usernameChanged ||
      bioChanged ||
      websiteChanged ||
      bannerPicChanged ||
      profilePicChanged
    ) {
      console.log("Submitting...");
      dispatch(showHideModalActions.setIsSubmitting(true));
      //this is where we overwrite redux store
      newProfilePic &&
        dispatch(profileInfoActions.setProfilePic(newProfilePic));
      newBannerPic && dispatch(profileInfoActions.setBannerPic(newBannerPic));
      dispatch(profileInfoActions.setDisplayName(getValues("displayName")));
      dispatch(profileInfoActions.setUsername(getValues("username")));
      dispatch(profileInfoActions.setBio(getValues("bio")));
      dispatch(profileInfoActions.setWebsite(getValues("website")));

      //send http request here
      const updateObject = {
        profilePic: newProfilePic || loadedProfilePic,
        bannerPic: newBannerPic || loadedBannerPic,
        displayName: getValues("displayName"),
        username: getValues("username"),
        bio: getValues("bio"),
        website: getValues("website"),
      };

      const firebaseId = await getFirebaseId(userId);
      update(databaseRef(database, `/users/${firebaseId}`), updateObject);
      dispatch(showHideModalActions.setIsSubmitting(false));
      dispatch(showHideModalActions.setIsEditing(false));
    }
  };

  const openDiscardOrCloseEdit = () => {
    if (
      displayNameChanged ||
      usernameChanged ||
      bioChanged ||
      websiteChanged ||
      bannerPicChanged ||
      profilePicChanged
    ) {
      console.log("SOMETHING CHANGED");
      console.log("Old Profile Pic:", loadedProfilePic);
      console.log("New Profile Pic:", newProfilePic);
      dispatch(showHideModalActions.setIsDiscarding(true));
    } else {
      dispatch(showHideModalActions.setIsEditing(false));
    }
  };

  const closeDiscardModal = () => {
    dispatch(showHideModalActions.setIsDiscarding(false));
  };

  return (
    <>
      {isDiscarding && <DiscardChanges onClose={closeDiscardModal} />}
      <Modal onClose={openDiscardOrCloseEdit}>
        <Header
          onClose={openDiscardOrCloseEdit}
          form="edit-form"
          onOpenDiscardModal={openDiscardOrCloseEdit}
        />
        <Banner
          onUploadImage={uploadImage}
          onDeleteBanner={deleteBannerImageHandler}
          loadedBannerPic={loadedBannerPic}
          newBannerPic={newBannerPic}
        />
        <ProfilePic
          onUploadImage={uploadImage}
          loadedProfilePic={loadedProfilePic}
          newPfp={newProfilePic}
        />

        <form
          className={classes.form}
          onSubmit={handleSubmit(submitFormHandler)}
          id="edit-form"
        >
          <Input
            element="input"
            register={register("displayName")}
            type="text"
            id="display-name"
            afterFocus={checkInput(watchDisplayName)}
            maxLength="50"
            placeholder="Display Name"
            charactersEntered={watchDisplayName.length}
          />
          <Input
            element="input"
            register={register("username")}
            type="text"
            id="username"
            afterFocus={checkInput(watchUsername)}
            maxLength="20"
            placeholder="Username"
            charactersEntered={watchUsername.length}
          />
          <Input
            element="textarea"
            register={register("bio")}
            id="bio"
            afterFocus={checkInput(watchBio)}
            maxLength="160"
            rows="4"
            placeholder="Bio"
            charactersEntered={watchBio.length}
          />
          <Input
            element="input"
            register={register("website")}
            id="website"
            afterFocus={checkInput(watchWebsite)}
            maxLength="100"
            placeholder="Website"
            charactersEntered={watchWebsite.length}
          />
        </form>
      </Modal>
    </>
  );
};

export default EditProfile;

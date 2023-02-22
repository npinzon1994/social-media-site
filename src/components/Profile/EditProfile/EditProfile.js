import React, { useEffect } from "react";
import classes from "./EditProfile.module.css";
import Modal from "../../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { profileInfoActions } from "../../../store/redux/profile-info-slice";
import { defaultBanner } from "../../../pages/CreateNewAccount";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, string } from "zod";
import Header from "./Header";
import Banner from "./Banner";
import ProfilePic from "./ProfilePic";
import Input from "./Input";
import useUpload from "../../../hooks/use-upload";
import useSubmitImage from "../../../hooks/use-submit-image";

//zod schema for validation
const schema = z.object({
  displayName: string().min(1, { message: "Display name required!" }),
  username: string().min(1, { message: "Username required!" }),
  bio: string().optional(),
  website: string()
    .url({ message: "INVALID URL!!!" })
    .optional()
    .or(z.literal("")),
});

//helper function(s)
const checkInput = (value) => value.length !== 0;

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

  const dispatch = useDispatch();
  const { file, sourceElement, uploadImage } = useUpload();
  const { submitImageToFirebase } = useSubmitImage();

  //useForm declaration
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      displayName: loadedDisplayName,
      username: loadedUsername,
      bio: loadedBio,
      website: loadedWebsite,
    },
    resolver: zodResolver(schema),
  });

  //for calculating number of characters
  const inputChangeMonitors = {
    watchDisplayName: watch("displayName"),
    watchUsername: watch("username"),
    watchBio: watch("bio"),
    watchWebsite: watch("website"),
  };
  const { watchDisplayName, watchUsername, watchBio, watchWebsite } =
    inputChangeMonitors;

  useEffect(() => {
    submitImageToFirebase(file, sourceElement);
  }, [file, sourceElement, submitImageToFirebase]);

  const deleteBannerImageHandler = () => {
    if (loadedBannerPic === defaultBanner) {
      console.log("HEY! This is already the default image there, buddy 🤨");
    } else {
      dispatch(profileInfoActions.setBannerPic(defaultBanner));
      console.log("Removed banner successfully!");
    }
  };

  const submitFormHandler = () => {
    console.log("Submitting...");
  };

  return (
    <Modal onClose={props.onClose}>
      <Header onClose={props.onClose} form="edit-form" />
      <Banner
        onUploadImage={uploadImage}
        onDeleteBanner={deleteBannerImageHandler}
        loadedBannerPic={loadedBannerPic}
      />
      <ProfilePic
        onUploadImage={uploadImage}
        loadedProfilePic={loadedProfilePic}
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
  );
};

export default EditProfile;

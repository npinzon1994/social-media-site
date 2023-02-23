import React, { useEffect } from "react";
import classes from "./EditProfile.module.css";
import Modal from "../../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { profileInfoActions } from "../../../store/redux/profile-info-slice";
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
import * as zz from "zod";

//custom error map for URL validation
const urlErrorMap = (error, ctx) => {
  switch (error.code) {
    case zz.ZodIssueCode.invalid_type:
      if (error.expected === "string") {
        return { message: "URL needs to be a string!" };
      }
      break;
    case zz.ZodIssueCode.invalid_string:
      const params = error.params || {};
      if (
        /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
          params.website
        )
      ) {
        break;
      } else {
        return { message: `${params.website} is an invalid URL!` };
      }
  }

  return {message: ctx.defaultError};
};

//zod schema for validation
const schema = z.object({
  displayName: string().min(1, { message: "Display name required!" }),
  username: string().min(1, { message: "Username required!" }),
  bio: string().optional(),
  website: string({errorMap: urlErrorMap}).optional().or(z.literal("")),
});

const result = schema.safeParse({
  displayName: "",
  username: null,
  bio: "my bio yayyyy",
  website: "nikkipinzon.com"
})

if(!result.success){
  console.log("RESULT ERROR ISSUES", result.error.issues);
}

//helper function(s)
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

  const dispatch = useDispatch();
  const { file, sourceElement, uploadImage } = useUpload();
  const { submitImageToFirebase, newBannerPic, newProfilePic } =
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
    if (loadedBannerPic === defaultBannerPic) {
      console.log("HEY! This is already the default image there, buddy 🤨");
    } else {
      //delete banner on this line
      console.log("Removed banner successfully!");
    }
  };

  const missingHttp = (url) =>
    !url.startsWith("http://") || !url.startsWith("https://");
  const amendedUrl = `http://${getValues("website")}`;

  const submitFormHandler = async (data) => {
    console.log("Submitting...");
    console.log(data);

    //this is where we overwrite redux store
    newProfilePic && dispatch(profileInfoActions.setProfilePic(newProfilePic));
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
  };

  return (
    <Modal onClose={props.onClose}>
      <Header onClose={props.onClose} form="edit-form" />
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
  );
};

export default EditProfile;

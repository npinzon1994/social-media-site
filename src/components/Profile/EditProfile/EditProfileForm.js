import React from "react";
import { useForm } from "react-hook-form";
import classes from "./EditProfileForm.module.css";
import { useSelector } from "react-redux";
import {zodResolver} from '@hookform/resolvers/zod';
import {z, string} from "zod";

const schema = z.object({
  displayName: string().min(1, {message: "Display name required!"}),
  username: string(),
  bio: string().optional(),
  website: string().url().optional()
})

const EditProfileForm = () => {
  const loadedDisplayName = useSelector(
    (state) => state.profileInfo.displayName
  );
  const loadedUsername = useSelector((state) => state.profileInfo.username);
  const loadedBio = useSelector((state) => state.profileInfo.bio);
  const loadedWebsite = useSelector((state) => state.profileInfo.website);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: loadedDisplayName,
      username: loadedUsername,
      bio: loadedBio,
      website: loadedWebsite,
    },
    resolver: zodResolver(schema)
  });

  const watchDisplayName = watch("displayName");
  const watchUsername = watch("username");
  const watchBio = watch("bio");
  const watchWebsite = watch("website");

  //handleSubmit() gives us a data object with all the values from the submitted
  const submitHandler = (data) => {
    console.log("Submitting...");
    console.log(data);
  };

  return (
    <div className={classes.container}>
      <h3>REACT HOOK FORM</h3>
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <span style={{color: "red"}}>{errors.displayName?.message}</span>
        <span className={classes['character-count']}>{`${watchDisplayName.length}/50`}</span>
        <input
          {...register("displayName")}
          type="text"
          id="display-name"
          maxLength="50"
        />
        <span>{errors.username?.message}</span> 
        <span className={classes['character-count']}>{`${watchUsername.length}/20`}</span>
        <input
          {...register("username")}
          type="text"
          id="username"
          maxLength="20"
        />
        <span className={classes['character-count']}>{`${watchBio.length}/160`}</span>
        <textarea
          {...register("bio")}
          type="text"
          id="bio"
          maxLength="160"
        />
        <span className={classes['character-count']}>{`${watchWebsite.length}/100`}</span>
        <input
          {...register("website")}
          type="text"
          id="website"
          maxLength="100"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditProfileForm;

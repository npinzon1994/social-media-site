import React, { useEffect } from "react";
import { Outlet, useSubmit, useLoaderData, json } from "react-router-dom";
import { checkAuthLoader, getTokenDuration } from "../util/auth";
import SidebarNavigation from "../components/UI/SidebarNavigation";
import classes from "./Root.module.css";
import { useDispatch } from "react-redux";
import { profileInfoActions } from "../store/redux/profile-info-slice";
import { defaultProfilePic } from "../util/profile";
import { defaultBannerPic } from "../util/profile";
import { userDatabaseURL } from "../util/http";
import useFirebaseId from "../hooks/use-firebase-id";

const getTimeLeft = (tokenDuration) => {
  const tokenDurationDate = new Date(tokenDuration);
  const minutesLeft = tokenDurationDate.getMinutes();
  const secondsLeft = tokenDurationDate.getSeconds() % 60;
  return { minutes: minutesLeft, seconds: secondsLeft };
};

const Root = () => {
  const token = useLoaderData();
  const submit = useSubmit();
  const dispatch = useDispatch();
  const { getFirebaseId } = useFirebaseId();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "TOKEN EXPIRED") {
      submit(null, { action: "logout", method: "post" });
    }

    const tokenDuration = getTokenDuration();
    const timeLeft = getTimeLeft(tokenDuration);

    console.log(
      "Time left in session: ",
      timeLeft.minutes,
      "min",
      timeLeft.seconds,
      "sec"
    );

    setTimeout(() => {
      submit(null, { action: "logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  useEffect(() => {
    //for new user, create new data
    const getInitialUserInfo = () => {
      const id = localStorage.getItem("ID");
      const username = localStorage.getItem("USERNAME");
      const displayName = localStorage.getItem("USERNAME");
      const dateJoined = localStorage.getItem("DATE_JOINED");
      localStorage.removeItem("ID");
      localStorage.removeItem("USERNAME");
      localStorage.removeItem("DATE_JOINED");
      return { id, username, displayName, dateJoined };
    };

    //for existing user, fetch data from backend
    const fetchUserData = async (userId) => {
      const firebaseId = await getFirebaseId(userId);

      const response = await fetch(userDatabaseURL);
      const data = await response.json();

      const loadedUserData = data[firebaseId];
      const {
        bannerPic,
        bio,
        dateJoined,
        displayName,
        followers,
        following,
        id,
        numberofPosts,
        profilePic,
        username,
        website,
      } = loadedUserData;

      dispatch(profileInfoActions.setBannerPic(bannerPic));
      dispatch(profileInfoActions.setBio(bio));
      dispatch(profileInfoActions.setDateJoined(dateJoined));
      dispatch(profileInfoActions.setDisplayName(displayName));
      dispatch(profileInfoActions.setFollowers(followers));
      dispatch(profileInfoActions.setFollowing(following));
      dispatch(profileInfoActions.setId(id));
      dispatch(profileInfoActions.setNumberOfPosts(numberofPosts));
      dispatch(profileInfoActions.setProfilePic(profilePic));
      dispatch(profileInfoActions.setUsername(username));
      dispatch(profileInfoActions.setWebsite(website));
    };

    //if new user
    if (!localStorage["USERNAME"] && !localStorage["ID"]) {
      //if existing user
      if (localStorage["LOGIN_ID"]) {
        const userLoggedInId = localStorage.getItem("LOGIN_ID");

        //reach out to backend and fetch data to populate redux store
        fetchUserData(userLoggedInId);

        // dispatch(profileInfoActions.setId(userLoggedInId));
        // console.log("Login ID", userLoggedInId , "set to redux!");
        return;
      }
      console.log("No username found in Local Storage!");
      return;
    } else {
      //setting up new user
      const initialUserInfo = getInitialUserInfo();
      const { id, username, displayName, dateJoined } = initialUserInfo;
      dispatch(profileInfoActions.setId(id));
      dispatch(profileInfoActions.setUsername(username));
      dispatch(profileInfoActions.setDisplayName(displayName));
      dispatch(profileInfoActions.setDateJoined(dateJoined));

      console.log("Username and ID successfully stored in redux!");
    }

    dispatch(profileInfoActions.setProfilePic(defaultProfilePic));
    dispatch(profileInfoActions.setBannerPic(defaultBannerPic));
  }, [dispatch, getFirebaseId]);

  return (
    <div className={classes["outer-container"]}>
      <div className={classes["inner-container"]}>
        <SidebarNavigation />
        <Outlet />
      </div>
    </div>
  );
};

export default Root;

export async function loader() {
  //need to get user data from database
  checkAuthLoader();
  const response = await fetch(
    "https://social-media-app-2cfba-default-rtdb.firebaseio.com/users.json"
  );

  if (!response.ok) {
    return json({ message: "Something went wrong!" }, { status: 500 });
  }

  return response;
}

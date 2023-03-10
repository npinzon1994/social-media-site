import React from "react";
import NewAccountForm from "../components/Login/NewAccountForm";
import { redirect, json } from "react-router-dom";
import { createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { auth } from "../firebase";
import { setAuthToken, setTokenExpiration } from "../util/auth";
import { setInitialUserInfo } from "../util/profile";
import { userDatabaseURL } from "../util/http";
import { defaultProfilePic } from "../util/profile";
import { defaultBannerPic } from "../util/profile";

const CreateNewAccount = () => {
  return (
    <>
      <NewAccountForm />
    </>
  );
};

export default CreateNewAccount;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  console.log(email, password);
  const { INVALID_EMAIL, EMAIL_EXISTS, WEAK_PASSWORD } = AuthErrorCodes;

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = response.user.uid;
    const token = (await response.user.getIdToken()).toString();

    setAuthToken(token);
    setTokenExpiration();
    setInitialUserInfo(userId, email);

    const getInitialUserInfo = () => {
      const id = localStorage.getItem("ID");
      const username = localStorage.getItem("USERNAME");
      const displayName = localStorage.getItem("USERNAME");
      const dateJoined = localStorage.getItem("DATE_JOINED");
      return { id, username, displayName, dateJoined };
    };

    const initialUserInfo = getInitialUserInfo();
    const { id, username, displayName, dateJoined } = initialUserInfo;

    const postResponse = await fetch(userDatabaseURL, {
      method: "POST",
      body: JSON.stringify({
        id,
        username,
        displayName,
        profilePic: defaultProfilePic,
        bannerPic: defaultBannerPic,
        bio: "",
        website: "",
        dateJoined,
        following: 0,
        followers: 0,
        posts: [],
        numberOfPosts: 0,
        messageThreads: [],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!postResponse.ok) {
      throw json({ message: "Something went wrong!" }, { status: 500 });
    }

    return redirect(`/${userId}/home`);
  } catch (error) {
    let message = "Something went wrong!";
    switch (error.code) {
      case INVALID_EMAIL:
        return { message: "Please enter a valid email.", status: 400 };
      case EMAIL_EXISTS:
        return { message: "Email already exists.", status: 409 };
      case WEAK_PASSWORD:
        return {
          message: "Password must be at least 6 characters",
          status: 401,
        };
      default:
        message = "Something went wrong!";
    }
    console.log(error.message);
    console.log(message);
  }
}

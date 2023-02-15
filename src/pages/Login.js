import { signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import React from "react";
import { redirect } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import { setAuthToken, setTokenExpiration } from "../utils/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  const { INVALID_PASSWORD, INVALID_EMAIL, USER_DELETED, INTERNAL_ERROR } =
    AuthErrorCodes;

  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const userId = response.user.uid;

    //handle token here
    const token = (await response.user.getIdToken()).toString();
    setAuthToken(token);
    setTokenExpiration();

    console.log("TOKEN -- ", token);

    return redirect(`/${userId}/home`);
  } catch (error) {
    if (
      error.code === INTERNAL_ERROR ||
      error.code === INVALID_EMAIL ||
      error.code === INVALID_PASSWORD ||
      error.code === USER_DELETED
    ) {
      return { message: "Invalid email / password", status: 401 };
    }
    console.log(error.message);
    return null;
  }
}

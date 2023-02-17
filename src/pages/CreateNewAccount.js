import React from "react";
import NewAccountForm from "../components/Login/NewAccountForm";
import { redirect } from "react-router-dom";
import { createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { auth } from "../firebase";
import {setAuthToken, setTokenExpiration} from '../util/auth';

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

    return redirect(`/${userId}/home`);
    
  } catch (error) {
    let message = "Something went wrong!";
    switch (error.code) {
      case INVALID_EMAIL:
        return {message: 'Please enter a valid email.', status: 400};
      case EMAIL_EXISTS:
        return {message: 'Email already exists.', status: 409};
      case WEAK_PASSWORD:
        return {message: 'Password must be at least 6 characters', status: 401};
      default: message = "Something went wrong!";
    }
    console.log(error.message);
    console.log(message);
  }

  
}

import React from "react";
import NewAccountForm from "../components/Login/NewAccountForm";
import { Link } from "react-router-dom";

const CreateNewAccount = () => {
  return (
    <>
      <NewAccountForm />
      <Link to="/root/home">Home</Link>
    </>
  );
};

export default CreateNewAccount;

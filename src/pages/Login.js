import React from "react";
import LoginForm from "../components/Login/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <LoginForm />
      <Link to="/root/home">Home</Link>
    </>
  );
};

export default Login;

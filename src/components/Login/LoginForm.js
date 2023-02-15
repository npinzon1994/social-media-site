import React, { useContext, useEffect } from "react";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import classes from "./LoginForm.module.css";
import siteLogo from "../../assets/site-logo.png";
import ThemeContext from "../../store/theme-context";
import loadingSpinner from '../../assets/loading-spinner.gif';

const LoginForm = () => {
  const themeContext = useContext(ThemeContext);
  const { theme, setTheme } = themeContext;
  const actionData = useActionData();
  const navigation = useNavigation();

  useEffect(() => {
    setTheme("login");
  }, [theme, setTheme]);

  return (
    <Form className={classes.form} method="post">
      <img src={siteLogo} className={classes.logo} alt="site logo" />
      {actionData && actionData.status === 401 && <span>*{actionData.message}</span>}
      <input type="text" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <div className={classes["button-div"]}>
      <button>{navigation.state === 'submitting' ? <img className={classes['loading-spinner']} src={loadingSpinner} alt="Loading spinner"/> : 'Log In'}</button>
        <Link to="/createNewAccount" className={classes.link}>
          Create New Account
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;

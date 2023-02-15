import React, { useContext, useEffect } from "react";
import { Form, Link, useActionData, useNavigation} from "react-router-dom";
import classes from "./NewAccountForm.module.css";
import siteLogo from "../../assets/site-logo.png";
import ThemeContext from "../../store/theme-context";
import loadingSpinner from '../../assets/loading-spinner.gif';

const NewAccountForm = () => {
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
      <input type="text" name="email" placeholder="Email" />
      {actionData && (actionData.status === 400 || actionData.status === 409) && <span>*{actionData.message}</span>}
      <input type="password" name="password" placeholder="Password" />
      {actionData && actionData.status === 401 && <span>*{actionData.message}</span>}
      <div className={classes["button-div"]}>
        <button>{navigation.state === 'submitting' ? <img className={classes['loading-spinner']} src={loadingSpinner} alt="Loading spinner"/> : 'Create Account'}</button>
        <Link to="/" className={classes.link}>
          Back to Login
        </Link>
      </div>
    </Form>
  );
};

export default NewAccountForm;

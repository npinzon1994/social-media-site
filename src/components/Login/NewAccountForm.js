import React, {useContext, useEffect} from "react";
import {Form, Link} from 'react-router-dom';
import classes from './NewAccountForm.module.css';
import siteLogo from '../../assets/site-logo.png';
import ThemeContext from "../../store/theme-context";

const NewAccountForm = () => {
  const themeContext = useContext(ThemeContext);
  const {theme, setTheme} = themeContext;
  
  useEffect(() => {
    setTheme('login');
  }, [theme, setTheme]);
  
  return <div className={classes.container}>
    <Form className={classes.form}>
    <img src={siteLogo} className={classes.logo} alt="site logo"/>
        <input type="email" name="email" placeholder="Email"/>
        <input type="text" name="username" placeholder="Username"/>
        <input type="password" name="password" placeholder="Password"/>
        <input type="password" name="confirmpassword" placeholder="Confirm Password"/>
        <div className={classes['button-div']}>
            <button>Create Account</button>
            <Link to="/" className={classes.link}>Back to Login</Link>
        </div>
    </Form>
  </div>;
};

export default NewAccountForm;

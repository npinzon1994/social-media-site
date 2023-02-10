import React, {useContext, useEffect} from "react";
import {Form, Link} from 'react-router-dom';
import classes from './LoginForm.module.css';
import siteLogo from '../../assets/site-logo.png';
import ThemeContext from "../../store/theme-context";

const LoginForm = () => {
  const themeContext = useContext(ThemeContext);
  const {theme, setTheme} = themeContext;
  
  useEffect(() => {
    setTheme('login');
  }, [theme, setTheme]);
  
  
  return <div className={classes.container}>
    <Form className={classes.form}>
    <img src={siteLogo} className={classes.logo} alt="site logo"/>
        <input type="email" name="email" placeholder="Email"/>
        <input type="password" name="password" placeholder="Password"/>
        <div className={classes['button-div']}>
            <button>Log In</button>
            <Link to="/createNewAccount" className={classes.link}>Create New Account</Link>
        </div>
    </Form>
  </div>;
};

export default LoginForm;

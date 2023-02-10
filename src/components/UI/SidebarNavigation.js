import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./SidebarNavigation.module.css";
import siteLogo from "../../assets/site-logo.png";
import homeIcon from "../../assets/home.svg";
import notificationsIcon from "../../assets/alert.svg";
import messagesIcon from "../../assets/message.svg";
import profileIcon from "../../assets/profile.svg";
import accountIcon from "../../assets/settings.svg";

const SidebarNavigation = () => {
  return (
    <div className={classes.container}>
      <img src={siteLogo} className={classes.logo} alt="site logo" />
      <nav>
        <ul className={classes.list}>
          <li>
            <img className={classes.icon} src={homeIcon} alt="home icon" />
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <img
              className={classes.icon}
              src={notificationsIcon}
              alt="notifications icon"
            />
            <NavLink
              to="notifications"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Notifications
            </NavLink>
          </li>
          <li>
            <img
              className={classes.icon}
              src={messagesIcon}
              alt="messages icon"
            />
            <NavLink
              to="messaging"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Messages
            </NavLink>
          </li>
          <li>
            <img
              className={classes.icon}
              src={profileIcon}
              alt="profile icon"
            />
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <img
              className={classes.icon}
              src={accountIcon}
              alt="account icon"
            />
            <NavLink
              to="account"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Account
            </NavLink>
          </li>
        </ul>
        <NavLink to="/" className={classes["sign-out"]}>
          Sign Out
        </NavLink>
      </nav>
    </div>
  );
};

export default SidebarNavigation;

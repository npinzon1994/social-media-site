import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./SidebarNavigation.module.css";
import siteLogo from "../../assets/site-logo.png";
import homeIcon from "../../assets/Sidebar/home.svg";
import notificationsIcon from "../../assets/Sidebar/alert.svg";
import messagesIcon from "../../assets/Sidebar/message.svg";
import profileIcon from "../../assets/Sidebar/profile.svg";
import accountIcon from "../../assets/Sidebar/settings.svg";
import LogoutButton from "./LogoutButton";

const SidebarNavigation = () => {
  return (
    <div className={classes.container}>
      <ul className={classes.list}>
        <li className={classes["list-item"]}>
          <div className={classes["link-wrapper"]}>
            <img src={siteLogo} className={classes.icon} alt="site logo" />
          </div>
        </li>
        <li className={classes["list-item"]}>
          <div className={classes["link-wrapper"]}>
            <img className={classes.icon} src={homeIcon} alt="home icon" />
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Home
            </NavLink>
          </div>
        </li>
        <li className={classes["list-item"]}>
          <div className={classes["link-wrapper"]}>
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
          </div>
        </li>
        <li className={classes["list-item"]}>
        <div className={classes["link-wrapper"]}>
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
          </div>
        </li>
        <li className={classes["list-item"]}>
        <div className={classes["link-wrapper"]}>
          <img className={classes.icon} src={profileIcon} alt="profile icon" />
          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive ? classes.active : classes.inactive
            }
          >
            Profile
          </NavLink>
          </div>
        </li>
        <li className={classes["list-item"]}>
        <div className={classes["link-wrapper"]}>
          <img className={classes.icon} src={accountIcon} alt="account icon" />
          <NavLink
            to="account"
            className={({ isActive }) =>
              isActive ? classes.active : classes.inactive
            }
          >
            Account
          </NavLink>
          </div>
        </li>
      </ul>
      <button className={classes["new-post"]}>Post</button>
      <LogoutButton />
    </div>
  );
};

export default SidebarNavigation;

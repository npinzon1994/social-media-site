import React from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./SidebarNavigation.module.css";
import siteLogo from "../../assets/site-logo.png";
import homeIcon from "../../assets/Sidebar/home.svg";
import notificationsIcon from "../../assets/Sidebar/alert.svg";
import messagesIcon from "../../assets/Sidebar/message.svg";
import profileIcon from "../../assets/Sidebar/profile.svg";
import accountIcon from "../../assets/Sidebar/settings.svg";
import LogoutButton from "./LogoutButton";
import PostButton from "./PostButton";
import { useSelector } from "react-redux";
import NewPost from "../Posts/NewPost";

const SidebarNavigation = () => {
  const isPosting = useSelector(state => state.showHideModal.isPosting);
  
  return (
    <>
    {isPosting && <NewPost />}
      <div className={classes.container}>
        <ul className={classes.list}>
          <li className={classes["list-item-home"]}>
            <Link to="home">
              <img src={siteLogo} className={classes.icon} alt="site logo" />
            </Link>
          </li>
          <li className={classes["list-item"]}>
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <img className={classes.icon} src={homeIcon} alt="home icon" />
              Home
            </NavLink>
          </li>
          <li className={classes["list-item"]}>
            <NavLink
              to="notifications"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <img
                className={classes.icon}
                src={notificationsIcon}
                alt="notifications icon"
              />
              Notifications
            </NavLink>
          </li>
          <li className={classes["list-item"]}>
            <NavLink
              to="messaging"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <img
                className={classes.icon}
                src={messagesIcon}
                alt="messages icon"
              />
              Messages
            </NavLink>
          </li>
          <li className={classes["list-item"]}>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <img
                className={classes.icon}
                src={profileIcon}
                alt="profile icon"
              />
              Profile
            </NavLink>
          </li>
          <li className={classes["list-item"]}>
            <NavLink
              to="account"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <img
                className={classes.icon}
                src={accountIcon}
                alt="account icon"
              />
              Account
            </NavLink>
          </li>
        </ul>
        <PostButton className={classes['new-post']}/>
        <LogoutButton />
      </div>
    </>
  );
};

export default SidebarNavigation;

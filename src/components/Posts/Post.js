import React from "react";
import classes from "./Post.module.css";
import likeIcon from "../../assets/Posts/like-outline.svg";
import retweetIcon from "../../assets/Posts/retweet.svg";
import replyIcon from "../../assets/Posts/reply-outline.svg";

const Post = (props) => {
  return (
    <li className={classes.container}>
      <div className={classes["pfp-container"]}>
        <img
          src={props.pfp.image}
          alt={props.pfp.alt}
          className={classes["profile-pic"]}
        />
      </div>
      <div className={classes["inner-container"]}>
        <div className={classes["header-info"]}>
          <span className={classes.name}>{props.name}</span>
          <span className={classes.username}>@{props.username}</span>
          <span>∙</span>
          <span className={classes.date}>{props.date}</span>
          <button className={classes["post-options"]}>•••</button>
        </div>
        <span className={classes.caption}>{props.caption}</span>
        {props.image.media ? (
          <img
            className={classes.media}
            src={props.image.media}
            alt={props.image.alt}
          />
        ) : (
          ""
        )}
        <ul className={classes.metrics}>
          <li>
            <img src={replyIcon} alt="reply icon -- speech bubble" />
            <span>{props.replies}</span>
          </li>
          <li>
            <img src={likeIcon} alt="like icon -- heart" />
            <span>{props.likes}</span>
          </li>
          <li>
            <img src={retweetIcon} alt="retweet icon -- swirling arrows" />
            <span>{props.retweets}</span>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default Post;

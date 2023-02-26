import React from "react";
import { useSelector } from "react-redux";
import Post from "../Posts/Post";
import classes from "./PostList.module.css";
import { truncate } from "../../util/profile";
import { replies } from "./dummy-posts";
import media from "../../assets/Posts/media-placeholder.jpg";
import placeholder from "../../assets/Posts/placeholder-img.png";

const getPostDate = (date) => {
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.toLocaleString("numeric", { day: "2-digit" });
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const EmptyPostMessage = () => {
  const username = useSelector((state) => state.profileInfo.username);

  return (
    <div className={classes["message-container"]}>
      <span className={classes.title}>{`@${username} hasn't posted yet.`}</span>
      <span className={classes.message}>
        Be sure to check back when they post something.
      </span>
    </div>
  );
};

const PostList = () => {
  const name = useSelector((state) => state.profileInfo.displayName);
  const username = useSelector((state) => state.profileInfo.username);
  const pfp = useSelector((state) => state.profileInfo.profilePic);

  const DUMMY_POSTS = [
    {
      name,
      username,
      pfp,
      date: getPostDate(new Date()),
      caption: "just setting up my twttr",
      image: { media: "", alt: "" },
      replies,
      likes: 4689,
      retweets: 634,
    },
    {
      name,
      username,
      pfp,
      date: getPostDate(new Date()),
      caption: "Dress be making my booty look good 🍑",
      image: { media, alt: "My backside in a bodycon minidress" },
      replies,
      likes: 22689,
      retweets: 834,
    },
    {
      name,
      username,
      pfp,
      date: getPostDate(new Date()),
      caption: "Heyoo check out this sick-ass portfolio 🤙",
      image: {
        media: placeholder,
        alt: "screenshot of Nikki Pinzon's portfolio website",
      },
      replies,
      likes: 53845,
      retweets: 2816,
    },
    {
      name,
      username,
      pfp,
      date: getPostDate(new Date()),
      caption: "Dress be making my booty look good 🍑",
      image: { media, alt: "My backside in a bodycon minidress" },
      replies,
      likes: 9437,
      retweets: 918,
    },
  ];

  const posts = DUMMY_POSTS.map((post) => (
    <Post
      name={post.name}
      username={post.username}
      date={post.date}
      caption={post.caption}
      image={{ media: post.image.media, alt: post.image.alt }}
      replies={post.replies.length !== 0 ? truncate(post.replies.length) : ""}
      likes={post.likes ? truncate(post.likes) : ""}
      retweets={post.retweets ? truncate(post.retweets) : ""}
    />
  ));

  return (
    <ul className={classes.list}>
      {posts.length !== 0 ? posts : <EmptyPostMessage />}
    </ul>
  );
};

export default PostList;

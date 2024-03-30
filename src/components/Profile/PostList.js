import React from "react";
import { useSelector } from "react-redux";
import Post from "../Posts/Post";
import classes from "./PostList.module.css";
import { truncate } from "../../util/profile";
import { replies } from "./dummy-posts";
import postPic1 from "../../assets/Posts/cool-cat.jpg";
import postPic2 from "../../assets/Posts/outta-this-world.jpg";
import postPic3 from "../../assets/Posts/bold-and-brash.webp";

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
      caption: "I'm a cool cat 😎🐈",
      image: { media: postPic1, alt: "cat wearing goggles with vibrant colors" },
      replies,
      likes: 22689,
      retweets: 834,
    },
    {
      name,
      username,
      pfp,
      date: getPostDate(new Date()),
      caption: "I'm outta this world 🤙🌌",
      image: {
        media: postPic2,
        alt: "astronaut reclining in outerspace with vibrant colors",
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
      caption: "Bold and Brash (more like belongs in the trash) 💥",
      image: { media: postPic3, alt: "abstract stylized oil painting of Squidward by Squidward (from Spongebob Squarepants)" },
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

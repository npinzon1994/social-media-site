import React from "react";
import classes from "./PostButton.module.css";
import { useDispatch } from "react-redux";
import { showHideModalActions } from "../../store/redux/show-hide-modal-slice";

const PostButton = (props) => {
  const dispatch = useDispatch();

  const showNewPostWindow = () => {
    dispatch(showHideModalActions.setIsPosting(true));
  };

  return (
    <button
      className={`${classes["new-post"]} ${props.className}`}
      onClick={showNewPostWindow}
      disabled={props.disabled}
      type={props.type || "button"}
    >
      Post
    </button>
  );
};

export default PostButton;

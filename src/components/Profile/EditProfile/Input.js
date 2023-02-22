import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const isInput = props.element === "input";
  const isTextarea = props.element === "textarea";
  return (
    <div className={classes["input-div"]}>
      {isInput ? (
        <input
          {...props.register}
          type={props.type || "text"}
          id={props.id}
          className={`${classes.input} ${
            props.afterFocus && classes["after-focus"]
          }`}
          maxLength={props.maxLength}
        />
      ) : (
        ""
      )}

      {isTextarea ? (
        <textarea
          {...props.register}
          type={props.type}
          id={props.id}
          className={`${classes.textarea} ${
            props.afterFocus && classes["after-focus"]
          }`}
          maxLength={props.maxLength}
          rows={props.rows || "2"}
        />
      ) : (
        ""
      )}

      <div className={classes["placeholder-character-div"]}>
        <label htmlFor={props.id} className={classes.placeholder}>
          {props.placeholder}
        </label>
        <label className={classes.characters}>
          <span>{`${props.charactersEntered}/${props.maxLength}`}</span>
        </label>
      </div>
    </div>
  );
};

export default Input;

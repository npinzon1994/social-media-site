import React, { useState, useRef, useEffect } from "react";
import classes from "./NewPost.module.css";
import Modal from "../UI/Modal";
import { useDispatch } from "react-redux";
import { showHideModalActions } from "../../store/redux/show-hide-modal-slice";
import CloseButtonX from "../UI/CloseButtonX";
import PostButton from "../UI/PostButton";
import ProfilePicIcon from "../UI/ProfilePicIcon";
import MediaUploadIcon from "../UI/MediaUploadIcon";
import imageIcon from "../../assets/Posts/image.svg";
import gifIcon from "../../assets/Posts/gif.svg";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useUpload from "../../hooks/use-upload";
import useSubmitImage from "../../hooks/use-submit-image";
import TextareaAutosize from "react-textarea-autosize";
import MediaToUpload from "./MediaToUpload";
import MediaList from "./MediaList";

const NewPost = () => {
  const dispatch = useDispatch();
  const [characters, setCharacters] = useState(0);
  const inputRef = useRef();

  const { files, sourceElement, uploadImage } = useUpload();
  const { submitImageToFirebase, media } = useSubmitImage();

  const percentage = (characters / 280) * 100;
  const charactersLeft = 280 - characters;

  const styles = {
    path:
      charactersLeft > 20
        ? { stroke: "#ad5dfd" }
        : charactersLeft === 0
        ? { stroke: "rgb(253, 46, 46)" }
        : { stroke: "#FFD73B" },
  };

  const inputChangeHandler = (event) => {
    setCharacters(event.target.value.length);
  };

  const hidePostWindow = () => {
    dispatch(showHideModalActions.setIsPosting(false));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    console.log("FILES CHANGED!!");
    submitImageToFirebase(files, sourceElement);
  }, [files, sourceElement, submitImageToFirebase]);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Submitting...");
  };

  const deleteImageHandler = () => {
    
  };

  const mediaToBePosted = media.map((file) => (
    <MediaToUpload src={file} alt="" onDelete={deleteImageHandler} />
  ));

  return (
    <Modal onClose={hidePostWindow} className={classes["modal-window"]}>
      <div className={classes["outer-container"]}>
        <CloseButtonX onClose={hidePostWindow} />
        <div className={classes["post-info-wrapper"]}>
          <div className={classes["pfp-container"]}>
            <ProfilePicIcon />
          </div>
          <div className={classes["post-info-container"]}>
            <form onSubmit={submitHandler}>
              <TextareaAutosize
                ref={inputRef}
                className={classes["post-body"]}
                placeholder="What's happening?"
                maxLength="280"
                onChange={inputChangeHandler}
                minRows={media.length > 0 ? 1 : 4}
              ></TextareaAutosize>

              <MediaList>{mediaToBePosted}</MediaList>

              {/* {characters ? <p>{characters}/280</p> : <p>0/280</p>} */}
              <div className={classes["media-upload-wrapper"]}>
                <div className={classes["media-upload-container"]}>
                  <MediaUploadIcon
                    type="file"
                    id="media-upload"
                    src={imageIcon}
                    alt="image icon"
                    accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG, .mp4, .MP4, .mov, .MOV"
                    onUploadImage={uploadImage}
                    multiple={true}
                  />
                  <MediaUploadIcon
                    id="gif-upload"
                    src={gifIcon}
                    alt="gif icon"
                    accept=".gif"
                    onUploadImage={uploadImage}
                  />
                </div>
                <div className={classes["progress-post-container"]}>
                  <div
                    className={`${classes["progress-bar-container"]} ${
                      characters >= 260 ? classes["getting-full"] : ""
                    }`}
                  >
                    {percentage ? (
                      <CircularProgressbarWithChildren
                        minValue={0}
                        maxValue={100}
                        value={percentage}
                        styles={styles}
                      >
                        {charactersLeft <= 20 && (
                          <span
                            className={`${classes["characters-left"]} ${
                              charactersLeft === 0
                                ? classes["zero-characters-left"]
                                : ""
                            }`}
                          >
                            {charactersLeft}
                          </span>
                        )}
                      </CircularProgressbarWithChildren>
                    ) : (
                      ""
                    )}
                  </div>
                  <PostButton
                    disabled={!characters}
                    className={`${classes["post-button"]} ${
                      !characters && !media ? classes.disabled : ""
                    }`}
                    type="submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewPost;

import { useCallback, useState } from "react";
import { storage } from "../firebase";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";

let newBannerPicURL = "";
let newProfilePicURL = "";

const useSubmitImage = () => {
  const [percent, setPercent] = useState(0);
  const submitImageToFirebase = useCallback(async (file, sourceElement) => {
    console.log("Start of upload...");

    try {
      if (file === "") {
        throw new Error(
          `${typeof file} is not a supported file type! Please upload either .png or .jpg.`
        );
      }
      const storageRefToBeSent = storageRef(storage, `/images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRefToBeSent, file);

      //showing upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
        },
        //handling potential errors
        (err) => console.log(err.message),
        async () => {
          //download url
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          if (sourceElement === "banner-upload") {
            newBannerPicURL = url;
          }
          if (sourceElement === "pfp-upload") {
            newProfilePicURL = url;
          }
          console.log("SUCCESSFULLY UPLOADED BANNER IMAGE!!");
          console.log("New Banner Pic URL:", newBannerPicURL);
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return {
    percent,
    submitImageToFirebase,
    newBannerPicURL,
    newProfilePicURL,
  };
};

export default useSubmitImage;

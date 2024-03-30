import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { storage } from "../firebase";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";

const useSubmitImage = () => {
  const loadedBannerPic = useSelector((state) => state.profileInfo.bannerPic);
  const loadedProfilePic = useSelector((state) => state.profileInfo.profilePic);

  const [pfpState, setPfp] = useState(loadedProfilePic);
  const [bannerState, setBanner] = useState(loadedBannerPic);
  const [mediaState, setMedia] = useState([]);
  // const [percent, setPercent] = useState(0);


  const submitImageToFirebase = useCallback(
    (files, sourceElement) => {
      files.forEach(function (file) {
        try {
          console.log("Looping through files");
          const storageRefToBeSent = storageRef(
            storage,
            `/images/${file.name}`
          );

          const uploadTask = uploadBytesResumable(storageRefToBeSent, file);

          //showing upload progress
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // const percent = Math.round(
              //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              // );
              // setPercent(percent);
            },
            //handling potential errors
            (err) => console.log(err),
            async () => {
              //download url
              console.log("Upload done, getting download URL...");
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("Received download URL: ", url);
              if (sourceElement === "media-upload") {
                setMedia((prevState) => [...prevState, url]);
              }

              if (sourceElement === "banner-upload") {
                setBanner(url);
              }
              if (sourceElement === "pfp-upload") {
                setPfp(url);
              }
            }
          );
        } catch (error) {
          console.log(error.message);
        }
      })
    },
    []
  );

  return {
    submitImageToFirebase,
    newBannerPic: bannerState,
    newProfilePic: pfpState,
    media: mediaState,
    setBanner,
  };
};

export default useSubmitImage;

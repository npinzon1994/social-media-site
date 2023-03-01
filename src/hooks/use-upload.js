import { useState } from "react";

let sourceElement = "";

const useUpload = () => {
  const [files, setFiles] = useState([]);

  const uploadImage = (event) => {
    console.log("ELEMENT THAT TRIGGERED THIS EVENT:", event.target.id);
    if (
      event.target.id === "banner-upload" ||
      event.target.id === "pfp-upload" ||
      event.target.id === "media-upload"
    ) {
      sourceElement = event.target.id;
    }


    const imagesToBeSent = [];
    const uploadedImages = [...event.target.files];
    for(let i=0; i<4; i++){
      const imageFile = uploadedImages[i];
      console.log("Image " + (i+1), uploadedImages[i]);
      imagesToBeSent.push(imageFile);
    }

    setFiles(imagesToBeSent);
  };

  return { files, sourceElement, uploadImage };
};

export default useUpload;

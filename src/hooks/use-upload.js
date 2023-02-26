import { useState } from "react";

let sourceElement = "";

const useUpload = () => {
  const [file, setFile] = useState();

  const uploadImage = (event) => {
    console.log("ELEMENT THAT TRIGGERED THIS EVENT:", event.target.id);
    if (
      event.target.id === "banner-upload" ||
      event.target.id === "pfp-upload" ||
      event.target.id === "media-upload"
    ) {
      sourceElement = event.target.id;
    }
    const image = event.target.files[0];
    setFile((file) => image);
  };

  return { file, sourceElement, uploadImage };
};

export default useUpload;

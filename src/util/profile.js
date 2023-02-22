export const defaultProfilePic =
  "https://firebasestorage.googleapis.com/v0/b/social-media-app-2cfba.appspot.com/o/blank-profile-pic.svg?alt=media&token=54c70d5a-66a1-4b7f-bcf1-addf2064e31f";
export const defaultBannerPic =
  "https://firebasestorage.googleapis.com/v0/b/social-media-app-2cfba.appspot.com/o/default-banner.png?alt=media&token=374c39af-1dfe-4537-b4e3-5fbf2eef2149";

export const setInitialUserInfo = (id, email) => {
  localStorage.setItem("ID", id);
  const username = email.split("@")[0];
  localStorage.setItem("USERNAME", username);
  localStorage.setItem("DATE_JOINED", getDateJoined());
};

export const getDateJoined = () => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return month + " " + year;
};

export const truncate = (followers) => {
  let convertedString = followers.toString();
  let followerCount = "";
  if (followers > 999 && followers < 10000) {
    const leftOfComma = convertedString.substring(0, 1);
    const rightOfComma = convertedString.substring(1, 4);
    followerCount = leftOfComma + "," + rightOfComma;
    return followerCount;
  }

  if (followers > 9999 && followers < 100000) {
    if (followers % 1000 >= 1 && followers % 1000 <= 99) {
      followerCount = convertedString.substring(0, 2) + "K";
      return followerCount;
    }
    const leftOfDecimal = convertedString.substring(0, 2);
    const rightOfDecimal = convertedString.substring(2, 3);
    followerCount = leftOfDecimal + "." + rightOfDecimal + "K";
    return followerCount;
  }

  if (followers > 99999 && followers < 1000000) {
    if (followers % 1000 >= 0 && followers % 1000 <= 99) {
      followerCount = convertedString.substring(0, 3) + "K";
      return followerCount;
    }
    const leftOfDecimal = convertedString.substring(0, 3);
    const rightOfDecimal = convertedString.substring(3, 4);
    followerCount = leftOfDecimal + "." + rightOfDecimal + "K";
    return followerCount;
  }
  return convertedString;
};

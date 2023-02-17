import { createSlice } from "@reduxjs/toolkit";
import blankPfp from "../../assets/Profile/blank-profile-pic.svg";
import defaultBanner from "../../assets/Profile/default-banner.png";

//THIS IS JUST DUMMY DATA FOR TESTING -- JUST FOR NOW
const initialState = {
  id: "TVIAsUgbVvSc4qeguOQ7E7wkXsI2",
  username: "npinzon1994",
  displayName: "Nikki Pinzon 💜",
  profilePic: blankPfp,
  bannerPic: defaultBanner,
  bio: "Hi i'm Nikki and I like to develop apps n shake my booty < /> 🍑",
  website: "https://nikkipinzon.com",
  dateJoined: "February 2023",
  following: 165,
  followers: 109050,
  posts: [],
  numberOfPosts: 12500,
  messageThreads: [],
};

const profileInfoSlice = createSlice({
  name: "acctInfo",
  initialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setDisplayName(state, action) {
      state.displayName = action.payload;
    },
    setProfilePic(state, action) {
      state.profilePic = action.payload;
    },
    setBannerPic(state, action) {
      state.bannerPic = action.payload;
    },
    setBio(state, action) {
      state.bio = action.payload;
    },
    setWebsite(state, action) {
      state.website = action.payload;
    },
    setDateJoined(state, action) {
      state.dateJoined = action.payload;
    },
    setFollowing(state, action) {
      state.following = action.payload;
    },
    setFollowers(state, action) {
      state.followers = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setMessageThreads(state, action) {
      state.messageThreads = action.payload;
    },
  },
});

export const profileInfoActions = profileInfoSlice.actions;
export default profileInfoSlice.reducer;

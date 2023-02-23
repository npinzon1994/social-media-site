import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  displayName: "",
  profilePic: "",
  bannerPic: "",
  bio: "",
  website: "",
  dateJoined: null,
  following: 0,
  followers: 0,
  posts: [],
  numberOfPosts: 0,
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
    setNumberOfPosts(state, action) {
      state.posts = action.payload;
    },
    setMessageThreads(state, action) {
      state.messageThreads = action.payload;
    },
  },
});

export const profileInfoActions = profileInfoSlice.actions;
export default profileInfoSlice.reducer;

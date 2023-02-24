import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditing: false,
  isDiscarding: false,
  isSubmitting: false
};

const showHideModalSlice = createSlice({
  name: "discardChanges",
  initialState,
  reducers: {
    setIsEditing(state, action) {
      state.isEditing = action.payload;
    },
    setIsDiscarding(state, action) {
      state.isDiscarding = action.payload;
    },
    setIsSubmitting(state, action) {
      state.isSubmitting = action.payload;
    },
  },
});

export const showHideModalActions = showHideModalSlice.actions;
export default showHideModalSlice.reducer;

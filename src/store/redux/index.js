import { configureStore } from "@reduxjs/toolkit";
import profileInfoReducer from "./profile-info-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, profileInfoReducer);

export const store = configureStore({
  reducer: {
    profileInfo: persistedReducer
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);

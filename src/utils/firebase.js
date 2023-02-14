import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCd-2UMSmTcKk64Q7Dy_XwpeQDnrYQ470",
  authDomain: "social-media-app-2cfba.firebaseapp.com",
  projectId: "social-media-app-2cfba",
  storageBucket: "social-media-app-2cfba.appspot.com",
  messagingSenderId: "905247307668",
  appId: "1:905247307668:web:a2b2d9cd7984fc44934181",
  measurementId: "G-7KF4X8VBZ3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

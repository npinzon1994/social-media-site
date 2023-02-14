// import React, { useEffect, useState } from "react";
// import AuthContext from "./auth-context";
// import { auth } from "../utils/firebase";

// const AuthProvider = (props) => {
//   const [currentUser, setCurrentUser] = useState();

//   const signup = (email, password) => {
//     //creates user but DOES NOT SET it to the database
//     return auth.createUserWithEmailAndPassword(email, password);
//   };

//   useEffect(() => {
//     //firebase's way of notifying us whenever the user gets set
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user); //this method allows us to set the user
//     });

//     //we want to unsubscribe whenever we're done.
//     //onAuthStateChanged() returns a method that will unsubscribe (when we call it)

//     return unsubscribe; //unsubscribes at unmount -- cleanup
//   }, []);

//   const authContext = {
//     currentUser,
//     signup
//   };

//   return (
//     <AuthContext.Provider value={authContext}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

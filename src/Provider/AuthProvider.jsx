import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";

  import swal from "sweetalert";
import auth from "../firebase/firebase.config";
  
  const googleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();
  export const AuthContext = createContext(null);
  // eslint-disable-next-line react/prop-types
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    //create user
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
    //sign in
    const signInUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
    //google Login
    const googleLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    };
    //github sign in
    const githubLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, GithubProvider);
    };
    //log out
    const logOut = () => {
      setLoading(true);
      // setUser(null);
      return signOut(auth).then(() => {
        swal("Good job!", "Successfully Logged out!", "success");
      });
    };
  
    // update user profile
    const updateUserProfile = (name, photoURL) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
    };
  
    //on auth state change
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log("userIn then on state changes", currentUser);
        setUser(currentUser);
        setLoading(false);
      });
      return () => {
        unSubscribe();
      };
    }, []);
  
    const authInfo = {
      user,
      setUser,
      loading,
      setLoading,
      createUser,
      signInUser,
      googleLogin,
      githubLogin,
      logOut,
      updateUserProfile,
    };
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
  };
  
  export default AuthProvider;
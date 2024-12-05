import { auth } from "../firebaseConfig.js";

import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    updatePassword,
    signInWithPopup, } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const doSignOut = () => {
    return auth.signOut();
}

export const doPasswordReset = email => {
    return sendPasswordResetEmail(auth, email);
}

export const doPasswordUpdate = password => {
    return updatePassword(auth.currentUser, password);
}

export const doSendVerificationEmail = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
      });
}
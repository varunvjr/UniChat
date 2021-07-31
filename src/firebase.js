import firebase from 'firebase/app';
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const auth=firebase.initializeApp( {
    apiKey: "AIzaSyC492mN_0jzvh8m1Cvo1VEm6_8jMCEsi2k",
    authDomain: "unichat-8d28d.firebaseapp.com",
    projectId: "unichat-8d28d",
    storageBucket: "unichat-8d28d.appspot.com",
    messagingSenderId: "34053846665",
    appId: "1:34053846665:web:2a66113ded91c5536b3858",
    measurementId: "G-BFZFL72FQ6"
  }).auth();
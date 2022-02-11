import firebase from "firebase/app";
import "firebase/auth";
// firebase config
const config = {
    apiKey: "AIzaSyDBGDeniQ3hKFoXkKv5-lSXCNfIJxYM-H4",
    authDomain: "ecommerce-997ce.firebaseapp.com",
    projectId: "ecommerce-997ce",
    storageBucket: "ecommerce-997ce.appspot.com",
    messagingSenderId: "500745066044",
    appId: "1:500745066044:web:bd501cd92b88781db69539"
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

const provider = new GoogleAuthProvider();
export const mapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;


export const saveUserInformation = async (userObject: any) => {
  localStorage.setItem("userObject", JSON.stringify(userObject));
  const usersCollectionReference = collection(db, "users/");
  const userDocRef = doc(usersCollectionReference, userObject.user_id);
  await setDoc(userDocRef, userObject).then(() => {
    window.location.reload();
    console.log("saving user to storage");
  });
};

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      const userId = result.user.uid;
      const userObject = {
        name: name,
        email: email,
        profile_pic: profilePic,
        user_id: userId,
      };
      saveUserInformation(userObject);
    })
    .catch((error) => {
      alert(error);
    });
};

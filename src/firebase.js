import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCrX7riAFr4g4IZueM37m6xAG-M1oLf-lc",
  authDomain: "netflix-clone-95e4b.firebaseapp.com",
  projectId: "netflix-clone-95e4b",
  storageBucket: "netflix-clone-95e4b.appspot.com",
  messagingSenderId: "642188149582",
  appId: "1:642188149582:web:e40edffba2888c1508141f",
  measurementId: "G-Y1B2WK1H55"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
  } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const logout = () => {
  signOut(auth)
}

export {auth, db, login, signup, logout}
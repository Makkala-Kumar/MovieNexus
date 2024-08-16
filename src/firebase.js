
import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAxZH0LVs4E52DWYGp2Qv9tg9kz6IZZFn8",
  authDomain: "movienexus-24f62.firebaseapp.com",
  projectId: "movienexus-24f62",
  storageBucket: "movienexus-24f62.appspot.com",
  messagingSenderId: "976661343790",
  appId: "1:976661343790:web:71f7d7fc7963841f75f9bf",
  measurementId: "G-DRTC8MVDCR"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password)=>{
    try{
       const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password)
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}


export {auth, db, login, signup, logout};
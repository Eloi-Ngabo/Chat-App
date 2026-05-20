
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc,doc } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq2SLQ3dztzbCJY0EGASD16dtsE8NE2os",
  authDomain: "chat-app-gs-d5b91.firebaseapp.com",
  projectId: "chat-app-gs-d5b91",
  storageBucket: "chat-app-gs-d5b91.firebasestorage.app",
  messagingSenderId: "247201764550",
  appId: "1:247201764550:web:6f6bc341ed74a70bed33c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth,email,password);
      const user = res.user
      await setDoc(doc(db,"users",user.uid),{
        id:user.uid,
        username:username.toLowerCase(),
        email,
        name:"",
        avatar:"",
        bio:"Hey, There i am using chat app",
        lastSeen:Date.now()
      })
      await setDoc(doc(db,"chats",user.uid),{
        chatData:[]
      })
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }

}
const login =async (email,password) =>{
  try {
    await signInWithEmailAndPassword(auth,email,password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }

}

const logout = async() => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error(error);
  toast.error(error.code.split('/')[1].split('-').join(" "));
    
  }
}



export {signup,login}
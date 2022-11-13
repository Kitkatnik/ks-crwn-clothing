// Import the functions needed
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'


// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjpoipkcG9odZ-5-4_wsjbhvBU_EfAlhI",
  authDomain: "crwn-clothing-db-52d4b.firebaseapp.com",
  projectId: "crwn-clothing-db-52d4b",
  storageBucket: "crwn-clothing-db-52d4b.appspot.com",
  messagingSenderId: "797281922981",
  appId: "1:797281922981:web:715ae613ba42a2e612824c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc( db, 'users',userAuth.uid );
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch ( error ){
            console.log('error creating the user', error.message);
        }
    } 

    return userDocRef;
}
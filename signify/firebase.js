// firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import * as AuthSession from "expo-auth-session";

// Konfigurimi i Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAvfWwHS1ZB72KJbVxNuCZVUQRYuGVdrJk",
  authDomain: "signify-1046f.firebaseapp.com",
  projectId: "signify-1046f",
  storageBucket: "signify-1046f.firebasestorage.app",
  messagingSenderId: "278737596733",
  appId: "1:278737596733:web:f4ecad7b53d030e52d5554"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Funksion login me email/password
export const handleLogin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Funksion login me Google (Expo + Firebase)
export const handleGoogleLogin = async () => {
  try {
    const redirectUri = AuthSession.makeRedirectUri({
      useProxy: true, // kjo e bën të funksionojë në Expo Go
    });

    // Kjo është URI që duhet regjistruar në Firebase / Google Cloud:
    // https://auth.expo.io/@arilabehrami/signify

    const result = await AuthSession.startAsync({
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=profile email`,
    });

    if (result.type === "success") {
      // këtu mund ta lidhësh me Firebase për të marrë credential-et
      console.log("Google login success", result);
    }
  } catch (error) {
    console.log("Google login error:", error);
  }
};

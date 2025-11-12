import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import * as AuthSession from "expo-auth-session";

const firebaseConfig = {
  apiKey: "AIzaSyAvfWwHS1ZB72KJbVxNuCZVUQRYuGVdrJk",
  authDomain: "signify-1046f.firebaseapp.com",
  projectId: "signify-1046f",
  storageBucket: "signify-1046f.firebasestorage.app",
  messagingSenderId: "278737596733",
  appId: "1:278737596733:web:f4ecad7b53d030e52d5554"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const handleLogin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const handleGoogleLogin = async () => {
  try {
    const redirectUri = AuthSession.makeRedirectUri({
      useProxy: true, 
    });

    const result = await AuthSession.startAsync({
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=profile email`,
    });

    if (result.type === "success") {
      console.log("Google login success", result);
    }
  } catch (error) {
    console.log("Google login error:", error);
  }
};

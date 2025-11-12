import React, { useEffect } from "react";
import { View, Button, Text, Alert, Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { auth, signInWithCredential } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "278737596733-1jsj4ege6no7vkgjs2dg95advu9740fi.apps.googleusercontent.com",
    responseType: "id_token", 
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      if (!id_token) return; 
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(() => console.log("Përdoruesi hyri me Google!"))
        .catch((error) => {
          console.log(error.message);
          Alert.alert("Error", error.message);
        });
    } else if (response?.type === "error") {
      console.log("Google login error", response.error);
      Alert.alert("Error", response.error || "Google login failed");
    }
  }, [response]);

  const handlePress = async () => {
    try {
      if (Platform.OS === "web") {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log("User logged in (web):", result.user);
      } else {
        await promptAsync({ useProxy: true });
      }
    } catch (err) {
      console.log("Prompt error:", err);
      Alert.alert("Error", err.message || "Google login failed");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Hyr me Google</Text>
      <Button title="Vazhdo me Google" disabled={!request && Platform.OS !== "web"} onPress={handlePress} />
    </View>
  );
}

# Signify

**Signify** is a React Native/Expo application that allows users to securely sign in using Google Sign-In. This project supports **mobile (iOS/Android)** and **web** using Firebase Authentication.

---

## Features

- Google Login (Firebase Authentication)
- Works on both mobile and web
- Popup is automatically handled for web and mobile
- Easy Firebase integration

---

## Folder Structure

signify/  
├─ app/  
│  ├─ GoogleLogin.jsx – Component for Google Sign-In  
│  └─ index.jsx – Entry point for the app  
├─ firebase.js – Firebase configuration  
├─ package.json  
└─ README.md  

---

## Installation

1. Clone the project  
2. Install dependencies: `npm install` or `yarn install`

---

## Configuration

1. Create a project in Firebase  
2. Enable **Google Sign-In** in Authentication → Sign-in method  
3. Add the Web Client ID in `app/GoogleLogin.jsx`:

```javascript
webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com"

4. For Web, add this redirect URI in Google Cloud Console → OAuth Client:

https://auth.expo.io/@USERNAME/signify


5. Make sure the domain auth.expo.io is authorized in Firebase (Authentication → Authorized domains)

Mobile (iOS/Android)
expo start
Scan the QR code with Expo Go and open the app
Click "Continue with Google" to sign in

Web
expo start --web
Open the link in your browser
Click "Continue with Google" to sign in

This project is licensed under the MIT License.
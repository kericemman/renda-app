import { Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com"
  });
};





export const getGoogleProfileFromToken = async (accessToken) => {
  const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Google profile");
  }

  const profile = await response.json();

  return {
    provider: "google",
    providerId: profile.id,
    name: profile.name,
    email: profile.email,
    avatar: profile.picture
  };
};


export const signInWithApple = async () => {
  if (Platform.OS !== "ios") {
    throw new Error("Apple Sign-In is only available on iOS");
  }

  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL
    ]
  });

  const fullName = credential.fullName
    ? [credential.fullName.givenName, credential.fullName.familyName]
        .filter(Boolean)
        .join(" ")
    : "";

  return {
    provider: "apple",
    providerId: credential.user,
    name: fullName || "Apple User",
    email: credential.email || `${credential.user}@apple.private`,
    avatar: ""
  };
};
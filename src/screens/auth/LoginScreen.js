import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { signInWithApple, signInWithGoogle } from "../../services/socialAuthService";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { getGoogleProfileFromToken } from "../../services/socialAuthService";



import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import AppInput from "../../components/common/AppInput";
import CustomButton from "../../components/common/CustomButton";
import useAuth from "../../hooks/useAuth";
import ROUTES from "../../constants/routes";
import colors from "../../constants/colors";

export default function LoginScreen({ route, navigation }) {

  WebBrowser.maybeCompleteAuthSession();
  
  const { login, socialLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const redirectAfterLogin = () => {

    const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: "YOUR_ANDROID_CLIENT_ID",
      iosClientId: "YOUR_IOS_CLIENT_ID",
      webClientId: "YOUR_WEB_CLIENT_ID"
    });

    if (route.params?.redirectTab && route.params?.redirectTo) {
      navigation.navigate(route.params.redirectTab, {
        screen: route.params.redirectTo,
        params: {
          listing: route.params.listing
        }
      });
      return;
    }

    if (route.params?.redirectTo && route.params?.listing) {
      navigation.replace(route.params.redirectTo, {
        listing: route.params.listing
      });
      return;
    }

    navigation.goBack();
  };

  const handleEmailLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing details", "Enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await login({
        email: email.trim(),
        password
      });

      redirectAfterLogin();
    } catch (error) {
      Alert.alert(
        "Login failed",
        error?.response?.data?.message || "Could not sign in."
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const handleGoogleResponse = async () => {
      if (response?.type === "success") {
        try {
          const accessToken = response.authentication.accessToken;
          const profile = await getGoogleProfileFromToken(accessToken);

          await socialLogin(profile);
          redirectAfterLogin();
        }
          catch (error) {
            Alert.alert("Google sign-in failed", error.message);
          }
        
      }
    };

    handleGoogleResponse();
  }, [response]);

  const handleAppleLogin = async () => {
    try {
      const profile = await signInWithApple();
      await socialLogin(profile);
      redirectAfterLogin();
    } catch (error) {
      Alert.alert(
        "Apple sign-in failed",
        error?.message || "Could not continue with Apple."
      );
    }
  };

 

  return (
    <ScreenWrapper>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={colors.white} />
          </TouchableOpacity>

          

          <Text style={styles.heroTitle}>Welcome back</Text>
          <Text style={styles.heroSubtitle}>
            Sign in to contact landlords, track inquiries, and continue your home search.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Sign in to your account</Text>
          <Text style={styles.formSubtitle}>
            Use your email and password to continue.
          </Text>

          <AppInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <View style={styles.passwordWrapper}>
            <AppInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={21}
                color={colors.textSoft}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <CustomButton
            title="Sign In"
            loading={loading}
            onPress={handleEmailLogin}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
            <Text style={styles.socialButtonText}>Sign in with</Text>
            <Ionicons name="logo-google" size={20} color={colors.text} />
            
          </TouchableOpacity> */}

          <CustomButton
            title="Continue with Google"
            variant="secondary"
            disabled={!request}
            onPress={() => promptAsync()}
          />

          {Platform.OS === "ios" ? (
            <>
              <View style={{ height: 12 }} />
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={14}
                style={{ width: "100%", height: 52 }}
                onPress={handleAppleLogin}
              />
            </>
          ) : null}

          <View style={styles.footer}>
            <Text style={styles.footerText}>New to RendaHomes?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.ACCOUNT_TYPE, { ...route.params })}
            >
              <Text style={styles.footerLink}>Create account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    backgroundColor: colors.background
  },
  hero: {
    backgroundColor: colors.accent,
    paddingHorizontal: 24,
    paddingTop: 58,
    paddingBottom: 34,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26
  },

  
  heroTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.7
  },
  heroSubtitle: {
    color: "#D1FAE5",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    maxWidth: "92%"
  },
  formCard: {
    margin: 16,
    marginTop: -18,
    backgroundColor: colors.white,
    borderRadius: 26,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 5
  },
  formSubtitle: {
    color: colors.textSoft,
    lineHeight: 20,
    marginBottom: 18
  },
  passwordWrapper: {
    position: "relative"
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    top: 38,
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginTop: -2,
    marginBottom: 18
  },
  forgotText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600"
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border
  },
  dividerText: {
    marginHorizontal: 12,
    color: colors.textSoft,
    fontSize: 12,
    fontWeight: "700"
  },
  socialButton: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginBottom: 12,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  socialButtonText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: "500"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    gap: 6
  },
  footerText: {
    fontSize: 14,
    color: colors.textSoft
  },
  footerLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600"
  }
});
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

import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import AppInput from "../../components/common/AppInput";
import CustomButton from "../../components/common/CustomButton";
import useAuth from "../../hooks/useAuth";
import ROUTES from "../../constants/routes";
import colors from "../../constants/colors";


export default function SignupScreen({ route, navigation }) {
  const { signup, socialLogin } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const redirectAfterSignup = () => {
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

  const handleEmailSignup = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert("Missing details", "Please complete all fields.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak password", "Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Passwords do not match.");
      return;
    }

    

    try {
      setLoading(true);

      await signup({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password,
        role: "user"
      });

     

    await signup(payload);


      redirectAfterSignup();
    } catch (error) {
      Alert.alert(
        "Signup failed",
        error?.response?.data?.message || "Could not create account."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const profile = await signInWithGoogle();
      await socialLogin(profile);
      redirectAfterSignup();
    } catch (error) {
      Alert.alert(
        "Google sign-up failed",
        error?.message || "Could not continue with Google."
      );
    }
  };

  const handleAppleSignup = async () => {
    try {
      const profile = await signInWithApple();
      await socialLogin(profile);
      redirectAfterSignup();
    } catch (error) {
      Alert.alert(
        "Apple sign-up failed",
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

          <Text style={styles.heroTitle}>Create account</Text>
          <Text style={styles.heroSubtitle}>
            Join RendaHomes to contact landlords, track inquiries, and receive important property updates.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Get started</Text>
          <Text style={styles.formSubtitle}>
            Create your account using your email and phone number.
          </Text>

          <AppInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
          />

          <AppInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <AppInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />

          <View style={styles.passwordWrapper}>
            <AppInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
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

          <View style={styles.passwordWrapper}>
            <AppInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry={!showConfirmPassword}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword((prev) => !prev)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={21}
                color={colors.textSoft}
              />
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Create Account"
            variant="primary"
            loading={loading}
            onPress={handleEmailSignup}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignup}>
            <Ionicons name="logo-google" size={20} color={colors.text} />
            <Text style={styles.socialButtonText}>Sign up with Google</Text>
          </TouchableOpacity>

          {Platform.OS === "ios" ? (
            <>
              <View style={{ height: 12 }} />
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={14}
                style={{ width: "100%", height: 52 }}
                onPress={handleAppleSignup}
              />
            </>
          ) : null}

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.LOGIN, { ...route.params })}
            >
              <Text style={styles.footerLink}>Sign in</Text>
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
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26
  },
  heroTitle: {
    color: colors.white,
    fontSize: 25,
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
    fontWeight: "800",
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
    fontWeight: "700"
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
    fontWeight: "800"
  }
});
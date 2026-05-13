import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";

export default function UniversalLoader({
  title = "Loading RendaHomes",
  message = "Preparing listings and updates..."
}) {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Text style={styles.logoText}>RH</Text>
      </View>

      <ActivityIndicator size="large" color={colors.primary} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22
  },
  logoText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "900"
  },
  title: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: "800",
    color: colors.text
  },
  message: {
    marginTop: 8,
    color: colors.textSoft,
    textAlign: "center",
    lineHeight: 20
  }
});
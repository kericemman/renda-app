import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";

export default function PurposeBadge({ purpose, type }) {
  const label =
    type === "office"
      ? "OFFICE"
      : String(purpose || "rent").toUpperCase();

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(15, 118, 110, 0.95)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999
  },
  text: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.3
  }
});
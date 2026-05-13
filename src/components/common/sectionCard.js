import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../constants/colors";
import theme from "../../constants/theme";

export default function SectionCard({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    ...theme.shadow.soft
  }
});
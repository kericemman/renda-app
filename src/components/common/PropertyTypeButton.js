import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";

export default function PropertyTypeButton({ label, onPress, active = false }) {
  return (
    <Pressable onPress={onPress} style={[styles.button, active && styles.activeButton]}>
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 34,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  activeButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize"
  },
  activeLabel: {
    color: colors.white,
    fontWeight: "700"
  }
});
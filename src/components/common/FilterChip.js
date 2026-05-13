import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";

export default function FilterChip({ label, active = false, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.activeChip]}>
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8
  },
  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  label: {
    color: colors.textSoft,
    fontWeight: "700",
    fontSize: 13
  },
  activeLabel: {
    color: colors.white
  }
});
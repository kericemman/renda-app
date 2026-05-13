import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

export default function SearchInput({
  value,
  onChangeText,
  placeholder = "Search...",
  editable = true
}) {
  return (
    <View style={[styles.container, !editable && styles.disabled]}>
      <Ionicons name="search-outline" size={20} color={colors.muted} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        editable={editable}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 52,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14
  },
  disabled: {
    backgroundColor: "#F1F5F9"
  },
  icon: {
    marginRight: 8
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15
  }
});
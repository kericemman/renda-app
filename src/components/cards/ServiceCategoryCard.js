import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

export default function ServiceCategoryCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name={item.icon || "grid-outline"} size={24} color={colors.primary} />
      </View>

      <Text style={styles.title}>{item.name}</Text>
      <Text numberOfLines={2} style={styles.description}>
        {item.description}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text
  },
  description: {
    marginTop: 6,
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 18
  }
});
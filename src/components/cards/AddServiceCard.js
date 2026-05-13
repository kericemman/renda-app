import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

export default function AddServiceCard({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name="add" size={26} color={colors.white} />
      </View>

      <Text style={styles.title}>List Your Service</Text>
      <Text style={styles.description}>
        Reach tenants and landlords looking for trusted services.
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: "#ECFDF5",
    alignItems: "flex-start"
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  title: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text
  },
  description: {
    marginTop: 6,
    fontSize: 13,
    color: colors.textSoft,
    lineHeight: 18
  }
});
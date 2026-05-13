import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

const iconMap = {
  students: "school-outline",
  professionals: "briefcase-outline",
  family: "home-outline",
  quiet: "leaf-outline",
  luxury: "diamond-outline",
  office: "business-outline"
};

export default function LifestyleCard({ item, onPress }) {
  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]}
    >
      <View style={styles.iconWrap}>
        <Ionicons
          name={iconMap[item.id] || "home-outline"}
          size={24}
          color={colors.primary}
        />
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={2} style={styles.subtitle}>
        {item.subtitle}
      </Text>
      
      <View style={styles.arrowContainer}>
        <Ionicons name="arrow-forward" size={16} color={colors.textLight} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    minHeight: 160,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 16,
    marginRight: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }]
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4
  },
  subtitle: {
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 18,
    flex: 1
  },
  arrowContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    opacity: 0.6
  }
});
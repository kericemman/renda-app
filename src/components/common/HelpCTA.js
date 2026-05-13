import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";
import colors from "../../constants/colors";

export default function HelpCTA({ onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="chatbubbles-outline" size={28} color={colors.white} />
      </View>
      
      <Text style={styles.title}>Need help finding a place?</Text>

      <Text style={styles.subtitle}>
        Tell us what you're looking for and we'll help you find a home faster without the stress.
      </Text>

      <View style={styles.buttonWrapper}>
        <CustomButton 
          title="Request Help" 
          variant="accent" 
          onPress={onPress}
          icon={<Ionicons name="arrow-forward" size={18} color={colors.white} />}
          iconPosition="right"
        />
      </View>

      <View style={styles.trustBadges}>
        <View style={styles.badge}>
          <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
          <Text style={styles.badgeText}>Custom </Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
          <Text style={styles.badgeText}>Fast</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
          <Text style={styles.badgeText}>Easy</Text>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary + "10",
    borderRadius: 24,
    padding: 20,
    marginTop: 5,
    marginHorizontal: 16,
    borderWidth: 1,
    marginBottom: 20,
    borderColor: colors.primary + "20",
    position: "relative",
    overflow: "hidden"
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: 20
  },
  buttonWrapper: {
    marginBottom: 16
  },
  trustBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  badgeText: {
    fontSize: 11,
    color: colors.textLight,
    fontWeight: "500"
  }
});
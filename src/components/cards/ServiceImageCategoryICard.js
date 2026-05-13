import React from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

export default function ServiceImageCategoryCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({
      ...styles.card,
      opacity: pressed ? 0.95 : 1,
      transform: [{ scale: pressed ? 0.98 : 1 }]
    })}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        {/* Gradient Overlay */}
        <View style={styles.gradientOverlay} />
        
        <View style={styles.overlay}>
          <View style={styles.topSection}>
           
            
            {item.partnerCount && (
              <View style={styles.countBadge}>
                <Ionicons name="people-outline" size={12} color={colors.white} />
                <Text style={styles.countText}>{item.partnerCount}+ Partners</Text>
              </View>
            )}
          </View>

          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text numberOfLines={2} style={styles.description}>
              {item.description}
            </Text>
            
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 240,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4
  },
  image: {
    flex: 1
  },
  imageStyle: {
    borderRadius: 20
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 20
  },
  overlay: {
    flex: 1,
    padding: 18,
    justifyContent: "space-between"
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(2, 187, 49, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backdropFilter: "blur(10px)"
  },
  countBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 6
  },
  countText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "500"
  },
  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3
  },
  description: {
    color: "#E2E8F0",
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.9,
    marginBottom: 12
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  linkText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600"
  }
});
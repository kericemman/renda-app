import React from "react";
import { Pressable, StyleSheet, Text, View, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "./colors";

const iconMap = {
  students: "school-outline",
  professionals: "briefcase-outline",
  family: "home-outline",
  quiet: "leaf-outline",
  luxury: "diamond-outline",
  office: "business-outline"
};

const backgroundImages = {
  students: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  professionals: "https://images.unsplash.com/photo-1540317580384-e5d43867f5f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  family: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  quiet: "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  luxury: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  office: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
};

export default function LifestyleCard({ item, onPress }) {
  const backgroundImage = backgroundImages[item.id] || backgroundImages.students;

  return (
    <Pressable onPress={onPress} style={styles.cardContainer}>
      <ImageBackground
        source={{ uri: backgroundImage }}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        
        <View style={styles.content}>
          <View style={styles.iconWrap}>
            <Ionicons
              name={iconMap[item.id] || "home-outline"}
              size={22}
              color={colors.primary}
            />
          </View>

          <Text style={styles.title}>{item.title}</Text>
          <Text numberOfLines={2} style={styles.subtitle}>
            {item.subtitle}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

export const lifestyleCategories = [
  {
    id: "students",
    title: "For Students",
    subtitle: "Affordable spaces near schools and transport",
    filters: {
      maxPrice: 30000,
      purpose: "rent"
    }
  },
  {
    id: "professionals",
    title: "Young Professionals",
    subtitle: "Modern homes near work and city life",
    filters: {
      purpose: "rent",
      bedroom: 1,
      minPrice: 15000,
      maxPrice: 40000,

      location: "nairobi"
     
    }
  },
  {
    id: "family",
    title: "Family Homes",
    subtitle: "More bedrooms, calm areas, better space",
    filters: {
      purpose: "rent",
      bedrooms: 3,

    }
  },
  {
    id: "quiet",
    title: "Quiet Living",
    subtitle: "Calmer neighborhoods outside city noise",
    filters: {
      purpose: "rent",
      county: "Kiambu"
    }
  },
  {
    id: "luxury",
    title: "Luxury Living",
    subtitle: "Premium homes with better comfort",
    filters: {
      minPrice: 100000,
      purpose: "rent",
      type: "maisonette"
    }
  },
  {
    id: "office",
    title: "Work Spaces",
    subtitle: "Offices for teams and businesses",
    filters: {
      purpose: "rent",
      type: "office"
    }
  }
];

const styles = StyleSheet.create({
  cardContainer: {
    width: 170,
    minHeight: 140,
    marginRight: 12,
    borderRadius: 18,
    overflow: "hidden"
  },
  background: {
    width: "100%",
    height: "100%"
  },
  backgroundImage: {
    borderRadius: 18
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 18
  },
  content: {
    padding: 14,
    minHeight: 140
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  title: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  },
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 18,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  }
});
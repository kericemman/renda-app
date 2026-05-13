import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";

export default function ServiceProviderCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{item.businessName}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
        <Text style={styles.area}>{item.serviceArea}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 14
  },
  image: {
    width: "100%",
    height: 150
  },
  content: {
    padding: 14
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text
  },
  description: {
    color: colors.textSoft,
    marginTop: 6,
    lineHeight: 20
  },
  area: {
    marginTop: 10,
    color: colors.primary,
    fontWeight: "700"
  }
});
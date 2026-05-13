import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";
import { formatCurrency } from "../../utils/formatCurrency";
import { getDisplayLocation } from "../../utils/getDisplayLocation";

export default function ListingCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{String(item.purpose).toUpperCase()}</Text>
      </View>

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.location}>{getDisplayLocation(item)}</Text>
        <Text style={styles.price}>{formatCurrency(item.price)}</Text>

        <View style={styles.metaRow}>
          {item.type !== "office" ? (
            <>
              <Text style={styles.metaText}>{item.bedrooms ?? 0} Beds</Text>
              <Text style={styles.metaText}>{item.bathrooms ?? 0} Baths</Text>
            </>
          ) : (
            <Text style={styles.metaText}>
              {item.size} {item.sizeUnit || "sqft"}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  image: {
    width: "100%",
    height: 180
  },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999
  },
  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "700"
  },
  content: {
    padding: 14
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text
  },
  location: {
    fontSize: 13,
    color: colors.textSoft,
    marginTop: 4
  },
  price: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.primaryDark,
    marginTop: 8
  },
  metaRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10
  },
  metaText: {
    color: colors.textSoft,
    fontWeight: "600"
  }
});
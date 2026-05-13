import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";
import { formatCurrency } from "../../utils/formatCurrency";
import { getDisplayLocation } from "../../utils/getDisplayLocation";

export default function BudgetListingCard({ item, onPress }) {
  const imageUri =
    item?.images?.[0] ||
    item?.image ||
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0";

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: imageUri }} style={styles.image} />

        {/* Budget badge */}
        
      </View>

      <View style={styles.content}>
        <Text style={styles.price}>{formatCurrency(item?.price)}</Text>

        <Text numberOfLines={1} style={styles.title}>
          {item?.title}
        </Text>

        <Text numberOfLines={1} style={styles.location}>
          {getDisplayLocation(item)}
        </Text>

        {item?.type !== "office" ? (
          <Text style={styles.meta}>
            {item?.bedrooms ?? 0} Beds • {item?.bathrooms ?? 0} Baths
          </Text>
        ) : (
          <Text style={styles.meta}>
            {item?.size || "Office"} {item?.sizeUnit || ""}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14
  },
  imageWrap: {
    position: "relative"
  },
  image: {
    width: "100%",
    height: 120
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "800"
  },
  content: {
    padding: 10
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.accent // 👈 highlight affordability
  },
  title: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "800",
    color: colors.text
  },
  location: {
    marginTop: 4,
    fontSize: 11,
    color: colors.textSoft
  },
  meta: {
    marginTop: 7,
    fontSize: 11,
    color: colors.textSoft,
    fontWeight: "700"
  }
});
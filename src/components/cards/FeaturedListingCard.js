import React from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";
import { formatCurrency } from "../../utils/formatCurrency";
import PurposeBadge from "../common/PurposeBadge";
import FeaturedBadge from "../common/FeaturedBadge";

export default function FeaturedListingCard({ item, onPress }) {
  const imageUri =
    item?.images?.[0] ||
    item?.image ||
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0";

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <ImageBackground source={{ uri: imageUri }} style={styles.image} imageStyle={styles.imageStyle}>
        <View style={styles.overlay}>
          <View style={styles.topRow}>
            {/* <FeaturedBadge /> */}
            <PurposeBadge purpose={item?.purpose} type={item?.type} />
          </View>

          <View style={styles.bottomContent}>
            <Text style={styles.price}>{formatCurrency(item?.price)}</Text>
            <Text numberOfLines={1} style={styles.title}>
              {item?.title}
            </Text>
            <Text numberOfLines={1} style={styles.location}>
              {item?.town}, {item?.county}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 290,
    height: 210,
    marginRight: 14
  },
  image: {
    flex: 1
  },
  imageStyle: {
    borderRadius: 22
  },
  overlay: {
    flex: 1,
    borderRadius: 22,
    padding: 16,
    justifyContent: "space-between",
    backgroundColor: "rgba(15, 23, 42, 0.28)"
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  bottomContent: {
    marginTop: 20
  },
  price: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "800"
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6
  },
  location: {
    color: "#E2E8F0",
    marginTop: 4,
    fontSize: 13
  }
});
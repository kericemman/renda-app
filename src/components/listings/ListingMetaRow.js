import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";

export default function ListingMetaRow({ item }) {
  const isOffice = item?.type === "office";

  if (isOffice) {
    return (
      <View style={styles.row}>
        <View style={styles.metaChip}>
          <Text style={styles.metaText}>
            {item?.size ? `${item.size} ${item.sizeUnit || "sqft"}` : "Office Space"}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <View style={styles.metaChip}>
        <Text style={styles.metaText}>{item?.bedrooms ?? 0} Beds</Text>
      </View>
      <View style={styles.metaChip}>
        <Text style={styles.metaText}>{item?.bathrooms ?? 0} Baths</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12
  },
  metaChip: {
    backgroundColor: "#F1F5F9",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  metaText: {
    color: colors.textSoft,
    fontSize: 12,
    fontWeight: "700"
  }
});
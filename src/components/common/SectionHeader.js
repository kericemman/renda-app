import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";

export default function SectionHeader({ title, actionText }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {actionText ? <Text style={styles.action}>{actionText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    marginTop: 4
  },
  title: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.text
  },
  action: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary
  }
});
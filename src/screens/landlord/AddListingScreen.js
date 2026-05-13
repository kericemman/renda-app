import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";

export default function AddListingScreen() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.text}>Add Listing screen</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  text: { fontSize: 18, fontWeight: "700" }
});
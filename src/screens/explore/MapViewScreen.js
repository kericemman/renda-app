import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import EmptyState from "../../components/common/EmptyState";

export default function MapViewScreen() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <EmptyState
          title="Map view coming next"
          message="We will connect user location and property coordinates after the listing filters and API flow are stable."
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});
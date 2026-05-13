import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import colors from "../../constants/colors";

export default function ScreenWrapper({ children, style }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface
  },
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});
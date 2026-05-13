import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";

export default function BrandedLoader({
  title = "Loading RendaHomes",
  message = "Preparing your experience..."
}) {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Image
          source={require("../../assets/loading.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ActivityIndicator size="large" color={colors.primary} />

      {/* <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  logoWrap: {
    
    // borderRadius: 30,
    // backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    
    // borderColor: colors.border
  },
  logo: {
    width: 120,
    height: 120
  },
  title: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: "900",
    color: colors.text
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    color: colors.textSoft,
    textAlign: "center",
    lineHeight: 20
  }
});
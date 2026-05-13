import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import theme from "../../constants/theme";

export default function StickyHeader({
  title = "RendaHomes",
  subtitle,
  logo,
  onFilterPress
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.left}>
          {logo ? (
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          ) : (
            <View>
              <Text style={styles.logoText}>{title}</Text>
              {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            </View>
          )}
        </View>

        <Pressable onPress={onFilterPress} style={styles.iconButton}>
          <Ionicons name="options-outline" size={22} color={colors.primary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    ...theme.shadow.soft
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  left: {
    flex: 1
  },
  logo: {
    width: 140,
    height: 34
  },
  logoText: {
    fontSize: 23,
    fontWeight: "900",
    color: colors.primaryDark,
    letterSpacing: -0.4
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSoft,
    marginTop: 2
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    backgroundColor: colors.surfaceSoft,
    alignItems: "center",
    justifyContent: "center"
  }
});
import React, { useRef } from "react";
import {
  Alert,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import SectionCard from "../../components/common/sectionCard";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";

const PRICING_URL = "https://rendahomes.com/pricing";

export default function AccountTypeScreen({ navigation, route }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const heroScale = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [1, 0.95],
    extrapolate: "clamp"
  });

  const heroOpacity = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [1, 0.82],
    extrapolate: "clamp"
  });

  const cardLift = scrollY.interpolate({
    inputRange: [0, 180],
    outputRange: [0, -8],
    extrapolate: "clamp"
  });

  const openLandlordPricing = async () => {
    const supported = await Linking.canOpenURL(PRICING_URL);

    if (!supported) {
      Alert.alert("Cannot open link", "Please visit rendahomes.com/pricing");
      return;
    }

    await Linking.openURL(PRICING_URL);
  };

  return (
    <ScreenWrapper>
      <DetailsHeader
        title="Create Account"
        onBackPress={() => navigation.goBack()}
        onFilterPress={() =>
          navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })
        }
      />

      <Animated.ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <Animated.View
          style={[
            styles.hero,
            {
              opacity: heroOpacity,
              transform: [{ scale: heroScale }]
            }
          ]}
        >
          <View style={styles.heroIcon}>
            <Ionicons name="home-outline" size={28} color={colors.white} />
          </View>

          <Text style={styles.heroTitle}>Start the right way</Text>
          <Text style={styles.heroText}>
            Choose how you want to use RendaHomes. We’ll guide you to the right
            experience.
          </Text>

          
        </Animated.View>

        <Animated.View style={{ transform: [{ translateY: cardLift }] }}>
          <Text style={styles.sectionLabel}>Choose account type</Text>

          <Pressable
            onPress={() =>
              navigation.navigate(ROUTES.SIGNUP, {
                ...route.params,
                role: "user"
              })
            }
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            <SectionCard style={styles.optionCard}>
              <View style={styles.optionTop}>
                <View style={styles.optionIcon}>
                  <Ionicons name="search-outline" size={22} color={colors.primary} />
                </View>

                <View style={styles.chevronBox}>
                  <Ionicons name="chevron-forward" size={20} color={colors.primary} />
                </View>
              </View>

              <Text style={styles.cardTitle}>I’m looking for a home</Text>
              <Text style={styles.cardText}>
                Create an account to contact landlords, track inquiries, and
                receive updates about homes you’re interested in.
              </Text>

              <View style={styles.footerRow}>
                <Text style={styles.inlineAction}>Create User Account</Text>
                <Ionicons name="arrow-forward" size={17} color={colors.primary} />
              </View>
            </SectionCard>
          </Pressable>

          <Pressable
            onPress={openLandlordPricing}
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            <SectionCard style={[styles.optionCard, styles.landlordCard]}>
              <View style={styles.optionTop}>
                <View style={[styles.optionIcon, styles.landlordIcon]}>
                  <Ionicons name="business-outline" size={22} color={colors.primary} />
                </View>

                <View style={styles.chevronBox}>
                  <Ionicons name="open-outline" size={20} color={colors.primary} />
                </View>
              </View>

              <Text style={styles.cardTitle}>I’m a landlord / property owner</Text>
              <Text style={styles.cardText}>
                Create your account for free and start listing your properties.
                Upgrade anytime when you're ready to boost visibility & list more.
              </Text>

              <View style={styles.footerRow}>
                <Text style={styles.inlineAction}>Start for Free</Text>
                <Ionicons name="open-outline" size={17} color={colors.primary} />
              </View>
            </SectionCard>
          </Pressable>

          
        </Animated.View>
      </Animated.ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40
  },
  hero: {
    backgroundColor: colors.accent,
    borderRadius: 28,
    padding: 22,
    marginBottom: 22
  },
  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  heroTitle: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: -0.6
  },
  heroText: {
    color: "#D1FAE5",
    marginTop: 8,
    lineHeight: 21,
    fontSize: 15
  },
  heroBadge: {
    marginTop: 16,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.16)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999
  },
  heroBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "800"
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.textSoft,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10
  },
  optionCard: {
    marginBottom: 14
  },
  landlordCard: {
    borderColor: "#BBF7D0"
  },
  optionTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center"
  },
  landlordIcon: {
    backgroundColor: "#F0FDF4"
  },
  chevronBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center"
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8
  },
  cardText: {
    color: colors.textSoft,
    lineHeight: 21,
    marginBottom: 14
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  inlineAction: {
    color: colors.primary,
    fontWeight: "500",
    fontSize: 14
  },
  noteCard: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#ECFDF5",
    borderRadius: 18,
    padding: 14,
    marginTop: 4
  },
  noteText: {
    flex: 1,
    color: colors.textSoft,
    lineHeight: 20,
    fontSize: 13
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.985 }]
  }
});
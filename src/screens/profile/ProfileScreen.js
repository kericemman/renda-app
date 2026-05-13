import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import StickyHeader from "../../components/common/StickyHeader";
import CustomButton from "../../components/common/CustomButton";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";
import useAuth from "../../hooks/useAuth";

export default function ProfileScreen({ navigation }) {
  const { user, isAuthenticated, isLandlord, logout } = useAuth();

  const menuItems = [
  {
    title: "Inbox",
    subtitle: "View property inquiries and alerts",
    icon: "mail-outline",
    onPress: () =>
      navigation.navigate("NotificationsTab", { screen: ROUTES.ALERT_INBOX })
  },

  ...(isLandlord
    ? [
        {
          title: "Landlord Dashboard",
          subtitle: "Manage inquiries and open your web dashboard",
          icon: "business-outline",
          onPress: () => navigation.navigate(ROUTES.LANDLORD_DASHBOARD)
        }
      ]
    : []),

  
  {
    title: "Contact Us",
    subtitle: "Reach the RendaHomes team",
    icon: "call-outline",
    onPress: () => navigation.navigate(ROUTES.CONTACT_US)
  },
  {
    title: "Updates",
    subtitle: "See what is new in the app",
    icon: "sparkles-outline",
    onPress: () => navigation.navigate(ROUTES.APP_UPDATES)
  },
  {
    title: "Privacy & Safety",
    subtitle: "How we protect users and listings",
    icon: "shield-checkmark-outline",
    onPress: () => navigation.navigate(ROUTES.PRIVACY_POLICY)
  }
];

  return (
    <ScreenWrapper>
      <StickyHeader
        title="My Profile"
        subtitle="Account & support"
        onFilterPress={() =>
          navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })
        }
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="person-outline" size={28} color={colors.white} />
          </View>

          <Text style={styles.heroTitle}>
            {isAuthenticated
              ? `Hello${user?.name ? `, ${user.name}` : ""}`
              : "Welcome to RendaHomes"}
          </Text>

          <Text style={styles.heroText}>
            {isAuthenticated
              ? "Manage your inquiries, account access, support requests, and app updates from one place."
              : "Browse freely. Sign in when you want to contact landlords, track inquiries, and receive updates."}
          </Text>
        </View>

        {!isAuthenticated ? (
          <>
            <View style={styles.authCard}>
              <CustomButton
                title="Sign In"
                onPress={() => navigation.navigate(ROUTES.LOGIN)}
              />

              <View style={{ height: 12 }} />

              <CustomButton
                title="Create Account"
                variant="secondary"
                onPress={() => navigation.navigate(ROUTES.ACCOUNT_TYPE)}
              />
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>For landlords</Text>
              <Text style={styles.infoText}>
                Manage inquiries in the app. Add listings and handle subscriptions from the web dashboard.
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
              </Text>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name || "RendaHomes User"}</Text>
              <Text style={styles.userEmail}>{user?.email || "No email"}</Text>
              {user?.phone ? <Text style={styles.userPhone}>{user.phone}</Text> : null}
            </View>
          </View>
        )}

        <Text style={styles.sectionLabel}>Account & Help</Text>

        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.title} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon} size={21} color={colors.primary} />
              </View>

              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>

        {isAuthenticated ? (
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
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
    borderRadius: 24,
    padding: 22,
    marginBottom: 16
  },
  heroIcon: {
    width: 44,
    height: 44,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  heroTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.5
  },
  heroText: {
    color: "#D1FAE5",
    marginTop: 8,
    lineHeight: 21,
    fontSize: 15
  },
  authCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14
  },
  infoCard: {
    backgroundColor: "#ECFDF5",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.primaryDark,
    marginBottom: 6
  },
  infoText: {
    color: colors.textSoft,
    lineHeight: 21
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 18
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14
  },
  avatarText: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "600"
  },
  userInfo: {
    flex: 1
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text
  },
  userEmail: {
    color: colors.textSoft,
    marginTop: 4
  },
  userPhone: {
    color: colors.textSoft,
    marginTop: 2
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.textSoft,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10
  },
  menuSection: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden"
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  menuContent: {
    flex: 1
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text
  },
  menuSubtitle: {
    color: colors.textSoft,
    fontSize: 12,
    marginTop: 3,
    lineHeight: 17
  },
  logoutButton: {
    marginTop: 18,
    backgroundColor: "#FEF2F2",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center"
  },
  logoutText: {
    color: colors.danger,
    fontWeight: "900",
    fontSize: 15
  }
});
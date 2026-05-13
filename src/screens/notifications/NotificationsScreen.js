import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import StickyHeader from "../../components/common/StickyHeader";
import SectionCard from "../../components/common/sectionCard";
import BrandedLoader from "../../components/common/BrandedLoader";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";

const heroImage =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa";

const sampleNotifications = [
  {
    id: "1",
    title: "Inquiry ready",
    message: "Continue your property inquiry from your inbox.",
    type: "inquiry",
    time: "Today"
  },
  {
    id: "2",
    title: "New app update",
    message: "RendaHomes updates and housing news are available.",
    type: "update",
    time: "Recent"
  }
];

export default function NotificationsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(sampleNotifications);
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const handleNotificationPress = (item) => {
    if (item.type === "inquiry") {
      navigation.navigate(ROUTES.ALERT_INBOX);
      return;
    }

    if (item.type === "update") {
      navigation.navigate("ProfileTab", {
        screen: ROUTES.APP_UPDATES
      });
      return;
    }

    navigation.navigate("NotificationsTab");
  };

  const getIcon = (type) => {
    if (type === "inquiry") return "mail-unread-outline";
    if (type === "update") return "sparkles-outline";
    if (type === "alert") return "notifications-outline";
    return "information-circle-outline";
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <BrandedLoader title="Messages" />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <StickyHeader
        title="Messages"
        subtitle="Updates, News & Inquiries"
        onFilterPress={() =>
          navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })
        }
      />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <ImageBackground
              source={{ uri: heroImage }}
              style={styles.hero}
              imageStyle={styles.heroImage}
            >
              <View style={styles.heroOverlay}>
                <View style={styles.iconCircle}>
                  <Ionicons
                    name="notifications-outline"
                    size={26}
                    color={colors.white}
                  />
                </View>

                <Text style={styles.heroTitle}>Stay close to every update</Text>
                <Text style={styles.heroText}>
                  Your property inquiries, landlord responses, viewing updates,
                  and important alerts will appear here.
                </Text>
              </View>
            </ImageBackground>

            <SectionCard style={styles.inboxCard}>
              <View style={styles.inboxTop}>
                <View style={styles.inboxIcon}>
                  <Ionicons
                    name="mail-unread-outline"
                    size={22}
                    color={colors.primary}
                  />
                </View>

                <View style={styles.inboxContent}>
                  <Text style={styles.inboxTitle}>Your Inquiry Inbox</Text>
                  <Text style={styles.inboxText}>
                    Continue conversations with landlords and manage the homes
                    you’re interested in.
                  </Text>
                </View>
              </View>

              <Pressable
                style={styles.inboxButton}
                onPress={() => navigation.navigate(ROUTES.ALERT_INBOX)}
              >
                <Text style={styles.inboxButtonText}>Open Inbox</Text>
                <Ionicons name="arrow-forward" size={18} color={colors.white} />
              </Pressable>
            </SectionCard>

            <Text style={styles.sectionTitle}>Recent Activity</Text>
          </>
        }
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.notificationCard,
              pressed && styles.pressed
            ]}
            onPress={() => handleNotificationPress(item)}
          >
            <SectionCard>
              <View style={styles.notificationRow}>
                <View style={styles.notificationIcon}>
                  <Ionicons
                    name={getIcon(item.type)}
                    size={22}
                    color={colors.primary}
                  />
                </View>

                <View style={styles.notificationContent}>
                  <View style={styles.notificationTop}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationTime}>{item.time}</Text>
                  </View>

                  <Text style={styles.notificationMessage}>{item.message}</Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.muted}
                />
              </View>
            </SectionCard>
          </Pressable>
        )}
        ListEmptyComponent={
          <SectionCard style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="checkmark-circle-outline"
                size={30}
                color={colors.primary}
              />
            </View>

            <Text style={styles.emptyTitle}>You’re all caught up</Text>
            <Text style={styles.emptyText}>
              No new alerts yet. When you contact a landlord or receive an
              update, it will show here.
            </Text>
          </SectionCard>
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32
  },
  pressed: {
    opacity: 0.85
  },
  hero: {
    height: 230,
    marginBottom: 16
  },
  heroImage: {
    borderRadius: 24
  },
  heroOverlay: {
    flex: 1,
    borderRadius: 24,
    padding: 18,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15, 23, 42, 0.42)"
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  heroTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 8
  },
  heroText: {
    color: "#E2E8F0",
    lineHeight: 21,
    fontWeight: "500"
  },
  inboxCard: {
    marginBottom: 18
  },
  inboxTop: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14
  },
  inboxIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center"
  },
  inboxContent: {
    flex: 1
  },
  inboxTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 5
  },
  inboxText: {
    color: colors.textSoft,
    lineHeight: 20
  },
  inboxButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    minHeight: 50,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
  },
  inboxButtonText: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 15
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 10
  },
  notificationCard: {
    marginBottom: 12
  },
  notificationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center"
  },
  notificationContent: {
    flex: 1
  },
  notificationTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10
  },
  notificationTitle: {
    flex: 1,
    color: colors.text,
    fontWeight: "900",
    fontSize: 15
  },
  notificationTime: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  notificationMessage: {
    color: colors.textSoft,
    marginTop: 5,
    lineHeight: 20
  },
  emptyCard: {
    alignItems: "center",
    paddingVertical: 24
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 6
  },
  emptyText: {
    color: colors.textSoft,
    textAlign: "center",
    lineHeight: 20
  }
});
import React from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as Linking from "expo-linking";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import CustomButton from "../../components/common/CustomButton";
import SectionCard from "../../components/common/sectionCard";
import UniversalLoader from "../../components/common/UniversalLoader";
import EmptyState from "../../components/common/EmptyState";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";
import useAuth from "../../hooks/useAuth";
import useLandlordDashboard from "../../hooks/useLandLordDashboard";
import BrandedLoader from "../../components/common/BrandedLoader";

const WEB_DASHBOARD_URL = "https://rendahomes.com/landlord/dashboard";
const WEB_LISTINGS_URL = "https://rendahomes.com/landlord/listings";
const WEB_SUBSCRIPTION_URL = "https://rendahomes.com/landlord/subscription";

export default function LandlordDashboardScreen({ navigation }) {
  const { user } = useAuth();
  const { stats, recentInquiries, loading, refreshing, error, refetch } =
    useLandlordDashboard();

  const openWebPage = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      Alert.alert("Cannot open link", "Your device could not open the web dashboard.");
      return;
    }

    await Linking.openURL(url);
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <BrandedLoader
          title="Landlord"
          onBackPress={() => navigation.goBack()}
          onFilterPress={() =>
            navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })
          }
        />
       
      </ScreenWrapper>
    );
  }

  const newInquiries = stats?.newInquiries || 0;
  const plan = stats?.subscription?.plan || "Free";

  return (
    <ScreenWrapper>
      <DetailsHeader
        title="Landlord"
        onBackPress={() => navigation.goBack()}
        onFilterPress={() =>
          navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })
        }
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refetch}
            colors={[colors.primary]}
          />
        }
      >
        <View style={styles.hero}>
          <View>
            <Text style={styles.heroLabel}>Welcome back</Text>
            <Text style={styles.heroTitle}>{user?.name || "Landlord"}</Text>
            
          </View>

          <View style={styles.heroIcon}>
            <Ionicons name="business-outline" size={30} color={colors.accent} />
          </View>
        </View>

        {error ? (
          <EmptyState title="Could not load dashboard" message={error} />
        ) : (
          <>
            <SectionCard style={styles.priorityCard}>
              <View style={styles.priorityTop}>
                <View style={styles.priorityIcon}>
                  <Ionicons name="chatbubbles-outline" size={24} color={colors.primary} />
                </View>

                <View style={styles.priorityContent}>
                  <Text style={styles.priorityTitle}>
                    {newInquiries > 0
                      ? `${newInquiries} new ${newInquiries === 1 ? "inquiry" : "inquiries"}`
                      : "No new inquiries"}
                  </Text>
                  <Text style={styles.priorityText}>
                    {newInquiries > 0
                      ? "People are interested in your properties. Reply fast while they are still active."
                      : "New messages from interested renters or buyers will appear here."}
                  </Text>
                </View>
              </View>

              <CustomButton
                title={newInquiries > 0 ? "Reply to Inquiries" : "Open Inquiries"}
                variant="accent"
                onPress={() => navigation.navigate(ROUTES.LANDLORD_INQUIRIES)}
              />
            </SectionCard>

            <SectionCard style={styles.webCard}>
              <View style={styles.webHeader}>
                

                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>My Dashboard</Text>
                  <Text style={styles.cardText}>
                    Add listings, edit property details, upload images, and manage subscriptions on the website.
                  </Text>
                </View>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => openWebPage(WEB_DASHBOARD_URL)}
                >
                  <Ionicons name="grid-outline" size={20} color={colors.white} />
                  <Text style={styles.actionButtonText}>Dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.secondaryAction]}
                  onPress={() => openWebPage(WEB_LISTINGS_URL)}
                >
                  <Ionicons name="home-outline" size={20} color={colors.primary} />
                  <Text style={styles.secondaryActionText}>Listings</Text>
                </TouchableOpacity>
              </View>
            </SectionCard>

            <View style={styles.summaryGrid}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryNumber}>{stats?.totalListings || 0}</Text>
                <Text style={styles.summaryLabel}>Total Listings</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryNumber}>{stats?.activeListings || 0}</Text>
                <Text style={styles.summaryLabel}>Active</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryNumber}>{stats?.pendingListings || 0}</Text>
                <Text style={styles.summaryLabel}>Pending</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text numberOfLines={1} style={styles.summaryNumber}>{plan}</Text>
                <Text style={styles.summaryLabel}>Plan</Text>
              </View>
            </View>

            <SectionCard style={styles.recentCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Recent Inquiries</Text>

                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LANDLORD_INQUIRIES)}>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>

              {recentInquiries.length === 0 ? (
                <View style={styles.emptyRecent}>
                  <Text style={styles.emptyTitle}>No recent inquiries yet</Text>
                  <Text style={styles.emptyText}>
                    When users contact you about your listings, their messages will show here.
                  </Text>
                </View>
              ) : (
                recentInquiries.map((item) => {
                  const name =
                    item?.user?.name ||
                    item?.sender?.name ||
                    item?.name ||
                    "Interested user";

                  const listingTitle =
                    item?.listing?.title ||
                    item?.listingTitle ||
                    "Property inquiry";

                  const initials = name
                    .split(" ")
                    .map((part) => part.charAt(0))
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <TouchableOpacity
                      key={item._id || item.id}
                      style={styles.inquiryItem}
                      activeOpacity={0.75}
                      onPress={() =>
                        navigation.navigate(ROUTES.LANDLORD_INQUIRY_DETAILS, {
                          inquiry: item
                        })
                      }
                    >
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{initials}</Text>
                      </View>

                      <View style={styles.inquiryContent}>
                        <Text style={styles.inquiryName}>{name}</Text>
                        <Text numberOfLines={1} style={styles.inquiryListing}>
                          {listingTitle}
                        </Text>
                        <Text numberOfLines={1} style={styles.inquiryMessage}>
                          {item?.message || "New inquiry received"}
                        </Text>
                      </View>

                      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
                    </TouchableOpacity>
                  );
                })
              )}
            </SectionCard>

            <SectionCard style={styles.planCard}>
              <View style={styles.planTop}>
                <View>
                  <Text style={styles.cardTitle}>Subscription</Text>
                  <Text style={styles.cardText}>
                    Current plan: <Text style={styles.planText}>{plan}</Text>
                  </Text>
                </View>

                <Ionicons name="diamond-outline" size={28} color="#8B5CF6" />
              </View>

              <CustomButton
                title="Manage Subscription"
                variant="secondary"
                onPress={() => openWebPage(WEB_SUBSCRIPTION_URL)}
              />
            </SectionCard>

            <View style={styles.tipsBox}>
              <Text style={styles.tipsTitle}>Landlord tip</Text>
              <Text style={styles.tipsText}>
                Fast replies build trust. If someone contacts you today, try to respond while they are still actively searching.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32
  },
  hero: {
    
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16
  },
  heroLabel: {
    color: colors.secondaryAction,
    fontWeight: "500",
    marginBottom: 4
  },
  heroTitle: {
    color: colors.accent,
    fontSize: 25,
    fontWeight: "900"
  },
  heroText: {
    color: "#D1FAE5",
    marginTop: 8,
    lineHeight: 21,
    maxWidth: 250
  },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center"
  },
  priorityCard: {
    marginBottom: 14
  },
  priorityTop: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16
  },
  priorityIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center"
  },
  priorityContent: {
    flex: 1
  },
  priorityTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.text
  },
  priorityText: {
    color: colors.textSoft,
    marginTop: 6,
    lineHeight: 21
  },
  webCard: {
    marginBottom: 14
  },
  webHeader: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16
  },
  webIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center"
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text
  },
  cardText: {
    color: colors.textSoft,
    marginTop: 6,
    lineHeight: 21
  },
  actionRow: {
    flexDirection: "row",
    gap: 10
  },
  actionButton: {
    flex: 1,
    minHeight: 50,
    backgroundColor: colors.accent,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
  },
  actionButtonText: {
    color: colors.white,
    fontWeight: "600"
  },
  secondaryAction: {
    backgroundColor: "#ECFDF5"
  },
  secondaryActionText: {
    color: colors.primary,
    fontWeight: "600"
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14
  },
  summaryCard: {
    width: "48%",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 16
  },
  summaryNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    textTransform: "capitalize"
  },
  summaryLabel: {
    color: colors.textSoft,
    fontWeight: "700",
    marginTop: 6
  },
  recentCard: {
    marginBottom: 14,
    padding: 0,
    overflow: "hidden"
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  seeAll: {
    color: colors.primary,
    fontWeight: "500"
  },
  emptyRecent: {
    padding: 16
  },
  emptyTitle: {
    color: colors.text,
    fontWeight: "900",
    marginBottom: 6
  },
  emptyText: {
    color: colors.textSoft,
    lineHeight: 20
  },
  inquiryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  avatarText: {
    color: colors.primary,
    fontWeight: "900"
  },
  inquiryContent: {
    flex: 1
  },
  inquiryName: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 15
  },
  inquiryListing: {
    color: colors.primary,
    fontWeight: "700",
    marginTop: 3
  },
  inquiryMessage: {
    color: colors.textSoft,
    marginTop: 3
  },
  planCard: {
    marginBottom: 14
  },
  planTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16
  },
  planText: {
    color: colors.primary,
    fontWeight: "900",
    textTransform: "capitalize"
  },
  tipsBox: {
    backgroundColor: "#FEF3C7",
    borderRadius: 18,
    padding: 16
  },
  tipsTitle: {
    color: "#92400E",
    fontWeight: "900",
    marginBottom: 6
  },
  tipsText: {
    color: "#92400E",
    lineHeight: 21
  }
});
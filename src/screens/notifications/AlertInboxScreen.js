import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import StickyHeader from "../../components/common/StickyHeader";
import PageIntro from "../../components/common/PageIntro";
import SectionCard from "../../components/common/sectionCard";
import CustomButton from "../../components/common/CustomButton";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";

export default function AlertInboxScreen({ route, navigation }) {
  const pendingListing = route.params?.listing || null;

  return (
    <ScreenWrapper>
      <StickyHeader
        title="Inbox"
        subtitle="View & Chat"
        onFilterPress={() => navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })}
      />

      <ScrollView contentContainerStyle={styles.content}>
        

        {pendingListing ? (
          <SectionCard style={styles.card}>
            <Text style={styles.badge}>Draft Inquiry</Text>
            <Text style={styles.title}>{pendingListing.title}</Text>
            <Text style={styles.meta}>
              {pendingListing.town}, {pendingListing.county}
            </Text>

            <CustomButton
              title="Continue Message"
              variant="accent"
              onPress={() =>
                navigation.navigate(ROUTES.ALERT_COMPOSE, {
                  listing: pendingListing
                })
              }
            />
          </SectionCard>
        ) : (
          <SectionCard>
            <Text style={styles.title}>No new alerts yet</Text>
            <Text style={styles.meta}>
              Your property inquiries and landlord responses will appear here.
            </Text>
          </SectionCard>
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
  card: {
    marginBottom: 14
  },
  badge: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: 12,
    marginBottom: 8
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 6
  },
  meta: {
    color: colors.textSoft,
    lineHeight: 20,
    marginBottom: 14
  }
});
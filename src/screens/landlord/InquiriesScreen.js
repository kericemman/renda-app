import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import PageIntro from "../../components/common/PageIntro";
import SectionCard from "../../components/common/sectionCard";
import CustomButton from "../../components/common/CustomButton";
import EmptyState from "../../components/common/EmptyState";
import UniversalLoader from "../../components/common/UniversalLoader";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";
import useLandlordInquiries from "../../hooks/useLandlordInquiries";

export default function InquiriesScreen({ navigation }) {
  const { inquiries, loading, error } = useLandlordInquiries();

  if (loading) {
    return (
      <ScreenWrapper>
        <DetailsHeader
          title="Inquiries"
          onBackPress={() => navigation.goBack()}
          onFilterPress={() =>
            navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })
          }
        />
        
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <DetailsHeader
        title="Inquiries"
        onBackPress={() => navigation.goBack()}
        onFilterPress={() =>
          navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })
        }
      />

      <ScrollView contentContainerStyle={styles.content}>
        <PageIntro
          title="Property Inquiries"
          subtitle="Open an inquiry to reply directly from the app."
        />

        {error ? (
          <EmptyState title="Could not load inquiries" message={error} />
        ) : null}

        {!error && inquiries.length === 0 ? (
          <EmptyState
            title="No inquiries yet"
            message="When users contact you about your listings, their messages will appear here."
          />
        ) : null}

        {!error &&
          inquiries.map((item) => {
            const tenantName =
              item?.user?.name ||
              item?.sender?.name ||
              item?.tenantName ||
              item?.name ||
              "Interested user";

            const listingTitle =
              item?.listing?.title ||
              item?.listingTitle ||
              "Property inquiry";

            const message = item?.message || "No message provided.";
            const time = item?.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : item?.time || "Recent";

            return (
              <SectionCard key={item._id || item.id} style={styles.card}>
                <View style={styles.topRow}>
                  <Text style={styles.tenantName}>{tenantName}</Text>
                  <Text style={styles.time}>{time}</Text>
                </View>

                <Text style={styles.listing}>{listingTitle}</Text>
                <Text numberOfLines={2} style={styles.message}>
                  {message}
                </Text>

                <CustomButton
                  title="Open & Reply"
                  variant="accent"
                  onPress={() =>
                    navigation.navigate(ROUTES.LANDLORD_INQUIRY_DETAILS, {
                      inquiry: item
                    })
                  }
                />
              </SectionCard>
            );
          })}
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
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tenantName: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text
  },
  time: {
    color: colors.muted,
    fontSize: 12
  },
  listing: {
    color: colors.primary,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 8
  },
  message: {
    color: colors.textSoft,
    lineHeight: 21,
    marginBottom: 14
  }
});
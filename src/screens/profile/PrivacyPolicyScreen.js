import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import PageIntro from "../../components/common/PageIntro";
import SectionCard from "../../components/common/sectionCard";
import EmptyState from "../../components/common/EmptyState";
import BrandedLoader from "../../components/common/BrandedLoader";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";
import { getPolicyPage } from "../../services/publicContentService";

export default function PrivacyPolicyScreen({ navigation }) {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPolicy = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPolicyPage("privacy");
        setPolicy(data.policy || data.data || null);
      } catch (err) {
        setError(
          err?.response?.data?.message || "Could not load privacy policy."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPolicy();
  }, []);

  if (loading) {
    return (
      <ScreenWrapper>
        <DetailsHeader
          title="Privacy"
          onBackPress={() => navigation.goBack()}
          onFilterPress={() =>
            navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })
          }
        />

        <BrandedLoader
          title="Loading policy"
          message="Fetching privacy and safety information..."
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <DetailsHeader
        title="Privacy"
        onBackPress={() => navigation.goBack()}
        onFilterPress={() =>
          navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })
        }
      />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <PageIntro
          title={policy?.title || "Privacy & Safety"}
          subtitle="Understand how RendaHomes handles account data, inquiries, listings, and safety."
        />

        {error ? (
          <EmptyState title="Policy unavailable" message={error} />
        ) : null}

        {!error && !policy ? (
          <EmptyState
            title="No policy published"
            message="Privacy policy content will appear here once published from the admin dashboard."
          />
        ) : null}

        {!error && policy ? (
          <SectionCard style={styles.policyCard}>
            <View style={styles.lastUpdatedContainer}>
              <Text style={styles.lastUpdatedLabel}>Last Updated</Text>
              <Text style={styles.lastUpdatedDate}>
                {policy.updatedAt 
                  ? new Date(policy.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
              </Text>
            </View>
            <Text style={styles.body}>{policy.body}</Text>
          </SectionCard>
        ) : null}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32
  },
  policyCard: {
    marginTop: 8
  },
  lastUpdatedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  lastUpdatedLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSoft,
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  lastUpdatedDate: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.primary,
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: "hidden"
  },
  body: {
    color: colors.textSoft,
    lineHeight: 24,
    fontSize: 15,
    textAlign: "left"
  }
});
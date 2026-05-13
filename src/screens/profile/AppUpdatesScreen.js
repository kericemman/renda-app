import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import PageIntro from "../../components/common/PageIntro";
import SectionCard from "../../components/common/sectionCard";
import AppInput from "../../components/common/AppInput";
import CustomButton from "../../components/common/CustomButton";
import UniversalLoader from "../../components/common/UniversalLoader";
import EmptyState from "../../components/common/EmptyState";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";
import { getUpdates, subscribeToUpdates } from "../../services/publicContentService";
import BrandedLoader from "../../components/common/BrandedLoader";

export default function AppUpdatesScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadUpdates = async () => {
      try {
        const data = await getUpdates();
        setUpdates(data.updates || data.data || []);
      } finally {
        setLoading(false);
      }
    };

    loadUpdates();
  }, []);

  const handleSubscribe = async () => {
    if (!email.trim()) {
      Alert.alert("Email required", "Enter your email to subscribe.");
      return;
    }

    try {
      setSubmitting(true);

      await subscribeToUpdates({
        email: email.trim(),
        source: "mobile_app"
      });

      Alert.alert("Subscribed", "You will receive RendaHomes updates.");
      setEmail("");
    } catch (error) {
      Alert.alert(
        "Failed",
        error?.response?.data?.message || "Could not subscribe."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <BrandedLoader
          title="Updates"
          onBackPress={() => navigation.goBack()}
          onFilterPress={() => navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })}
        />
        
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <DetailsHeader
        title="Updates"
        onBackPress={() => navigation.goBack()}
        onFilterPress={() => navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Stay in the loop</Text>
          <Text style={styles.heroText}>
            Subscribe for app updates, housing news, product releases, and RendaHomes announcements.
          </Text>
        </View>

        <SectionCard style={styles.subscribeCard}>
          <AppInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <CustomButton
            title="Subscribe"
            variant="accent"
            loading={submitting}
            onPress={handleSubscribe}
          />
        </SectionCard>

       

        <Text style={styles.sectionTitle}>Latest Updates</Text>

        {updates.length === 0 ? (
          <EmptyState
            title="No updates yet"
            message="Updates published from the web dashboard will appear here."
          />
        ) : (
          updates.map((item) => (
            <TouchableOpacity
              key={item._id || item.id}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate(ROUTES.APP_UPDATE_DETAILS, {
                  update: item
                })
              }
            >
              <SectionCard style={styles.updateButton}>
                <View style={styles.updateTopRow}>
                  <Text style={styles.category}>{item.category || "Update"}</Text>
                  <Text style={styles.arrow}>→</Text>
                </View>

                <Text numberOfLines={1} style={styles.title}>
                  {item.title}
                </Text>

                <Text numberOfLines={2} style={styles.body}>
                  {item.body || item.description}
                </Text>
              </SectionCard>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 32 },
  hero: {
    backgroundColor: colors.accent,
    borderRadius: 24,
    padding: 22,
    marginBottom: 16
  },
  heroTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "900"
  },
  heroText: {
    fontSize: 14,
    color: "#D1FAE5",
    marginTop: 8,
    lineHeight: 21
  },
  subscribeCard: { marginBottom: 20 },
  updateCard: { marginBottom: 12 },
  category: {
    color: colors.primary,
    fontWeight: "900",
    fontSize: 12,
    marginBottom: 8
  },

  
  title: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 16,
    marginBottom: 8
  },
  body: {
    color: colors.textSoft,
    lineHeight: 22
  }, 

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12
  },
  updateButton: {
    marginBottom: 12
  },
  updateTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6
  },
  arrow: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.primary
  }
});
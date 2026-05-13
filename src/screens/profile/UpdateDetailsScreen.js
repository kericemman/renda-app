import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import SectionCard from "../../components/common/sectionCard";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";

export default function AppUpdateDetailsScreen({ route, navigation }) {
  const { update } = route.params;

  return (
    <ScreenWrapper>
      <DetailsHeader
        title="Update Details"
        onBackPress={() => navigation.goBack()}
        onFilterPress={() =>
          navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })
        }
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.category}>{update?.category || "Update"}</Text>
          <Text style={styles.title}>{update?.title}</Text>
          {update?.publishedAt || update?.createdAt ? (
            <Text style={styles.date}>
              {new Date(update.publishedAt || update.createdAt).toLocaleDateString()}
            </Text>
          ) : null}
        </View>

        <SectionCard>
          <Text style={styles.body}>
            {update?.body || update?.description || "No update details available."}
          </Text>
        </SectionCard>
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
    backgroundColor: colors.accent,
    borderRadius: 24,
    padding: 22,
    marginBottom: 16
  },
  category: {
    color: "#D1FAE5",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 8
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 30
  },
  date: {
    color: "#D1FAE5",
    marginTop: 10,
    fontWeight: "700"
  },
  body: {
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 24
  }
});
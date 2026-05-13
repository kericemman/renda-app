import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import PageIntro from "../../components/common/PageIntro";
import SectionCard from "../../components/common/SectionCard";
import CustomButton from "../../components/common/CustomButton";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";

export default function SubscriptionScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <DetailsHeader
        title="Subscription"
        onBackPress={() => navigation.goBack()}
        onFilterPress={() => navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })}
      />

      <View style={styles.container}>
        <PageIntro
          title="Subscription Plans"
          subtitle="Choose the right plan for your listing visibility and growth."
        />

        <SectionCard style={styles.planCard}>
          <Text style={styles.plan}>Basic</Text>
          <Text style={styles.info}>Up to 5 listings</Text>
        </SectionCard>

        <SectionCard style={[styles.planCard, styles.featuredPlan]}>
          <Text style={styles.plan}>Premium</Text>
          <Text style={styles.info}>Up to 15 listings + homepage featured slider</Text>
          <View style={{ height: 12 }} />
          <CustomButton title="Recommended Plan" variant="accent" onPress={() => {}} />
        </SectionCard>

        <SectionCard style={styles.planCard}>
          <Text style={styles.plan}>Pro</Text>
          <Text style={styles.info}>Up to 100 listings + high priority visibility</Text>
        </SectionCard>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  planCard: {
    marginBottom: 12
  },
  featuredPlan: {
    borderColor: colors.accent
  },
  plan: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text
  },
  info: {
    marginTop: 6,
    color: colors.textSoft,
    lineHeight: 20
  }
});
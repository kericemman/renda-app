import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import PageIntro from "../../components/common/PageIntro";
import ListingCard from "../../components/cards/ListingCard";
import { listings } from "../../constants/mockData";
import ROUTES from "../../constants/routes";

export default function MyListingsScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <DetailsHeader
        title="My Listings"
        onBackPress={() => navigation.goBack()}
        onFilterPress={() => navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <PageIntro
          title="Your Properties"
          subtitle="Manage, review, and update your active property listings."
        />

        {listings.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32
  }
});
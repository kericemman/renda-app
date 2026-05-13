import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import StickyHeader from "../../components/common/StickyHeader";
import ServiceImageCategoryCard from "../../components/cards/ServiceImageCategoryICard";
import { serviceCategories } from "../../constants/serviceCategories";
import ROUTES from "../../constants/routes";
import BrandedLoader from "../../components/common/BrandedLoader";

export default function ServicesHomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <ScreenWrapper>
        <BrandedLoader title="Services" />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <StickyHeader
        title="Services"
        subtitle="Explore services that best suit you"
        onFilterPress={() =>
          navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })
        }
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {serviceCategories.map((item) => (
          <ServiceImageCategoryCard
            key={item.id}
            item={item}
            onPress={() =>
              navigation.navigate(ROUTES.SERVICE_CATEGORY, { category: item })
            }
          />
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
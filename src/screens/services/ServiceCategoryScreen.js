import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import PageIntro from "../../components/common/PageIntro";
import EmptyState from "../../components/common/EmptyState";
import LoadingState from "../../components/common/LoadingState";
import ServiceProviderCard from "../../components/cards/ServiceProviderCard";
import useServiceProviders from "../../hooks/useServiceProviders";
import ROUTES from "../../constants/routes";

export default function ServiceCategoryScreen({ route, navigation }) {
  const { category } = route.params;

  const { providers, loading, error } = useServiceProviders({
    category: category._id || category.id,
    status: "approved",
    isActive: true
  });

  return (
    <ScreenWrapper>
      <DetailsHeader
        title={category.name}
        onBackPress={() => navigation.goBack()}
        onFilterPress={() => navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <PageIntro title={category.name} subtitle={category.description} />

        {loading ? <LoadingState /> : null}

        {!loading && error ? (
          <EmptyState title="Could not load providers" message={error} />
        ) : null}

        {!loading && !error && providers.length === 0 ? (
          <EmptyState
            title="No providers yet"
            message="Service providers for this category will appear here once approved."
          />
        ) : null}

        {!loading &&
          !error &&
          providers.map((item) => (
            <ServiceProviderCard
              key={item._id || item.id}
              item={{
                ...item,
                image:
                  item?.images?.[0] ||
                  item?.image ||
                  "https://images.unsplash.com/photo-1600518464441-9154a4dea21b"
              }}
              onPress={() =>
                navigation.navigate(ROUTES.SERVICE_DETAILS, {
                  provider: {
                    ...item,
                    image:
                      item?.images?.[0] ||
                      item?.image ||
                      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b"
                  }
                })
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
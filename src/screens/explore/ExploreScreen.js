import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import StickyHeader from "../../components/common/StickyHeader";
import ListingCard from "../../components/cards/ListingCard";
import FilterChip from "../../components/common/FilterChip";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";
import SearchFilterRow from "../../components/common/SeachFilterRow";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";
import useListings from "../../hooks/useListings";
import useDebounce from "../../hooks/useDebounce";
import BrandedLoader from "../../components/common/BrandedLoader";

export default function ExploreScreen({ navigation, route }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const routeFilters = route.params?.filters || {
    status: "approved",
    availability: "available",
    isActive: true
  };

  const { listings, filters, loading, error, setFilters } = useListings(routeFilters);

  useEffect(() => {
    setFilters(routeFilters);
  }, [route.params, setFilters]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearch || undefined
    }));
  }, [debouncedSearch, setFilters]);

  const handleQuickPurpose = (purpose) => {
    if (purpose === "office") {
      setFilters((prev) => ({
        ...prev,
        purpose: "rent",
        type: "office"
      }));
      return;
    }

    setFilters((prev) => ({
      ...prev,
      purpose,
      type: undefined
    }));
  };

  if (loading) {
  return (
    <ScreenWrapper>
      <BrandedLoader
        title="Searching properties"
        message="Finding matching homes around your filters..."
      />
    </ScreenWrapper>
  );
}

  return (
    <ScreenWrapper>
      <StickyHeader
        title="Explore"
        subtitle="Find properties with ease"
        onFilterPress={() =>
          navigation.navigate(ROUTES.FILTERS, { currentFilters: filters })
        }
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
          <FilterChip label="Rent a House" onPress={() => handleQuickPurpose("rent")} />
          <FilterChip label="Buy a House" onPress={() => handleQuickPurpose("sale")} />
          <FilterChip label="Office Space" onPress={() => handleQuickPurpose("office")} />
        </ScrollView>

        {/* <View style={styles.activeBox}>
          <Text style={styles.activeTitle}>Active Filters</Text>
          <Text style={styles.activeText}>
            {Object.entries(filters)
              .filter(([, value]) => value !== undefined && value !== null && value !== "")
              .map(([key, value]) => `${key}: ${value}`)
              .join(" • ") || "No filters applied"}
          </Text>
        </View> */}

        {loading ? <LoadingState /> : null}

        {!loading && error ? (
          <EmptyState title="Could not load results" message={error} />
        ) : null}

        {!loading && !error && listings.length === 0 ? (
          <EmptyState
            title="No matching properties"
            message="Adjust your search or filters and try again."
          />
        ) : null}

        {!loading &&
          !error &&
          listings.map((item) => (
            <ListingCard
              key={item._id || item.id}
              item={{
                ...item,
                image:
                  item?.images?.[0] ||
                  item?.image ||
                  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0"
              }}
              onPress={() =>
                navigation.navigate(ROUTES.LISTING_DETAILS, {
                  listing: {
                    ...item,
                    image:
                      item?.images?.[0] ||
                      item?.image ||
                      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0"
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
  },
  row: {
    marginTop: 14,
    marginBottom: 16
  },
  activeBox: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16
  },
  activeTitle: {
    fontWeight: "700",
    color: colors.text,
    marginBottom: 6
  },
  activeText: {
    color: colors.textSoft,
    lineHeight: 20
  }
});
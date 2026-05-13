import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import StickyHeader from "../../components/common/StickyHeader";
import FilterChip from "../../components/common/FilterChip";
import SectionHeader from "../../components/common/SectionHeader";
import FeaturedListingCard from "../../components/cards/FeaturedListingCard";
import ListingCard from "../../components/cards/ListingCard";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";
import SearchFilterRow from "../../components/common/SeachFilterRow";
import PropertyTypeButton from "../../components/common/PropertyTypeButton";
import ROUTES from "../../constants/routes";
import useListings from "../../hooks/useListings";
import useDebounce from "../../hooks/useDebounce";
import BudgetListingCard from "../../components/cards/BudgetListingCard";
import ServiceCategoryCard from "../../components/cards/ServiceCategoryCard";
import { serviceCategories } from "../../constants/serviceCategories.js";
import {
  RESIDENTIAL_TYPES,
  RESIDENTIAL_TYPE_LABELS
} from "../../constants/propertyTypes.js";
import useLatestListings from "../../hooks/useLatestListing.js";
import LifestyleCard from "../../components/cards/LifestyleCard";
import { lifestyleCategories } from "../../constants/lifestyleCategories";
import CompactListingCard from "../../components/cards/CompactListingCard";
import HelpCTA from "../../components/common/HelpCTA";
import useRecentlyViewed from "../../hooks/useRecentlyViewed";
import HomeServicesPreview from "../../components/home/HomeServicePreview";
import colors from "../../constants/colors.js"
import logo from "../../assets/log.jpeg";
import BrandedLoader from "../../components/common/BrandedLoader.js";

const quickFilters = ["rent", "sale", "office", "Nairobi", "Kiambu", "Kajiado"];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { listings, loading, error, setFilters } = useListings({
    status: "approved",
    availability: "available",
    isActive: true
  });

  const { listings: latestListings, loading: latestLoading } =
    useLatestListings();

  const rentListings = (listings || [])
    .filter((item) => item.purpose === "rent")
    .slice(0, 6);

  const budgetListings = (listings || [])
    .filter((item) => item.purpose === "rent" && Number(item.price) <= 40000)
    .slice(0, 6);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearch || undefined
    }));
  }, [debouncedSearch, setFilters]);

  const handleQuickFilter = (item) => {
    const normalized = item.toLowerCase();

    if (["rent", "sale", "office"].includes(normalized)) {
      if (normalized === "office") {
        setFilters((prev) => ({
          ...prev,
          purpose: "rent",
          type: "office"
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          purpose: normalized,
          type: undefined
        }));
      }

      return;
    }

    setFilters((prev) => ({
      ...prev,
      county: item,
      town: undefined
    }));
  };

  const handleResidentialTypePress = (type) => {
    navigation.navigate("ExploreTab", {
      screen: ROUTES.EXPLORE,
      params: {
        filters: {
          status: "approved",
          availability: "available",
          isActive: true,
          type
        }
      }
    });
  };

  const saleListings = listings
  .filter((item) => item.purpose === "sale")
  .slice(0, 10);

  const { recentListings } = useRecentlyViewed();

  const normalizeListing = (item) => ({
    ...item,
    image:
      item?.images?.[0] ||
      item?.image ||
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0"
  });

if (loading) {
  return (
    <ScreenWrapper>
      <BrandedLoader
        title="Finding homes"
        message="Loading featured and latest listings..."
      />
    </ScreenWrapper>
  );
}
  

  return (
    <ScreenWrapper>
      <StickyHeader
        logo={logo}
        onFilterPress={() =>
          navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })
        }
      />
      

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
       

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.typeRow}
          contentContainerStyle={styles.typeRowContent}
          decelerationRate="fast"
          snapToAlignment="start"
        >
          {RESIDENTIAL_TYPES.map((type) => (
            <PropertyTypeButton
              key={type}
              label={RESIDENTIAL_TYPE_LABELS[type]}
              onPress={() => handleResidentialTypePress(type)}
            />
          ))}
        </ScrollView>

        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {quickFilters.map((item) => (
            <FilterChip
              key={item}
              label={item === "sale" ? "Buy" : item}
              onPress={() => handleQuickFilter(item)}
            />
          ))}
        </ScrollView> */}

        <SectionHeader title="Latest Listings" />

        {latestLoading ? <LoadingState /> : null}

        {!latestLoading && latestListings.length > 0 ? (
          <FlatList
            horizontal
            data={latestListings}
            keyExtractor={(item) => item._id || item.id}
            renderItem={({ item }) => (
              <FeaturedListingCard
                item={normalizeListing(item)}
                onPress={() =>
                  navigation.navigate(ROUTES.LISTING_DETAILS, {
                    listing: normalizeListing(item)
                  })
                }
              />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        ) : null}

        <SectionHeader title="Browse by Lifestyle" />

        <FlatList
          horizontal
          data={lifestyleCategories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LifestyleCard
              item={item}
              onPress={() =>
                navigation.navigate("ExploreTab", {
                  screen: ROUTES.EXPLORE,
                  params: {
                    filters: {
                      status: "approved",
                      availability: "available",
                      isActive: true,
                      ...item.filters
                    }
                  }
                })
              }
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.lifestyleList}
        />


        {budgetListings.length > 0 ? (
          <>
            <SectionHeader title="Budget-Friendly" actionText="View All" />

            <View style={styles.twoColumnGrid}>
              {budgetListings.map((item, index) => (
                <View
                  key={item._id || item.id}
                  style={[
                    styles.gridItem,
                    index % 2 === 0 ? styles.gridItemLeft : styles.gridItemRight
                  ]}
                >
                  <BudgetListingCard
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
                </View>
              ))}
            </View>
          </>
        ) : null}


        <SectionHeader title="Rent Home/Office Space" actionText="View All" />

        <View style={styles.twoColumnGrid}>
          {rentListings.map((item, index) => (
            <View
              key={item._id || item.id}
              style={[
                styles.gridItem,
                index % 2 === 0 ? styles.gridItemLeft : styles.gridItemRight
              ]}
            >
              <CompactListingCard
                item={normalizeListing(item)}
                onPress={() =>
                  navigation.navigate(ROUTES.LISTING_DETAILS, {
                    listing: normalizeListing(item)
                  })
                }
              />
            </View>
          ))}
        </View>

        
          
        <HomeServicesPreview
            services={serviceCategories.slice(0, 4)}
            onViewAll={() => navigation.navigate("ServicesTab")}
            onServicePress={(item) =>
              navigation.navigate("ServicesTab", {
                screen: ROUTES.SERVICE_CATEGORY,
                params: { category: item }
              })
            }
          />

        

        {saleListings.length > 0 ? (
          <>
            <SectionHeader title="Properties for Sale"  />

            <FlatList
              horizontal
              data={saleListings}
              keyExtractor={(item) => item._id || item.id}
              renderItem={({ item }) => (
                <FeaturedListingCard
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
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </>
        ) : null}

        {recentListings.length > 0 ? (
          <>
            <SectionHeader title="Recently Viewed" />

            <FlatList
              horizontal
              data={recentListings}
              keyExtractor={(item) => item._id || item.id}
              renderItem={({ item }) => (
                <FeaturedListingCard
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
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </>
        ) : null}

        <SectionHeader />

        <HelpCTA
          onPress={() => {
            // for now simple action
            navigation.navigate("ExploreTab", {
              screen: ROUTES.FILTERS
            });
          }}
          contentContainerStyle={styles.helpCTA}
        />

       
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32
  },
  typeRow: {
    marginTop: 14,
    marginBottom: 16
  },
  typeRowContent: {
    paddingRight: 8
  },
  filterRow: {
    marginTop: 14,
    marginBottom: 22
  },
  horizontalList: {
    paddingBottom: 8,
    marginBottom: 22
  },
  lifestyleList: {
    paddingBottom: 8,
    marginBottom: 22
  },
  twoColumnGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 22
  },
  gridItem: {
    width: "50%"
  },
  gridItemLeft: {
    paddingRight: 7
  },
  gridItemRight: {
    paddingLeft: 7
  },
});
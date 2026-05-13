import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking, Share } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import CustomButton from "../../components/common/CustomButton";
import ListingCard from "../../components/cards/ListingCard";
import ListingImageCarousel from "../../components/listings/ListingImageCarousel";
import SectionHeader from "../../components/common/SectionHeader";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";
import colors from "../../constants/colors";
import { formatCurrency } from "../../utils/formatCurrency";
import { getDisplayLocation } from "../../utils/getDisplayLocation";
import ROUTES from "../../constants/routes";
import useAuth from "../../hooks/useAuth";
import { getSimilarListings } from "../../services/listingService";
import useRecentlyViewed from "../../hooks/useRecentlyViewed";


export default function ListingDetailsScreen({ route, navigation }) {
  const { listing } = route.params;
  const { isAuthenticated } = useAuth();

  const [similarListings, setSimilarListings] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  const handleContact = () => {
  if (!isAuthenticated) {
    navigation.navigate(ROUTES.LOGIN, {
      redirectTab: "NotificationsTab",
      redirectTo: ROUTES.ALERT_INBOX,
      listing
    });
    return;
  }

  navigation.navigate("NotificationsTab", {
    screen: ROUTES.ALERT_INBOX,
    params: { listing }
  });
};

  const handleCall = () => {
    if (!listing?.contactPhone) return;

    Linking.openURL(`tel:${listing.contactPhone}`);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${listing.title} - ${formatCurrency(listing.price)} in ${getDisplayLocation(listing)}`
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  const { addRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    const fetchSimilarListings = async () => {
      try {
        setLoadingSimilar(true);

        const data = await getSimilarListings({
          status: "approved",
          availability: "available",
          isActive: true,
          purpose: listing?.purpose,
          county: listing?.county,
          type: listing?.type
        });

        let items = [];

        if (Array.isArray(data)) {
          items = data;
        } else if (Array.isArray(data?.listings)) {
          items = data.listings;
        } else if (Array.isArray(data?.data)) {
          items = data.data;
        }

        const filtered = items.filter(
          (item) => String(item._id || item.id) !== String(listing._id || listing.id)
        );

        setSimilarListings(filtered.slice(0, 4));
      } catch (error) {
        setSimilarListings([]);
      } finally {
        setLoadingSimilar(false);
      }

      if (listing?._id) {
          addRecentlyViewed(listing);
        }
     
    };

    fetchSimilarListings();
  }, [listing]);

  const amenities = listing?.amenities
    ? Object.entries(listing.amenities).filter(([, value]) => value === true)
    : [];

  const galleryImages =
    Array.isArray(listing?.images) && listing.images.length > 0
      ? listing.images
      : listing?.image
      ? [listing.image]
      : [];

  const isResidential = listing?.type !== "office" && listing?.type !== "other";

  return (
    <ScreenWrapper>
      <DetailsHeader
        title="Property Details"
        onBackPress={() => navigation.goBack()}
        onFilterPress={() => navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.content}
      >
       
            <ListingImageCarousel images={galleryImages} />
        
        

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatCurrency(listing.price)}</Text>
          {listing?.purpose === "rent" && <Text style={styles.period}>/ month</Text>}
          {listing?.purpose === "sale" && <Text style={styles.period}>/ total</Text>}
        </View>

        <Text style={styles.title}>{listing.title}</Text>

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={18} color={colors.primary} />
          <Text style={styles.location}>{getDisplayLocation(listing)}</Text>
        </View>

        <View style={styles.statsContainer}>
          {isResidential ? (
            <>
              <View style={styles.statItem}>
                <Ionicons name="bed-outline" size={20} color={colors.primary} />
                <Text style={styles.statValue}>{listing.bedrooms ?? 0}</Text>
                <Text style={styles.statLabel}>bedrooms</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="water-outline" size={20} color={colors.primary} />
                <Text style={styles.statValue}>{listing.bathrooms ?? 0}</Text>
                <Text style={styles.statLabel}>bathrooms</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="home-outline" size={20} color={colors.primary} />
                <Text style={styles.statValue}>{listing.type}</Text>
                <Text style={styles.statLabel}>type</Text>
              </View>
            </>
          ) : (
            <View style={styles.statItem}>
              <Ionicons name="resize-outline" size={20} color={colors.primary} />
              <Text style={styles.statValue}>{listing.size || "N/A"}</Text>
              <Text style={styles.statLabel}>{listing.sizeUnit || "sqft"}</Text>
            </View>
          )}
        </View>

        <View style={styles.metaInfo}>
          <View style={styles.metaItem}>
            <Ionicons name="flag-outline" size={16} color={colors.textLight} />
            <Text style={styles.metaText}>Purpose: {listing.purpose}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="business-outline" size={16} color={colors.textLight} />
            <Text style={styles.metaText}>Type: {listing.type}</Text>
          </View>
        </View>

        {listing.area ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specific Area</Text>
            <Text style={styles.description}>{listing.area}</Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the property</Text>
          <Text style={styles.description}>
            {listing.description || "No description available yet."}
          </Text>
        </View>

        {amenities.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesWrap}>
              {amenities.map(([key]) => (
                <View key={key} style={styles.amenityChip}>
                  <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
                  <Text style={styles.amenityText}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.buttonWrap}>
          <CustomButton title="Contact Landlord" onPress={handleContact} />

          <View style={styles.secondaryButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
              <Ionicons name="call-outline" size={18} color={colors.primary} />
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={18} color={colors.primary} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.similarSection}>
          <SectionHeader title="Similar Properties" />

          {loadingSimilar ? (
            <LoadingState />
          ) : !loadingSimilar && similarListings.length === 0 ? (
            <EmptyState
              title="No similar properties found"
              message="We could not find similar listings right now."
            />
          ) : (
            similarListings.map((item) => (
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
                  navigation.push(ROUTES.LISTING_DETAILS, {
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
            ))
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 16,
    paddingHorizontal: 16
  },
  price: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "800"
  },
  period: {
    color: colors.textLight,
    fontSize: 14,
    marginLeft: 4
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
    paddingHorizontal: 16
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    paddingHorizontal: 16
  },
  location: {
    color: colors.textLight,
    fontSize: 14,
    marginLeft: 6
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3
  },
  statItem: {
    alignItems: "center",
    flex: 1
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginTop: 6
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
    textTransform: "capitalize"
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    height: 40,
    alignSelf: "center"
  },
  metaInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 16,
    paddingHorizontal: 16
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  metaText: {
    color: colors.textLight,
    fontSize: 13,
    textTransform: "capitalize"
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 10
  },
  description: {
    color: colors.textLight,
    lineHeight: 22,
    fontSize: 14
  },
  amenitiesWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 4
  },
  amenityChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6
  },
  amenityText: {
    color: colors.text,
    fontSize: 13,
    textTransform: "capitalize"
  },
  buttonWrap: {
    marginTop: 28,
    paddingHorizontal: 16
  },

  secondaryButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 10
  },

  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white
  },

  actionText: {
    color: colors.primary,
    fontWeight: "700"
  },
  similarSection: {
    marginTop: 28,
    paddingHorizontal: 16
  }
});
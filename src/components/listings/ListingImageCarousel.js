import React, { useState, useRef } from "react";
import { FlatList, Image, StyleSheet, View, Dimensions, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

const { width } = Dimensions.get("window");
const IMAGE_WIDTH = width - 32;
const THUMBNAIL_SIZE = 60;

export default function ListingImageCarousel({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const validImages =
    Array.isArray(images) && images.length > 0
      ? images
      : ["https://images.unsplash.com/photo-1560185007-cde436f6a4d0"];

  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / IMAGE_WIDTH);
    setActiveIndex(index);
  };

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  };

  const goToNext = () => {
    if (activeIndex < validImages.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  const goToPrev = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      {/* Main Carousel */}
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={validImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={renderItem}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />

        {/* Navigation Arrows
        {validImages.length > 1 && (
          <>
            {activeIndex > 0 && (
              <TouchableOpacity
                style={[styles.navButton, styles.navButtonLeft]}
                onPress={goToPrev}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-back" size={24} color={colors.white} />
              </TouchableOpacity>
            )}

            {activeIndex < validImages.length - 1 && (
              <TouchableOpacity
                style={[styles.navButton, styles.navButtonRight]}
                onPress={goToNext}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-forward" size={24} color={colors.white} />
              </TouchableOpacity>
            )}
          </>
        )} */}

        {/* Image Counter */}
        {validImages.length > 1 && (
          <View style={styles.counter}>
            <Text style={styles.counterText}>
              {activeIndex + 1} / {validImages.length}
            </Text>
          </View>
        )}
      </View>

      {/* Thumbnail Strip */}
      {validImages.length > 1 && (
        <View style={styles.thumbnailStrip}>
          <FlatList
            data={validImages}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `thumb-${item}-${index}`}
            contentContainerStyle={styles.thumbnailContainer}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => scrollToIndex(index)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.thumbnailWrapper,
                    index === activeIndex && styles.thumbnailWrapperActive
                  ]}
                >
                  <Image
                    source={{ uri: item }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16
  },
  carouselContainer: {
    position: "relative"
  },
  imageContainer: {
    width: IMAGE_WIDTH,
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: 16
  },
  image: {
    width: IMAGE_WIDTH,
    height: 280,
    backgroundColor: colors.border
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -22 }],
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10
  },
  navButtonLeft: {
    left: 24
  },
  navButtonRight: {
    right: 24
  },
  counter: {
    position: "absolute",
    bottom: 16,
    right: 24,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10
  },
  counterText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600"
  },
  thumbnailStrip: {
    marginTop: 12,
    marginBottom: 4
  },
  thumbnailContainer: {
    paddingHorizontal: 16,
    gap: 8
  },
  thumbnailWrapper: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent"
  },
  thumbnailWrapperActive: {
    borderColor: colors.primary
  },
  thumbnail: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    backgroundColor: colors.border
  }
});
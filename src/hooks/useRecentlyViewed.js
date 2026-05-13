import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "recently_viewed_listings";

export const saveRecentlyViewed = async (listing) => {
  try {
    const existing = await AsyncStorage.getItem(RECENTLY_VIEWED_KEY);
    const parsed = existing ? JSON.parse(existing) : [];

    const filtered = parsed.filter(
      (item) => (item._id || item.id) !== (listing._id || listing.id)
    );

    const updated = [listing, ...filtered].slice(0, 10);

    await AsyncStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
  } catch (error) {
    console.log("Error saving recently viewed", error);
  }
};


export const getRecentlyViewed = async () => {
  try {
    const existing = await AsyncStorage.getItem(RECENTLY_VIEWED_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch (error) {
    console.log("Error loading recently viewed", error);
    return [];
  }
};

export default function useRecentlyViewed() {
  const [recentListings, setRecentListings] = useState([]);

  const loadRecentlyViewed = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setRecentListings(JSON.parse(data));
      }
    } catch (err) {
      console.log("Error loading recently viewed", err);
    }
  };

  const addRecentlyViewed = async (listing) => {
    try {
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      let parsed = existing ? JSON.parse(existing) : [];

      // remove if already exists
      parsed = parsed.filter((item) => item._id !== listing._id);

      // add to top
      parsed.unshift(listing);

      // limit to 5
      parsed = parsed.slice(0, 5);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      setRecentListings(parsed);
    } catch (err) {
      console.log("Error saving recently viewed", err);
    }
  };

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  return {
    recentListings,
    addRecentlyViewed
  };
}
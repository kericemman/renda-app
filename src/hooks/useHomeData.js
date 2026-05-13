import { useEffect, useState } from "react";
import { getFeaturedListings, getListings } from "../services/listingService";

export default function useHomeData() {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [latestListings, setLatestListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const normalizeListings = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.listings)) return data.listings;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  };

  const fetchHomeData = async ({ refresh = false } = {}) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const [featuredResponse, latestResponse] = await Promise.all([
        getFeaturedListings(),
        getListings({
          status: "approved",
          availability: "available",
          isActive: true
        })
      ]);

      setFeaturedListings(normalizeListings(featuredResponse));
      setLatestListings(normalizeListings(latestResponse));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load home data.");
      setFeaturedListings([]);
      setLatestListings([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return {
    featuredListings,
    latestListings,
    loading,
    refreshing,
    error,
    refetch: () => fetchHomeData({ refresh: true })
  };
}
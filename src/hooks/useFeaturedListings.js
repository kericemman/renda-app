import { useEffect, useState } from "react";
import { getFeaturedListings } from "../services/listingService";

export default function useFeaturedListings() {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getFeaturedListings();

        if (Array.isArray(data)) {
          setFeaturedListings(data);
        } else if (Array.isArray(data?.listings)) {
          setFeaturedListings(data.listings);
        } else if (Array.isArray(data?.data)) {
          setFeaturedListings(data.data);
        } else {
          setFeaturedListings([]);
        }
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load featured listings.");
        setFeaturedListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return {
    featuredListings,
    loading,
    error
  };
}
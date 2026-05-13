import { useEffect, useState } from "react";
import { getListings } from "../services/listingService";

export default function useLatestListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getListings({
          status: "approved",
          availability: "available",
          isActive: true,
          limit: 10 // we’ll use this on backend if supported
        });

        if (Array.isArray(data)) {
          setListings(data);
        } else if (Array.isArray(data?.listings)) {
          setListings(data.listings);
        } else if (Array.isArray(data?.data)) {
          setListings(data.data);
        } else {
          setListings([]);
        }
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load latest listings.");
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  return {
    listings,
    loading,
    error
  };
}
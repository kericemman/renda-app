import { useCallback, useEffect, useState } from "react";
import { getListings } from "../services/listingService";

export default function useListings(initialFilters = {}) {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState(initialFilters || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchListings = useCallback(async (nextFilters = filters) => {
    try {
      setLoading(true);
      setError("");

      const cleanedFilters = Object.fromEntries(
        Object.entries(nextFilters || {}).filter(
          ([, value]) => value !== undefined && value !== null && value !== ""
        )
      );

      const data = await getListings(cleanedFilters);

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
      setError(err?.response?.data?.message || "Failed to load listings.");
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchListings(filters);
  }, [filters, fetchListings]);

  return {
    listings: Array.isArray(listings) ? listings : [],
    filters,
    loading,
    error,
    setFilters,
    refetch: fetchListings
  };
}
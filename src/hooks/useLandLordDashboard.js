import { useCallback, useEffect, useState } from "react";
import { getLandlordDashboardStats } from "../services/landlordDashboardService";

export default function useLandlordDashboard() {
  const [stats, setStats] = useState(null);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async ({ refresh = false } = {}) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const data = await getLandlordDashboardStats();

      setStats(data.stats || null);
      setRecentInquiries(data.recentInquiries || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load dashboard.");
      setStats(null);
      setRecentInquiries([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    stats,
    recentInquiries,
    loading,
    refreshing,
    error,
    refetch: () => fetchDashboard({ refresh: true })
  };
}
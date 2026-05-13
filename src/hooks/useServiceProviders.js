import { useEffect, useState } from "react";
import { getServiceProviders } from "../services/marketplaceService";

export default function useServiceProviders(params = {}) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getServiceProviders(params);

        if (Array.isArray(data)) {
          setProviders(data);
        } else if (Array.isArray(data?.providers)) {
          setProviders(data.providers);
        } else if (Array.isArray(data?.data)) {
          setProviders(data.data);
        } else {
          setProviders([]);
        }
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load service providers.");
        setProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [JSON.stringify(params)]);

  return { providers, loading, error };
}
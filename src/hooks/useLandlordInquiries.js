import { useEffect, useState } from "react";
import { getLandlordInquiries } from "../services/landlordInquiryService";

export default function useLandlordInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const normalize = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.inquiries)) return data.inquiries;
    if (Array.isArray(data?.alerts)) return data.alerts;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  };

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getLandlordInquiries();
      setInquiries(normalize(data));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load inquiries.");
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return {
    inquiries,
    loading,
    error,
    refetch: fetchInquiries
  };
}
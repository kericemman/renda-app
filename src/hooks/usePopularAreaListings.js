import { useEffect, useState } from "react";
import { getListings } from "../services/listingService";

const AREAS = [
  { id: "kilimani", label: "Kilimani", county: "Nairobi", town: "Kilimani" },
  { id: "westlands", label: "Westlands", county: "Nairobi", town: "Westlands" },
  { id: "ruiru", label: "Ruiru", county: "Kiambu", town: "Ruiru" }
];

export default function usePopularAreaListings() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPopularAreas = async () => {
      try {
        setLoading(true);

        const results = await Promise.all(
          AREAS.map(async (area) => {
            const data = await getListings({
              status: "approved",
              availability: "available",
              isActive: true,
              county: area.county,
              town: area.town,
              limit: 6
            });

            const listings = Array.isArray(data)
              ? data
              : data?.listings || data?.data || [];

            return {
              ...area,
              listings
            };
          })
        );

        setSections(results.filter((section) => section.listings.length > 0));
      } catch (error) {
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularAreas();
  }, []);

  return { sections, loading };
}
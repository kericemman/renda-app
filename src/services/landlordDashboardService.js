import api from "./api";

export const getLandlordDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};
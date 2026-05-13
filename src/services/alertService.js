import api from "./api";

export const sendListingInquiryAlert = async (payload) => {
  const response = await api.post("/alerts/listing-inquiry", payload);
  return response.data;
};

export const getMyAlerts = async () => {
  const response = await api.get("/alerts/me");
  return response.data;
};
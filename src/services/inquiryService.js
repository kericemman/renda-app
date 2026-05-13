import api from "./api";

export const getLandlordInquiries = async () => {
  const response = await api.get("/alerts/landlord");
  return response.data;
};

export const replyToInquiry = async (inquiryId, payload) => {
  const response = await api.post(`/alerts/${inquiryId}/reply`, payload);
  return response.data;
};

export const markInquiryAsRead = async (inquiryId) => {
  const response = await api.patch(`/alerts/${inquiryId}/read`);
  return response.data;
};
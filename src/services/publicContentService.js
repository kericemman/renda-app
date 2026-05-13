import api from "./api";

export const getSupportCategories = async () => {
  const response = await api.get("/public/support-categories");
  return response.data;
};

export const submitSupportTicket = async (payload) => {
  const response = await api.post("/public/support-tickets", payload);
  return response.data;
};

export const getContactInfo = async () => {
  const response = await api.get("/public/contact-info");
  return response.data;
};

export const getUpdates = async () => {
  const response = await api.get("/public/updates");
  return response.data;
};

export const subscribeToUpdates = async (payload) => {
  const response = await api.post("/public/subscribe", payload);
  return response.data;
};

export const getPolicyPage = async (slug) => {
  const response = await api.get(`/public/policies/${slug}`);
  return response.data;
};
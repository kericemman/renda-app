import api from "./api";

export const getServiceCategories = async () => {
  const response = await api.get("/services/categories");
  return response.data;
};

export const getServiceProviders = async (params = {}) => {
  const response = await api.get("/services/providers", { params });
  return response.data;
};

export const getServiceProviderById = async (id) => {
  const response = await api.get(`/services/providers/${id}`);
  return response.data;
};
import api from "./api";

export const getListings = async (params = {}) => {
  const response = await api.get("/listings", { params });
  return response.data;
};

export const getListingById = async (id) => {
  const response = await api.get(`/listings/${id}`);
  return response.data;
};

export const getNearbyListings = async (params) => {
  const response = await api.get("/listings/nearby", { params });
  return response.data;
};

export const createListing = async (payload) => {
  const response = await api.post("/listings", payload);
  return response.data;
};

export const getSimilarListings = async (params = {}) => {
  const response = await api.get("/listings", { params });
  return response.data;
};
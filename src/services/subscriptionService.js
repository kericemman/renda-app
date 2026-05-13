import api from "./api";

export const getPlans = () => api.get("/subscriptions/plans");
export const getMySubscription = () => api.get("/subscriptions/me");
export const initializeSubscription = (payload) => api.post("/subscriptions/initialize", payload);
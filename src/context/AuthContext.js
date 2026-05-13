import React, { createContext, useEffect, useMemo, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { getCurrentUser, loginUser, signupUser, socialLoginUser } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const loadUser = async () => {
    try {
      const token = await SecureStore.getItemAsync("renda_token");

      if (!token) {
        setUser(null);
        return;
      }

      const data = await getCurrentUser();
      setUser(data.user);
    } catch (error) {
      await SecureStore.deleteItemAsync("renda_token");
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (payload) => {
   
    const data = await loginUser(payload);

    await SecureStore.setItemAsync("renda_token", data.token);
    setUser(data.user);

    return data.user;
  };

  const signup = async (payload) => {
    const data = await signupUser(payload);

    await SecureStore.setItemAsync("renda_token", data.token);
    setUser(data.user);

    return data.user;
  };

  const socialLogin = async (payload) => {
    const data = await socialLoginUser(payload);

    await SecureStore.setItemAsync("renda_token", data.token);
    setUser(data.user);

    return data.user;
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("renda_token");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      authLoading,
      isAuthenticated: !!user,
      isLandlord: user?.role === "landlord",
      login,
      signup,
      socialLogin,
      logout,
      reloadUser: loadUser
    }),
    [user, authLoading]
  );

  

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
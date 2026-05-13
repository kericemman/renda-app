import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./HomeStack";
import ExploreStack from "./ExploreStack";
import ServicesStack from "./ServicesStack";
import NotificationsStack from "./NotificationsStack";
import ProfileStack from "./ProfileStack";
import colors from "../constants/colors";
import useAuth from "../hooks/useAuth";
import BrandedLoader from "../components/common/BrandedLoader";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { authLoading } = useAuth();

  if (authLoading) {
    return (
      <BrandedLoader
        title="Welcome to RendaHomes"
        message="Checking your account and preparing listings..."
      />
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted || "#9CA3AF",
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
          paddingBottom: 15,
          paddingHorizontal: 12,
          backgroundColor: colors.surface || "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: colors.border || "#E5E7EB",
        },
        tabBarItemStyle: {
          borderRadius: 8,
          marginHorizontal: 4,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "400",
          marginTop: 4,
          letterSpacing: 0.3,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = focused ? getActiveIcon(route.name) : getIcon(route.name);
          return (
            <Ionicons 
              name={iconName} 
              size={focused ? 24 : 22} 
              color={color} 
            />
          );
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack} 
        options={{ 
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={focused ? 24 : 22} 
              color={color} 
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="ExploreTab" 
        component={ExploreStack} 
        options={{ 
          title: "Explore",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? "compass" : "compass-outline"} 
              size={focused ? 24 : 22} 
              color={color} 
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="ServicesTab" 
        component={ServicesStack} 
        options={{ 
          title: "Services",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? "briefcase" : "briefcase-outline"} 
              size={focused ? 24 : 22} 
              color={color} 
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="NotificationsTab" 
        component={NotificationsStack} 
        options={{ 
          title: "Alerts",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? "notifications" : "notifications-outline"} 
              size={focused ? 24 : 22} 
              color={color} 
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileStack} 
        options={{ 
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={focused ? 24 : 22} 
              color={color} 
            />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

function getIcon(routeName) {
  const icons = {
    HomeTab: "home-outline",
    ExploreTab: "compass-outline",
    ServicesTab: "briefcase-outline",
    NotificationsTab: "notifications-outline",
    ProfileTab: "person-outline"
  };
  return icons[routeName];
}

function getActiveIcon(routeName) {
  const icons = {
    HomeTab: "home",
    ExploreTab: "compass",
    ServicesTab: "briefcase",
    NotificationsTab: "notifications",
    ProfileTab: "person"
  };
  return icons[routeName];
}
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServicesHomeScreen from "../screens/services/ServicesHomeScreen";
import ServiceCategoryScreen from "../screens/services/ServiceCategoryScreen";
import ServiceDetailsScreen from "../screens/services/ServiceDetailsScreen";
import ROUTES from "../constants/routes";

const Stack = createNativeStackNavigator();

export default function ServicesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.SERVICES_HOME} component={ServicesHomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.SERVICE_CATEGORY} component={ServiceCategoryScreen} />
      <Stack.Screen name={ROUTES.SERVICE_DETAILS} component={ServiceDetailsScreen} />
    </Stack.Navigator>
  );
}
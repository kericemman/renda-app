import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandlordDashboardScreen from "../screens/landlord/LandlordDashboardScreen";
import MyListingsScreen from "../screens/landlord/MyListingsScreen";
import AddListingScreen from "../screens/landlord/AddListingScreen";
import InquiriesScreen from "../screens/landlord/InquiriesScreen";
import SubscriptionScreen from "../screens/landlord/SubscriptionScreen";
import ROUTES from "../constants/routes";

const Stack = createNativeStackNavigator();

export default function LandlordStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.LANDLORD_DASHBOARD} component={LandlordDashboardScreen} />
      <Stack.Screen name={ROUTES.MY_LISTINGS} component={MyListingsScreen} />
      <Stack.Screen name={ROUTES.ADD_LISTING} component={AddListingScreen} />
      <Stack.Screen name={ROUTES.LANDLORD_INQUIRIES} component={InquiriesScreen} />
      <Stack.Screen name={ROUTES.SUBSCRIPTION} component={SubscriptionScreen} />
    </Stack.Navigator>
  );
}
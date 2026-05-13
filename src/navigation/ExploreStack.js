import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExploreScreen from "../screens/explore/ExploreScreen";
import FiltersScreen from "../screens/explore/FiltersScreen";
import MapViewScreen from "../screens/explore/MapViewScreen";
import ListingDetailsScreen from "../screens/home/ListingDetailsScreen";
import ContactLandlordScreen from "../screens/home/ContactLandlordScreen";
import InquirySuccessScreen from "../screens/home/InquirySuccessScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import ROUTES from "../constants/routes";

const Stack = createNativeStackNavigator();

export default function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.EXPLORE}
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={ROUTES.FILTERS} component={FiltersScreen} />
      <Stack.Screen name={ROUTES.MAP_VIEW} component={MapViewScreen} />
      <Stack.Screen
        name={ROUTES.LISTING_DETAILS}
        component={ListingDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.CONTACT_LANDLORD}
        component={ContactLandlordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.INQUIRY_SUCCESS}
        component={InquirySuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.SIGNUP} component={SignupScreen} />
    </Stack.Navigator>
  );
}
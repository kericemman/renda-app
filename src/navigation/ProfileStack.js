import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/profile/ProfileScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import LandlordDashboardScreen from "../screens/landlord/LandlordDashboardScreen";
import InquiriesScreen from "../screens/landlord/InquiriesScreen";
import ROUTES from "../constants/routes";
import InquiryDetailsScreen from "../screens/landlord/InquiryDetailsScreen";
import SupportScreen from "../screens/profile/SupportScreen";
import ContactUsScreen from "../screens/profile/ContactUsScreen";
import AppUpdatesScreen from "../screens/profile/AppUpdatesScreen";
import PrivacyPolicyScreen from "../screens/profile/PrivacyPolicyScreen";
import AppUpdateDetailsScreen from "../screens/profile/UpdateDetailsScreen";
import AccountTypeScreen from "../screens/auth/AccountTypeScreen";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.SIGNUP} component={SignupScreen} />

      <Stack.Screen
        name={ROUTES.LANDLORD_DASHBOARD}
        component={LandlordDashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.LANDLORD_INQUIRIES}
        component={InquiriesScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ROUTES.LANDLORD_INQUIRY_DETAILS}
        component={InquiryDetailsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ROUTES.APP_UPDATE_DETAILS}
        component={AppUpdateDetailsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ROUTES.ACCOUNT_TYPE}
        component={AccountTypeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name={ROUTES.SUPPORT} component={SupportScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.CONTACT_US} component={ContactUsScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.APP_UPDATES} component={AppUpdatesScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.PRIVACY_POLICY} component={PrivacyPolicyScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationsScreen from "../screens/notifications/NotificationsScreen";
import AlertInboxScreen from "../screens/notifications/AlertInboxScreen";
import AlertComposeScreen from "../screens/notifications/AlertComposeScreen";
import InquirySuccessScreen from "../screens/home/InquirySuccessScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import ROUTES from "../constants/routes";

const Stack = createNativeStackNavigator();

export default function NotificationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.NOTIFICATIONS}
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.ALERT_INBOX}
        component={AlertInboxScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.ALERT_COMPOSE}
        component={AlertComposeScreen}
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
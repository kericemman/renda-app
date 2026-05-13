import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import AppInput from "../../components/common/AppInput";
import CustomButton from "../../components/common/CustomButton";
import PageIntro from "../../components/common/PageIntro";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";

export default function ContactLandlordScreen({ route, navigation }) {
  const { listing } = route.params;
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: `Hello, I am interested in ${listing.title}.`
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.phone || !form.email || !form.message) {
      Alert.alert("Missing details", "Please complete all fields.");
      return;
    }

    navigation.replace(ROUTES.INQUIRY_SUCCESS);
  };

  return (
    <ScreenWrapper>
      <DetailsHeader
        title="Contact Landlord"
        onBackPress={() => navigation.goBack()}
        onFilterPress={() => navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })}
      />

      <View style={styles.container}>
        <PageIntro
          title="Send Inquiry"
          subtitle={`You’re contacting the landlord about "${listing.title}".`}
        />

        <AppInput
          label="Full Name"
          value={form.fullName}
          onChangeText={(value) => handleChange("fullName", value)}
          placeholder="Enter your full name"
        />

        <AppInput
          label="Phone Number"
          value={form.phone}
          onChangeText={(value) => handleChange("phone", value)}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />

        <AppInput
          label="Email Address"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
          placeholder="Enter your email"
        />

        <AppInput
          label="Message"
          value={form.message}
          onChangeText={(value) => handleChange("message", value)}
          placeholder="Write your message"
          multiline
        />

        <CustomButton title="Send Inquiry" variant="accent" onPress={handleSubmit} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  }
});
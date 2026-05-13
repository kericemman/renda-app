import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import PageIntro from "../../components/common/PageIntro";
import SectionCard from "../../components/common/sectionCard";
import AppInput from "../../components/common/AppInput";
import CustomButton from "../../components/common/CustomButton";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";
import { sendListingInquiryAlert } from "../../services/alertService";
import useAuth from "../../hooks/useAuth";
import { formatCurrency } from "../../utils/formatCurrency";

export default function AlertComposeScreen({ route, navigation }) {
  const { user } = useAuth();
  const listing = route.params?.listing;

  const [message, setMessage] = useState(
    `Hello, I am interested in "${listing?.title}". Please share more details about availability and viewing.`
  );

  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!listing?._id && !listing?.id) {
      Alert.alert("Missing listing", "We could not find the property details.");
      return;
    }

    if (!message.trim()) {
      Alert.alert("Missing message", "Please write a message.");
      return;
    }

    try {
      setLoading(true);

      await sendListingInquiryAlert({
        listingId: listing._id || listing.id,
        landlordId: listing.landlord?._id || listing.landlord,
        message
      });

      navigation.replace(ROUTES.INQUIRY_SUCCESS);
    } catch (err) {
      Alert.alert(
        "Failed to send",
        err?.response?.data?.message || "Could not send your inquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <DetailsHeader
        title="New Inquiry"
        onBackPress={() => navigation.goBack()}
        onFilterPress={() => navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <PageIntro
          title="Message Landlord"
          subtitle="Review the property details and send your inquiry."
        />

        <SectionCard style={styles.card}>
          <Text style={styles.label}>Property</Text>
          <Text style={styles.title}>{listing?.title}</Text>
          <Text style={styles.meta}>
            {listing?.town}, {listing?.county}
          </Text>
          <Text style={styles.price}>{formatCurrency(listing?.price)}</Text>
        </SectionCard>

        <SectionCard style={styles.card}>
          <Text style={styles.label}>Your Details</Text>
          <Text style={styles.meta}>{user?.name || "Signed in user"}</Text>
          <Text style={styles.meta}>{user?.email}</Text>
        </SectionCard>

        <AppInput
          label="Message"
          value={message}
          onChangeText={setMessage}
          placeholder="Write your inquiry"
          multiline
        />

        <CustomButton
          title="Send Inquiry"
          variant="accent"
          loading={loading}
          onPress={handleSend}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32
  },
  card: {
    marginBottom: 14
  },
  label: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: 12,
    marginBottom: 8
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6
  },
  meta: {
    color: colors.textSoft,
    lineHeight: 20
  },
  price: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 8
  }
});
import React, { useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import PageIntro from "../../components/common/PageIntro";
import SectionCard from "../../components/common/sectionCard";
import AppInput from "../../components/common/AppInput";
import CustomButton from "../../components/common/CustomButton";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";
import { replyToInquiry } from "../../services/landlordInquiryService";

export default function InquiryDetailsScreen({ route, navigation }) {
  const { inquiry } = route.params;

  const tenantName =
    inquiry?.user?.name ||
    inquiry?.sender?.name ||
    inquiry?.tenantName ||
    inquiry?.name ||
    "Interested user";

  const listingTitle =
    inquiry?.listing?.title ||
    inquiry?.listingTitle ||
    "Property inquiry";

  const inquiryMessage = inquiry?.message || "No message provided.";

  const defaultReply = useMemo(() => {
    return `Hello ${tenantName}, thank you for your interest in ${listingTitle}. The property is currently available.`;
  }, [tenantName, listingTitle]);

  const [reply, setReply] = useState(defaultReply);
  const [loading, setLoading] = useState(false);

  const handleReply = async () => {
    if (!reply.trim()) {
      Alert.alert("Missing reply", "Please write a reply before sending.");
      return;
    }

    try {
      setLoading(true);

      await replyToInquiry(inquiry._id || inquiry.id, {
        message: reply
      });

      Alert.alert("Reply sent", "Your response has been sent to the user.");
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Failed",
        error?.response?.data?.message || "Could not send reply. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <DetailsHeader
        title="Reply Inquiry"
        onBackPress={() => navigation.goBack()}
        onFilterPress={() =>
          navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })
        }
      />

      <ScrollView contentContainerStyle={styles.content}>
        <PageIntro
          title="Inquiry Details"
          subtitle="Review the user’s message and send a clear response."
        />

        <SectionCard style={styles.card}>
          <Text style={styles.label}>Listing</Text>
          <Text style={styles.title}>{listingTitle}</Text>
        </SectionCard>

        <SectionCard style={styles.card}>
          <Text style={styles.label}>From</Text>
          <Text style={styles.title}>{tenantName}</Text>
          {inquiry?.user?.email || inquiry?.email ? (
            <Text style={styles.meta}>{inquiry?.user?.email || inquiry?.email}</Text>
          ) : null}
          {inquiry?.user?.phone || inquiry?.phone ? (
            <Text style={styles.meta}>{inquiry?.user?.phone || inquiry?.phone}</Text>
          ) : null}
        </SectionCard>

        <View style={styles.chatBlock}>
          <View style={styles.userBubble}>
            <Text style={styles.bubbleLabel}>{tenantName}</Text>
            <Text style={styles.userMessage}>{inquiryMessage}</Text>
          </View>
        </View>

        <AppInput
          label="Reply Message"
          value={reply}
          onChangeText={setReply}
          placeholder="Write your response"
          multiline
        />

        <CustomButton
          title="Send Reply"
          variant="accent"
          loading={loading}
          onPress={handleReply}
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
    marginBottom: 12
  },
  label: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 6
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "800"
  },
  meta: {
    color: colors.textSoft,
    marginTop: 4
  },
  chatBlock: {
    marginVertical: 14
  },
  userBubble: {
    alignSelf: "flex-start",
    maxWidth: "88%",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    borderBottomLeftRadius: 6,
    padding: 14,
    marginBottom: 12
  },
  bubbleLabel: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 6
  },
  userMessage: {
    color: colors.textSoft,
    lineHeight: 21
  }
});
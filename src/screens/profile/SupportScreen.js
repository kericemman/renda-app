import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import PageIntro from "../../components/common/PageIntro";
import SectionCard from "../../components/common/sectionCard";
import AppInput from "../../components/common/AppInput";
import CustomButton from "../../components/common/CustomButton";
import UniversalLoader from "../../components/common/UniversalLoader";
import EmptyState from "../../components/common/EmptyState";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";
import { getSupportCategories, submitSupportTicket } from "../../services/publicContentService";
import BrandedLoader from "../../components/common/BrandedLoader";

export default function SupportScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    try {
      const data = await getSupportCategories();
      setCategories(data.categories || data.data || []);
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!selectedCategory || !subject || !message) {
      Alert.alert("Missing details", "Please select a category and complete the form.");
      return;
    }

    try {
      setSubmitting(true);

      await submitSupportTicket({
        category: selectedCategory,
        subject,
        message,
        source: "mobile_app"
      });

      Alert.alert("Support request sent", "The RendaHomes team will review your request.");
      setSubject("");
      setMessage("");
      setSelectedCategory("");
    } catch (error) {
      Alert.alert(
        "Failed",
        error?.response?.data?.message || "Could not send support request."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <BrandedLoader
          title="Support"
          onBackPress={() => navigation.goBack()}
          onFilterPress={() => navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })}
        />
        <UniversalLoader title="Loading support" message="Preparing support options..." />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      
      

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>How can we help?</Text>
          <Text style={styles.heroText}>
            Choose the kind of support you need and send us a clear message.
          </Text>
        </View>

        

        {categories.length === 0 ? (
          <EmptyState
            title="Support categories unavailable"
            message="Please try again later."
          />
        ) : (
          <SectionCard style={styles.card}>
            <Text style={styles.label}>Select support type</Text>

            <View style={styles.dropdown}>
              {categories.map((item) => (
                <TouchableOpacity
                  key={item._id || item.id}
                  style={[
                    styles.option,
                    selectedCategory === (item._id || item.id) && styles.activeOption
                  ]}
                  onPress={() => setSelectedCategory(item._id || item.id)}
                >
                  <Text
                    style={[
                      styles.optionTitle,
                      selectedCategory === (item._id || item.id) && styles.activeOptionTitle
                    ]}
                  >
                    {item.title || item.name}
                  </Text>
                  {item.description ? (
                    <Text style={styles.optionText}>{item.description}</Text>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>

            <AppInput
              label="Subject"
              value={subject}
              onChangeText={setSubject}
              placeholder="What do you need help with?"
            />

            <AppInput
              label="Message"
              value={message}
              onChangeText={setMessage}
              placeholder="Explain your issue clearly"
              multiline
            />

            <CustomButton
              title="Send Support Request"
              variant="accent"
              loading={submitting}
              onPress={handleSubmit}
            />
          </SectionCard>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 32 },
  hero: {
    backgroundColor: colors.accent,
    borderRadius: 24,
    padding: 22,
    marginBottom: 18
  },
  heroTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "900"
  },
  heroText: {
    color: "#D1FAE5",
    marginTop: 8,
    lineHeight: 21
  },
  card: { marginTop: 4 },
  label: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 10
  },
  dropdown: { marginBottom: 16 },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10
  },
  activeOption: {
    borderColor: colors.primary,
    backgroundColor: "#ECFDF5"
  },
  optionTitle: {
    fontWeight: "900",
    color: colors.text
  },
  activeOptionTitle: {
    color: colors.primary
  },
  optionText: {
    color: colors.textSoft,
    marginTop: 4,
    lineHeight: 18
  }
});
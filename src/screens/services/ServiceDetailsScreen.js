import React from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import CustomButton from "../../components/common/CustomButton";
import SectionCard from "../../components/common/sectionCard";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";

export default function ServiceDetailsScreen({ route, navigation }) {
  const { provider } = route.params;

  const handleContact = () => {
    Alert.alert("Contact Provider", `Call or message ${provider.phone}`);
  };

  return (
    <ScreenWrapper>
      <DetailsHeader
        title="Service Provider"
        onBackPress={() => navigation.goBack()}
        onFilterPress={() => navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: provider.image }} style={styles.image} />

        <Text style={styles.title}>{provider.businessName}</Text>
        <Text style={styles.area}>{provider.serviceArea}</Text>

        <SectionCard style={styles.card}>
          <Text style={styles.sectionTitle}>About Service</Text>
          <Text style={styles.description}>{provider.description}</Text>
        </SectionCard>

        <SectionCard style={styles.card}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <Text style={styles.description}>{provider.phone}</Text>
        </SectionCard>

        <CustomButton title="Contact Provider" variant="accent" onPress={handleContact} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 22,
    marginBottom: 18
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text
  },
  area: {
    color: colors.primary,
    fontWeight: "700",
    marginTop: 6,
    marginBottom: 16
  },
  card: {
    marginBottom: 14
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8
  },
  description: {
    color: colors.textSoft,
    lineHeight: 22
  }
});
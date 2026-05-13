import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import CustomButton from "../../components/common/CustomButton";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";

export default function InquirySuccessScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <DetailsHeader
        title="Success"
        onBackPress={() => navigation.popToTop()}
        onFilterPress={() => navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Inquiry Sent</Text>
        <Text style={styles.message}>
          The landlord has been notified. You can continue browsing more properties.
        </Text>

        <CustomButton title="Back to Home" onPress={() => navigation.popToTop()} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center"
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.success,
    marginBottom: 12
  },
  message: {
    color: colors.textSoft,
    lineHeight: 22,
    marginBottom: 20
  }
});
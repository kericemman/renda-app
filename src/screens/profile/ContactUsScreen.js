import React, { useEffect, useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import DetailsHeader from "../../components/common/DetailsHeader";
import SectionCard from "../../components/common/sectionCard";
import BrandedLoader from "../../components/common/BrandedLoader";
import colors from "../../constants/colors";
import ROUTES from "../../constants/routes";
import { getContactInfo } from "../../services/publicContentService";

const socialIcons = {
  facebook: "logo-facebook",
  instagram: "logo-instagram",
  linkedin: "logo-linkedin",
  x: "logo-twitter",
  tiktok: "logo-tiktok"
};

const socialColors = {
  facebook: "#1877F2",
  instagram: "#E4405F",
  linkedin: "#0A66C2",
  x: "#000000",
  tiktok: "#000000"
};

export default function ContactUsScreen({ navigation }) {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContact = async () => {
      try {
        const data = await getContactInfo();
        setContact(data.contact || data.data || null);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  if (loading) {
    return (
      <ScreenWrapper>
        <BrandedLoader
          title="Loading contact details"
          message="Getting RendaHomes support channels..."
        />
      </ScreenWrapper>
    );
  }

  const socials = contact?.socials || {};

  const openLink = (url) => {
    if (url) Linking.openURL(url);
  };

  const whatsappUrl = contact?.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`
    : null;

  return (
    <ScreenWrapper>
      <DetailsHeader
        title="Contact Us"
        onBackPress={() => navigation.goBack()}
        onFilterPress={() =>
          navigation.navigate("ExploreTab", { screen: ROUTES.FILTERS })
        }
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="headset-outline" size={28} color={colors.white} />
          </View>

          <Text style={styles.heroTitle}>Need help?</Text>
          <Text style={styles.heroText}>
            Reach the RendaHomes team for listing support, landlord help, account issues, or service marketplace questions.
          </Text>
        </View>

        <SectionCard style={styles.primaryCard}>
          <Text style={styles.cardEyebrow}>Fastest support</Text>
          <Text style={styles.primaryTitle}>Talk to us directly</Text>
          <Text style={styles.primaryText}>
            Choose the channel that works best for you. We’ll respond as soon as possible.
          </Text>

          <View style={styles.actionRow}>
            {contact?.email ? (
              <TouchableOpacity
                style={styles.primaryAction}
                onPress={() => openLink(`mailto:${contact.email}`)}
              >
                <Ionicons name="mail-outline" size={18} color={colors.white} />
                <Text style={styles.primaryActionText}>Email</Text>
              </TouchableOpacity>
            ) : null}

            {whatsappUrl ? (
              <TouchableOpacity
                style={styles.secondaryAction}
                onPress={() => openLink(whatsappUrl)}
              >
                <Ionicons name="logo-whatsapp" size={18} color={colors.primary} />
                <Text style={styles.secondaryActionText}>WhatsApp</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </SectionCard>

        <Text style={styles.sectionTitle}>Contact details</Text>

        <View style={styles.listCard}>
          <ContactRow
            icon="mail-outline"
            label="Email"
            value={contact?.email || "Not available"}
            onPress={contact?.email ? () => openLink(`mailto:${contact.email}`) : null}
          />

          <ContactRow
            icon="call-outline"
            label="Phone"
            value={contact?.phone || "Not available"}
            onPress={contact?.phone ? () => openLink(`tel:${contact.phone}`) : null}
          />

          <ContactRow
            icon="logo-whatsapp"
            label="WhatsApp"
            value={contact?.whatsapp || "Not available"}
            onPress={whatsappUrl ? () => openLink(whatsappUrl) : null}
          />

          <ContactRow
            icon="location-outline"
            label="Location"
            value={contact?.address || "Nairobi, Kenya"}
          />
        </View>

        <Text style={styles.sectionTitle}>Follow RendaHomes</Text>

        <View style={styles.socialCard}>
          <Text style={styles.socialText}>
            Get housing tips, product updates, and verified listing announcements.
          </Text>

          <View style={styles.socialRow}>
            {Object.entries(socials).map(([name, url]) =>
              url ? (
                <TouchableOpacity
                  key={name}
                  style={styles.socialButton}
                  onPress={() => openLink(url)}
                >
                  <Ionicons
                    name={socialIcons[name] || "link-outline"}
                    size={22}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              ) : null
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

function ContactRow({ icon, label, value, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.75 : 1}
      onPress={onPress}
      style={styles.contactRow}
    >
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>

      <View style={styles.rowContent}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>

      {onPress ? (
        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32
  },

  hero: {
    backgroundColor: colors.accent,
    borderRadius: 26,
    padding: 22,
    marginBottom: 16
  },
  heroIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.white,
    letterSpacing: -0.6
  },
  heroText: {
    color: "#D1FAE5",
    marginTop: 8,
    lineHeight: 21,
    fontSize: 15
  },

  primaryCard: {
    marginBottom: 20
  },
  cardEyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8
  },
  primaryTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700"
  },
  primaryText: {
    color: colors.textSoft,
    marginTop: 8,
    lineHeight: 21
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16
  },
  primaryAction: {
    flex: 1,
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  primaryActionText: {
    color: colors.white,
    fontWeight: "600"
  },
  secondaryAction: {
    flex: 1,
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: "#ECFDF5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  secondaryActionText: {
    color: colors.primary,
    fontWeight: "600"
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10
  },

  listCard: {
    backgroundColor: colors.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    marginBottom: 20
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  rowIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  rowContent: {
    flex: 1
  },
  rowLabel: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 14
  },
  rowValue: {
    color: colors.textSoft,
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18
  },

  socialCard: {
    backgroundColor: colors.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16
  },
  socialText: {
    color: colors.textSoft,
    lineHeight: 21,
    marginBottom: 14
  },
  socialRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  socialButton: {
  width: 46,
  height: 46,
  borderRadius: 16,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: colors.border,
  backgroundColor: "transparent"
}
});
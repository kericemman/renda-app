import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

export default function HomeServicesPreview({ services = [], onServicePress, onViewAll }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Our Services</Text>
          <Text style={styles.subtitle}>
            Everything you may need before or after moving in.
          </Text>
        </View>

        
      </View>

      <FlatList
        horizontal
        data={services}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.slider}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => onServicePress?.(item)}>
            <View style={styles.iconBox}>
              <Ionicons name={item.icon || "grid-outline"} size={24} color={colors.primary} />
            </View>

            <Text style={styles.serviceName}>{item.name}</Text>

            <Text numberOfLines={3} style={styles.serviceDescription}>
              {item.description}
            </Text>

            <View style={styles.cardFooter}>
              <Text style={styles.cardAction}>Explore</Text>
              
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 6,
    marginBottom: 22
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14
  },
  title: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.text
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSoft,
    maxWidth: 250
  },
  viewAll: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: 13,
    marginTop: 4
  },
  slider: {
    paddingRight: 16
  },
  card: {
    width: 190,
    minHeight: 180,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 16,
    marginRight: 14
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text
  },
  serviceDescription: {
    marginTop: 7,
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 18
  },
  cardFooter: {
    marginTop: "auto",
    paddingTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  cardAction: {
    color: colors.primary,
    fontWeight: "300",
    fontSize: 13
  }
});
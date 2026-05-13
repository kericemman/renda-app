import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import ScreenWrapper from "../../components/common/ScreenWrapper";
import FilterChip from "../../components/common/FilterChip";
import CustomButton from "../../components/common/CustomButton";
import colors from "../../constants/colors";
import { COUNTIES, COUNTY_TOWNS } from "../../constants/counties";
import ROUTES from "../../constants/routes";

const purposes = ["rent", "buy", "office"];

export default function FiltersScreen({ route, navigation }) {
  const currentFilters = route.params?.currentFilters || {};

  const [purpose, setPurpose] = useState(currentFilters.purpose || "");
  const [county, setCounty] = useState(currentFilters.county || "");
  const [town, setTown] = useState(currentFilters.town || "");
  const [type, setType] = useState(currentFilters.type || "");
  const [bedrooms, setBedrooms] = useState(
    currentFilters.bedrooms ? String(currentFilters.bedrooms) : ""
  );
  const [bathrooms, setBathrooms] = useState(
    currentFilters.bathrooms ? String(currentFilters.bathrooms) : ""
  );
  const [minPrice, setMinPrice] = useState(
    currentFilters.minPrice ? String(currentFilters.minPrice) : ""
  );
  const [maxPrice, setMaxPrice] = useState(
    currentFilters.maxPrice ? String(currentFilters.maxPrice) : ""
  );

  const towns = useMemo(() => COUNTY_TOWNS[county] || [], [county]);

  const handleApply = () => {
    const filters = {
      status: "approved",
      availability: "available",
      isActive: true
    };

    if (purpose === "office") {
      filters.purpose = "rent";
      filters.type = "office";
    } else {
      if (purpose) filters.purpose = purpose;
      if (type) filters.type = type;
    }

    if (county) filters.county = county;
    if (town) filters.town = town;
    if (bedrooms) filters.bedrooms = Number(bedrooms);
    if (bathrooms) filters.bathrooms = Number(bathrooms);
    if (minPrice) filters.minPrice = Number(minPrice);
    if (maxPrice) filters.maxPrice = Number(maxPrice);

    navigation.navigate(ROUTES.EXPLORE, { filters });
  };

  const handleClear = () => {
    setPurpose("");
    setCounty("");
    setTown("");
    setType("");
    setBedrooms("");
    setBathrooms("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Filters</Text>

        <Text style={styles.label}>Purpose</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
          {purposes.map((item) => (
            <FilterChip
              key={item}
              label={item}
              active={purpose === item}
              onPress={() => setPurpose(item)}
            />
          ))}
        </ScrollView>

        <Text style={styles.label}>County</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
          {COUNTIES.map((item) => (
            <FilterChip
              key={item}
              label={item}
              active={county === item}
              onPress={() => {
                setCounty(item);
                setTown("");
              }}
            />
          ))}
        </ScrollView>

        {towns.length > 0 ? (
          <>
            <Text style={styles.label}>Town / Area</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
              {towns.map((item) => (
                <FilterChip
                  key={item}
                  label={item}
                  active={town === item}
                  onPress={() => setTown(item)}
                />
              ))}
            </ScrollView>
          </>
        ) : null}

        <Text style={styles.label}>Property Type</Text>
        <TextInput
          style={styles.input}
          placeholder="apartment, maisonette, office..."
          value={type}
          onChangeText={setType}
        />

        {purpose !== "office" ? (
          <>
            <Text style={styles.label}>Bedrooms</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 2"
              keyboardType="numeric"
              value={bedrooms}
              onChangeText={setBedrooms}
            />

            <Text style={styles.label}>Bathrooms</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 2"
              keyboardType="numeric"
              value={bathrooms}
              onChangeText={setBathrooms}
            />
          </>
        ) : null}

        <Text style={styles.label}>Min Price</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 20000"
          keyboardType="numeric"
          value={minPrice}
          onChangeText={setMinPrice}
        />

        <Text style={styles.label}>Max Price</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 100000"
          keyboardType="numeric"
          value={maxPrice}
          onChangeText={setMaxPrice}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <CustomButton title="Apply Filters" onPress={handleApply} />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 16
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 10
  },
  row: {
    marginBottom: 18
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 16
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8
  },
  clearButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14
  },
  clearText: {
    color: colors.text,
    fontWeight: "700"
  }
});
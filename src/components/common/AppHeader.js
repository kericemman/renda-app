import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform, 
  TouchableOpacity, 
  TextInput,
  SafeAreaView,
  StatusBar,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

export default function AppHeader({ 
  title, 
  subtitle, 
  showBackButton = false, 
  onBackPress,
  showSearch = false,
  onSearch,
  searchPlaceholder = "Search properties..."
}) {
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (text) => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      setSearchText("");
      if (onSearch) {
        onSearch("");
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={styles.container}>
        <View style={styles.headerRow}>
          {showBackButton && (
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={colors.primary} />
            </TouchableOpacity>
          )}
          
          {!isSearching ? (
            <View style={styles.logoContainer}>
             
              <Text style={styles.logoName}>RendaHomes</Text>
            </View>
          ) : (
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={colors.textSoft} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder={searchPlaceholder}
                placeholderTextColor={colors.textSoft}
                value={searchText}
                onChangeText={handleSearch}
                autoFocus={true}
                autoCapitalize="none"
                returnKeyType="search"
              />
              <TouchableOpacity onPress={toggleSearch} style={styles.searchCloseButton}>
                <Ionicons name="close" size={20} color={colors.textSoft} />
              </TouchableOpacity>
            </View>
          )}
          
          {showSearch && !isSearching && (
            <TouchableOpacity onPress={toggleSearch} style={styles.searchButton}>
              <Ionicons name="search" size={24} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
        
        {!isSearching && (
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 12 : 16,
    paddingBottom: 16,
    backgroundColor: colors.white
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  backButton: {
    padding: 8,
    marginRight: 12
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 12,
    borderRadius: 12
  },
  logoName: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: 0.5
  },
  searchButton: {
    padding: 8,
    marginLeft: 12
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    paddingVertical: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto"
  },
  searchCloseButton: {
    padding: 4,
    marginLeft: 8
  },
  textContainer: {
    marginTop: 20
  },
  title: {
    fontSize: Platform.OS === "ios" ? 32 : 30,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.3
  },
  subtitle: {
    fontSize: Platform.OS === "ios" ? 16 : 15,
    color: colors.textSoft,
    marginTop: 8,
    lineHeight: 22
  }
});
// import React from "react";
// import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
// import colors from "../../constants/colors";

// export default function CustomButton({
//   title,
//   onPress,
//   variant = "primary",
//   disabled = false,
//   loading = false,
//   fullWidth = true
// }) {
//   const isPrimary = variant === "primary";
//   const isAccent = variant === "accent";
//   const isSecondary = variant === "secondary";

//   return (
//     <Pressable
//       onPress={onPress}
//       disabled={disabled || loading}
//       style={[
//         styles.button,
//         fullWidth && styles.fullWidth,
//         isPrimary && styles.primaryButton,
//         isAccent && styles.accentButton,
//         isSecondary && styles.secondaryButton,
//         (disabled || loading) && styles.disabledButton
//       ]}
//     >
//       {loading ? (
//         <ActivityIndicator color={isSecondary ? colors.text : colors.white} />
//       ) : (
//         <Text
//           style={[
//             styles.text,
//             isPrimary && styles.primaryText,
//             isAccent && styles.primaryText,
//             isSecondary && styles.secondaryText
//           ]}
//         >
//           {title}
//         </Text>
//       )}
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     minHeight: 52,
//     paddingHorizontal: 18,
//     borderRadius: 14,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   fullWidth: {
//     width: "100%"
//   },
//   primaryButton: {
//     backgroundColor: colors.primary
//   },
//   accentButton: {
//     backgroundColor: colors.accent
//   },
//   secondaryButton: {
//     backgroundColor: colors.white,
//     borderWidth: 1,
//     borderColor: colors.border
//   },
//   disabledButton: {
//     opacity: 0.6
//   },
//   text: {
//     fontSize: 16,
//     fontWeight: "700"
//   },
//   primaryText: {
//     color: colors.white
//   },
//   secondaryText: {
//     color: colors.text
//   }
// });

import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";
import theme from "../../constants/theme";

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = true
}) {
  const isPrimary = variant === "primary";
  const isAccent = variant === "accent";
  const isSecondary = variant === "secondary";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        fullWidth && styles.fullWidth,
        isPrimary && styles.primaryButton,
        isAccent && styles.accentButton,
        isSecondary && styles.secondaryButton,
        (disabled || loading) && styles.disabledButton
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isSecondary ? colors.text : colors.white} />
      ) : (
        <Text
          style={[
            styles.text,
            (isPrimary || isAccent) && styles.lightText,
            isSecondary && styles.darkText
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    paddingHorizontal: 18,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center"
  },
  fullWidth: {
    width: "100%"
  },
  primaryButton: {
    backgroundColor: colors.primary
  },
  accentButton: {
    backgroundColor: colors.accent
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  disabledButton: {
    opacity: 0.6
  },
  text: {
    fontSize: 15,
    fontWeight: "800"
  },
  lightText: {
    color: colors.white
  },
  darkText: {
    color: colors.text
  }
});
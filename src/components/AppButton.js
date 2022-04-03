import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";

export const AppButton = ({ onPress, style, title, TextStyle, loading }) => {
  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      style={[styles.container, style]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.text, TextStyle]}>{title || "press"}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgb(17, 77, 173)",
    backgroundColor: "rgb(17, 77, 173)",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 50,
    color: "white",
  },
});

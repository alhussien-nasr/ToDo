import { StyleSheet, TextInput } from "react-native";
import React from "react";

export const AppInput = ({ onChangeText, style, ...rest }) => {
  return (
    <TextInput
      autoCorrect={false}
      autoCapitalize={false}
      autoComplet={false}
      {...rest}
      onChangeText={onChangeText}
      style={[styles.input, style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 60,
    backgroundColor: "#EFEFEF",
    borderRadius: 30,
    paddingLeft: 20,
  },
});

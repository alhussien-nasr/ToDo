import { StyleSheet, TextInput } from "react-native";
import React from "react";

export const AppInput = ({ style, ...rest }) => {
  return <TextInput {...rest} style={[styles.input, style]} />;
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

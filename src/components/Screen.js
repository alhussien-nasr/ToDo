import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import React from "react";

export const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
});

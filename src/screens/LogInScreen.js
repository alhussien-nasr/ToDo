import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Screen } from "../components/Screen";
import { AppInput } from "../components/AppInput";
import AppButton from "../components/AppButton";
import { authantication } from "../firebase/firebase";
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Screen style={styles.container}>
      <Text style={styles.text}>Log Ln</Text>
      <AppInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(val) => setEmail(val)}
      />
      <AppInput
        placeholder="Passwird"
        style={styles.input}
        onChangeText={(val) => setPassword(val)}
        secureTextEntry
      />
      <AppButton
        style={styles.btn}
        TextStyle={styles.btnText}
        title="LOG IN"
        onPress={() =>
          signInWithEmailAndPassword(authantication, email, password)
            .then((userCredential) => {
              console.log(userCredential);
            })
            .catch((error) => {
              console.log(error);
            })
        }
      />
      <AppButton
        style={styles.btn}
        TextStyle={styles.btnText}
        title="Register"
        onPress={() => {
          navigation.navigate("RegisterScreen");
        }}
      />
      <AppButton
        style={styles.btn}
        TextStyle={styles.btnText}
        title="log in as guest"
        onPress={() => {
          signInAnonymously(authantication)
            .then(() => {
              // Signed in..
            })
            .catch((error) => {
                console.log(error)
              // ...
            });
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  text: { fontSize: 30, marginBottom: 100, marginTop: 50 },
  input: { marginBottom: 30 },
  btn: { width: "80%", height: 70, marginBottom: 30 },
  btnText: { fontSize: 25 },
});

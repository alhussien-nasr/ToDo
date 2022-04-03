import { StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { Screen } from "../components/Screen";
import { AppButton, AppInput } from "../components";
import { authantication } from "../firebase/firebase";
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        authantication,
        email,
        password
      );
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Screen style={styles.container}>
      <Text style={styles.text}>Log Ln</Text>
      <AppInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(val) => setEmail(val)}
        value={email}
      />
      <AppInput
        placeholder="Passwird"
        style={styles.input}
        onChangeText={(val) => setPassword(val)}
        secureTextEntry
        value={password}
      />
      <AppButton
        style={styles.btn}
        TextStyle={styles.btnText}
        title="LOG IN"
        onPress={() => signIn()}
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
              console.log(error);
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

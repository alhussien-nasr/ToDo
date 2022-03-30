import { StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { Screen } from "../components/Screen";
import { AppInput } from "../components/AppInput";
import AppButton from "../components/AppButton";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  return (
    <Screen style={styles.container}>
      <Text style={styles.text}>Register</Text>
      <AppInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(val) => setEmail(val)}
      />
      <AppInput
        placeholder="Name"
        style={styles.input}
        onChangeText={(val) => setName(val)}
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
        title="Register"
        onPress={() => {
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, email, password)
            .then((val) => {
              setUser(val.user);
              setDoc(doc(db, "users", val.user.uid), {
                email,
                name,
              }).then(() => console.log("Document updated"));
            })
            .catch((err) => {
              console.log(err);
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

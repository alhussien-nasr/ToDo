import { StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { Screen } from "../components/Screen";
import AppButton from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { authantication, db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export const AddToDoScreen = ({ navigation }) => {
  const [toDo, setToDo] = useState("");

  return (
    <Screen style={styles.container}>
      <Text style={styles.text}>add to do </Text>
      <AppInput onChangeText={(val) => setToDo(val)} />
      <AppButton
        placeholder="Add To Do"
        style={styles.btn}
        title="+"
        onPress={() => {
          addDoc(collection(db, "toDoList"), {
            toDo,
            userId: authantication.currentUser.uid,
          })
            .then(() => console.log("Document updated"))
            .catch((err) => {
              console.log(err);
            });
          navigation.navigate("Home");
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  btn: { position: "absolute", bottom: 0 },
  text: { fontSize: 30, marginBottom: 30 },
});

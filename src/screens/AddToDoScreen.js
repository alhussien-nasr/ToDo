import { StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { Screen } from "../components/Screen";
import { AppButton, AppInput } from "../components";
import { authantication, db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { addToDoItem } from "../redux/ToDoList/actions";

export const AddToDoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [toDo, setToDo] = useState({});
  const loading = useSelector((state) => state.toDo?.loading);
  console.log("loading", loading);
  return (
    <Screen style={styles.container}>
      <Text style={styles.text}>add to do </Text>
      <AppInput
        onChangeText={(val) => setToDo({ do: val, id: Math.random() })}
        value={toDo}
      />
      <AppButton
        placeholder="Add To Do"
        style={styles.btn}
        title="+"
        // onPress={() => {
        //   addDoc(collection(db, "toDoList"), {
        //     toDo,
        //     userId: authantication.currentUser.uid,
        //   })
        //     .then(() => console.log("Document updated"))
        //     .catch((err) => {
        //       console.log(err);
        //     });
        //   navigation.navigate("Home");
        // }}
        onPress={() => {
          dispatch(addToDoItem(toDo));
          setToDo("");
          navigation.goBack();
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

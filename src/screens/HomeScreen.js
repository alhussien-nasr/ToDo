import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Screen } from "../components/Screen";
import AppButton from "../components/AppButton";
import { authantication, db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { BlurView } from "expo-blur";

export const HomeScreen = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [visiable, setVisiable] = useState(false);
  const [user, setUser] = useState({});

  const isFocused = useIsFocused();

  useEffect(async () => {
    const docSnap = await getDocs(collection(db, "toDoList"));

    if (docSnap) {
      setList(
        docSnap.docs
          .filter((i) => i.data().userId === authantication.currentUser.uid)
          .map((i) => ({ ...i.data(), docId: i.id }))
      );
    } else {
      console.log("No such document!");
    }
  }, [isFocused]);

  useEffect(() => {
    const foo = () =>
      authantication.onAuthStateChanged((user) => setUser(user));
    return foo();
  }, []);
  console.log(user);
  console.log(authantication.currentUser.email);
  console.log(list);

  return (
    <Screen style={styles.container}>
      <Text style={styles.text}>My List</Text>
      <AppButton
        title={"+"}
        style={styles.btn}
        onPress={() => {
          !authantication.currentUser.email
            ? setVisiable(true)
            : navigation.navigate("AddToDo");
        }}
      />
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <View>
            <Text> {item.toDo}</Text>
          </View>
        )}
      />
      <Modal
        transparent={true}
        style={{ backgroundColor: "red" }}
        visible={visiable}
      >
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => setVisiable(false)}
        >
          <BlurView intensity={10} style={styles.modalContainer}>
            <TouchableWithoutFeedback
              activeOpacity={0}
              style={styles.container}
            >
              <>
                <Text style={styles.text}> you are not user </Text>
                <AppButton
                  style={styles.modalBtn}
                  title="Log In"
                  TextStyle={styles.modalText}
                />
                <AppButton
                  style={styles.modalBtn}
                  title="Register"
                  TextStyle={styles.modalText}
                />
              </>
            </TouchableWithoutFeedback>
          </BlurView>
        </TouchableWithoutFeedback>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  btn: { position: "absolute", bottom: 0, zIndex: 10 },
  text: { fontSize: 30, marginBottom: 30 },
  modalBtn: { width: "80%", height: 60, marginBottom: 40 },
  modalText: { fontSize: 30 },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,

    borderRadius: 50,
  },
});

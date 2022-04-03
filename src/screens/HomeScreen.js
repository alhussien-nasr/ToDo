import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Screen } from "../components/Screen";
import { AppButton } from "../components";
import { authantication, db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../redux/ToDoList/actions";

export const HomeScreen = ({ navigation, route }) => {
  const list = useSelector((state) => state.toDo?.list);
  console.log("homeScreen", list);
  // const [list, setList] = useState([]);
  const [visiable, setVisiable] = useState(false);
  const [user, setUser] = useState({});

  const isFocused = useIsFocused();

  useEffect(() => {
    // getToDoList();
    updateUserData();
    
  }, []);

  const getToDoList = async () => {
    const docSnap = await getDocs(collection(db, "toDoList"));

    if (docSnap) {
      const data = docSnap.docs
        .filter((i) => i.data().userId === authantication.currentUser.uid)
        .map((i) => ({ ...i.data(), docId: i.id }));
      setList(data);
    } else {
      console.log("No such document!");
    }
  };

  const updateUserData = () => {
    authantication.onAuthStateChanged((user) => setUser(user));
  };
  console.log(list);
  const dispatch = useDispatch();
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemList}>
        <TouchableOpacity
          onPress={() => {
            dispatch(removeItem(item.id));
          }}
        >
          <Text>remove</Text>
        </TouchableOpacity>
        <Text> {item.do}</Text>
      </View>
    );
  };

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
        // keyExtractor
        renderItem={renderItem}
        style={{width:'100%' ,}}
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
                  onPress={() => navigation.navigate("LoginScreen")}
                />
                <AppButton
                  style={styles.modalBtn}
                  title="Register"
                  TextStyle={styles.modalText}
                  onPress={() => navigation.navigate("RegisterScreen")}
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
  itemList: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems:'center',height:30
  },
});

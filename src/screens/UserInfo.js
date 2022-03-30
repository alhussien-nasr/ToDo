import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { authantication, db } from "../firebase/firebase";
import AppButton from "../components/AppButton";
import { Screen } from "../components/Screen";
import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

export const UserInfo = ({ navigation }) => {
  const [list, setList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(async () => {
    const docSnap = await getDoc(
      doc(db, "users", authantication.currentUser.uid)
    );

    if (docSnap) {
      setList(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }, [isFocused]);
  console.log(list);
  return (
    <Screen>
      {authantication?.currentUser?.email && (
        <Text style={styles.header}>UserInfo</Text>
      )}
      <View style={styles.list}>
        <Text style={styles.text}>{list.name}</Text>
        <Text style={styles.text}>{list.email}</Text>
      </View>

      <AppButton
        onPress={() => navigation.navigate("Home")}
        title={"home"}
        style={styles.btn}
        TextStyle={styles.btnText}
      />

      <AppButton
        onPress={() => {
          signOut(authantication)
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });
          navigation.navigate("Home");
        }}
        title={"log out"}
        style={styles.btn}
        TextStyle={styles.btnText}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  btn: { width: "50%", height: 60, alignSelf: "center", marginTop: 30 },
  btnText: { fontSize: 25 },
  list: {
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    marginVertical: 50,
  },
  text: { fontSize: 20, paddingLeft: 30 },
  header: { fontSize: 40, paddingLeft: 30, marginTop: 40 },
});

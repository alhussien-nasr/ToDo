import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { AddToDoScreen } from "../screens/AddToDoScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegisterScreen } from "../screens/RegisterScreen";
import { LoginScreen } from "../screens/LogInScreen";
import { UserInfo } from "../screens/UserInfo";
import { NavigationContainer } from "@react-navigation/native";
import { authantication } from "../firebase/firebase";
const Stack = createNativeStackNavigator();
export const NavigationStack = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const foo = () =>
      authantication.onAuthStateChanged((user) => setUser(user));
    return foo();
  }, []);
  console.log(user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="UserInfo" component={UserInfo} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddToDo" component={AddToDoScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

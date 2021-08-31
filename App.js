import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./components/Authentication/Login";
import { auth } from "./config/firebaseConfig";
import { UserContext } from "./config/stateProvider";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./components/Home/Home";
import { ScreenStackHeaderLeftView } from "react-native-screens";
import SignUp from "./components/Authentication/SignUp";
import Todo from "./components/Todo/Todo";
import TodoItem from "./components/Todo/TodoItem";
import TodoInput from "./components/Todo/Todo";

export default function App() {
  const [user, setUser] = useState();

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser.email);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      {/* <View style={styles.container}>
        <Home />
        <StatusBar style="auto" />
      </View> */}
      <UserContext.Provider value={user}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Todo" component={Todo} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

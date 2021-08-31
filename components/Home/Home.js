import React, { useContext } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { UserContext } from "../../config/stateProvider";
import { auth } from "../../config/firebaseConfig";

const Home = ({ navigation }) => {
  const user = useContext(UserContext);

  return (
    <View>
      <Text>Welcome {user ? user : "Guest"}</Text>
      <Button
        title={user ? "Logout" : "Login"}
        onPress={() => (user ? auth.signOut() : navigation.navigate("Login"))}
      />
      <Button
        title={user ? "TODO" : "SIGNUP"}
        onPress={() => navigation.navigate(user ? "Todo" : "SignUp")}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

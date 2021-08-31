import React, { useContext, useState } from "react";
import { auth } from "./firebaseConfig";
import { UserContext } from "./stateProvider";

import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useContext(UserContext);

  function onClickHandler() {
    auth.signInWithEmailAndPassword(email, password).then((auth) => {
      navigation.popToTop();
    });
  }
  return (
    <SafeAreaView>
      {user ? (
        <Text>You have already been logged in as {user}</Text>
      ) : (
        <View style={styles.container}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={(email) => setEmail(email)}
          />
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            onChangeText={(password) => setPassword(password)}
          />
          <Button onPress={onClickHandler} title="Login" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    marginTop: 50,
  },
});

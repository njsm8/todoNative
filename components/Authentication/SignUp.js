import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Image,
} from "react-native";
import { auth, storage } from "../../config/firebaseConfig";
import { UserContext } from "../../config/stateProvider";
import * as ImagePicker from "expo-image-picker";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setcheckPassword] = useState("");
  const [image, setImage] = useState(null);
  let file = {};

  const user = useContext(UserContext);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.cancelled);

    if (!result.cancelled) {
      file = result.uri;
    }
  };
  const register = () => {
    if (password !== checkPassword) {
      Alert.alert("password doesnt match");
      setPassword("");
      setcheckPassword("");
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          console.log(auth);
          if (auth) {
            storage
              .ref("users/" + auth.user.uid + "/profile.jpg")
              .put(file)
              .then(function () {
                Alert.alert("successfully uploaded");
              })
              .catch((error) => {
                console.log(error.message);
              });
            navigation.popToTop();
          }
        })
        .catch((error) => Alert.alert(error.message));
    }
  };

  return (
    <SafeAreaView>
      {user ? (
        <Text>`You have already been logged in as ${user}`</Text>
      ) : (
        <View style={styles.container}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Enter your email"
            onChangeText={(email) => setEmail(email)}
          />
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Enter your password"
            onChangeText={(password) => setPassword(password)}
          />
          <Text>Re-enter Password</Text>
          <TextInput
            style={styles.input}
            value={checkPassword}
            placeholder="Enter your password"
            onChangeText={(password) => setcheckPassword(password)}
          />
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Button onPress={register} title="SignUp" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});

import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "./firebaseConfig";
import { UserContext } from "./stateProvider";

const TodoItem = (props) => {
  const user = useContext(UserContext);
  const todo = props.todo;
  const id = props.id;

  function deleteTodo() {
    db.collection(user).doc(id).delete();
  }
  return (
    <View>
      <Text style={{ fontSize: 18 }}>{todo}</Text>
      <TouchableOpacity
        style={{
          padding: 8,
          backgroundColor: "#212121",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
        }}
        onPress={deleteTodo}
      >
        <Text style={{ color: "#fafafa" }}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({});

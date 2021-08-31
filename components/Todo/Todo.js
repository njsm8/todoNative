import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { db } from "../../config/firebaseConfig";
import { UserContext } from "../../config/stateProvider";
import * as firebase from "firebase";
import TodoItem from "./TodoItem";

const TodoInput = () => {
  const [todo, setTodo] = useState("");
  const [todos, settodos] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    getTodo();
  }, [todo]);

  function getTodo() {
    db.collection(user).onSnapshot(function (querySnapshot) {
      settodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    });
  }

  const addTodo = () => {
    db.collection(user).add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todo,
    });

    setTodo("");
  };

  const renderItem = ({ item }) => <Text>{item.title}</Text>;

  return (
    <>
      <TextInput
        label="Write a To-do"
        value={todo}
        onChangeText={(todo) => setTodo(todo)}
        style={{ marginTop: 30 }}
      />
      <Button mode="contained" mode="contained" onPress={addTodo}>
        ADD
      </Button>
      {todos.map((todo) => (
        <TodoItem todo={todo.todo} id={todo.id} />
      ))}
    </>
  );
};

export default TodoInput;

const styles = StyleSheet.create({});

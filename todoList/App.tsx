import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./components/Task";
import { useRef, useState } from "react";
export default function App() {
  const [todoTask, setTodoTask] = useState<string[]>(["Gym", "Class"]);
  const [inputName, setInputName] = useState("");
  const [error, setError] = useState("");
  const handleAddTask = () => {
    inputName !== ""
      ? (Keyboard.dismiss(),
        setTodoTask([...todoTask, inputName]),
        setInputName(""), setError(""))
       
      : setError("Task Name is empty");
  };
  const handleRemoveTask = (todo: string) => {
   setTodoTask(todoTask.filter(filter=>filter!==todo))
  };
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        {todoTask.map((todo, index) => (
          <View key={index} style={styles.items}>
            <TouchableOpacity onPress={(e) => handleRemoveTask(todo)}>
              <Task taskName={todo} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          value={inputName}
          onChangeText={(text) => setInputName(text)}
          placeholder="Write a task"
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text>+</Text>
          </View>
          <Text style={styles.error}>{error}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 20,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  error: {
    position: "absolute",
    bottom: -30,
    right: 200,
    color: "red",

    width:130,
  },
});

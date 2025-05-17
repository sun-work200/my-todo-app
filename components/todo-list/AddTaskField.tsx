import { styles } from '@/style/styleSheet';
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

interface AddTaskFieldProps {
  tasks: Task[];
  setTasks: (value: Task[]) => void;
}

export default function AddTaskField({ tasks, setTasks }: AddTaskFieldProps) {
  const [addTitle, setAddTitle] = useState<string>("");

  const addTask = () => {
    if (addTitle.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), title: addTitle, completed: false },
      ]);
      setAddTitle("");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Enter task"
        value={addTitle}
        onChangeText={setAddTitle}
        style={styles.addInput}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

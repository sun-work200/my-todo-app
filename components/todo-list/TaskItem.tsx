import { styles } from "@/style/styleSheet";
import { Checkbox } from "expo-checkbox";
import debounce from "lodash/debounce";
import { useCallback, useMemo, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

interface TaskListProps {
  taskItem: Task;
  tasks: Task[];
  setTasks: (value: Task[]) => void;
}

export default function TaskItem({ taskItem, tasks, setTasks }: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = useCallback(
    (id: string, value: string) => {
      setTasks(tasks.map((t) => (t.id === id ? { ...t, title: value } : t)));
    },
    [setTasks, tasks]
  );

  const debouncedEditTask = useMemo(
    () => debounce((id, newTitle) => editTask(id, newTitle), 700),
    [editTask]
  );

  // const debouncedEditTask = useCallback(
  //   debounce((id, newTitle) => {
  //     editTask(id, newTitle);
  //   }, 700),
  //   [editTask]
  // );

  const handleTextChange = (id: string, value: string) => {
    setEditTitle(value);
    debouncedEditTask(id, value);
  };

  const handleBlur = (id: string) => {
    debouncedEditTask.cancel();
    editTask(id, editTitle);
    setEditingId(null);
  };

  return (
    <View style={[styles.taskItem, taskItem.completed && styles.completedItem]}>
      <Checkbox
        value={taskItem.completed}
        onValueChange={() => toggleComplete(taskItem.id)}
        color={taskItem.completed ? "#4CAF50" : undefined}
      />
      <TextInput
        style={[styles.input, taskItem.completed && styles.completedText]}
        value={editingId === taskItem.id ? editTitle : taskItem.title}
        onFocus={() => {
          setEditingId(taskItem.id);
          setEditTitle(taskItem.title);
        }}
        onChangeText={(value) => handleTextChange(taskItem.id, value)}
        onBlur={() => handleBlur(taskItem.id)}
        editable={!taskItem.completed}
      />
      <TouchableOpacity onPress={() => deleteTask(taskItem.id)}>
        <Text style={styles.delete}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

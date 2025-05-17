import AddTaskField from '@/components/todo-list/AddTaskField';
import TaskList from '@/components/todo-list/TaskList';
import { styles } from '@/style/styleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

type Task = {
  id: string;
  title: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@tasks');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch (e) {
        console.error('Error loading tasks', e);
        return [];
      }
    };
    loadTasks().then(setTasks);
  }, []);

  useEffect(() => {
    const updateTasks = async () => {
      try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem('@tasks', jsonValue);
      } catch (e) {
        console.error('Error saving tasks', e);
      }
    }
    updateTasks();
  }, [tasks])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>

      <AddTaskField tasks={tasks} setTasks={setTasks} />
      <View style={styles.divider} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </View>
  );

}

import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Task = {
  id: string;
  title: string;
  completed: boolean;
}

export default function App() {
  const [addTitle, setAddTitle] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
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

  const addTask = () => {
    if (addTitle.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: addTitle, completed: false }]);
      setAddTitle('');
    }
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const editTask = (id: string, value: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, title: value } : t));
  };

  const debouncedEditTask = useCallback(
    debounce((id, newTitle) => {
      editTask(id, newTitle);
    }, 700),
    [tasks]
  );

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
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter task"
          value={addTitle}
          onChangeText={setAddTitle}
          style={styles.addInput}
        />
        {/* <Button title="+" onPress={addTask} /> */}
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.taskItem, item.completed && styles.completedItem]}>
            <Checkbox
              value={item.completed}
              onValueChange={() => toggleComplete(item.id)}
              color={item.completed ? '#4CAF50' : undefined}
            />
            <TextInput
              style={[styles.input, item.completed && styles.completedText]}
              value={editingId === item.id ? editTitle : item.title}
              onFocus={() => {
                setEditingId(item.id);
                setEditTitle(item.title);
              }}
              onChangeText={(value) => handleTextChange(item.id, value)}
              onBlur={() => handleBlur(item.id)}
              editable={!item.completed}
            />
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  addInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 30,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  completedItem: {
    backgroundColor: '#e6e6e6',
  },
  delete: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

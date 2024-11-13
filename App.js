import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks([...tasks, { id: Date.now().toString(), name: task, isCompleted: false }]);
    setTask(''); // Clear the input field
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const changeIsCompleted = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  const completedCount = tasks.filter(task => task.isCompleted).length;
  const notCompletedCount = tasks.length - completedCount;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Enter Task'
        value={task}
        onChangeText={setTask}
      />
      
      <Pressable style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'lightgray' : 'gray'
        },
        styles.button
      ]} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>

      <Text style={{ fontSize: 22, fontWeight: 'bold', paddingVertical: 25 }}>
        Not Completed - {notCompletedCount}
      </Text>

      {/* Not Completed FlatList */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          !item.isCompleted && (
            <View style={styles.taskItem}>
              <Pressable 
              onPress={() => changeIsCompleted(item.id)}
              onLongPress={() => removeTask(item.id)}>
                  <Text>{item.name}</Text>
              </Pressable> 
            </View>
          )
        )}
        style={styles.taskList}
      />

      <Text style={{ fontSize: 22, fontWeight: 'bold', paddingVertical: 25 }}>
        Completed - {completedCount}
      </Text>

      {/* Completed FlatList */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          item.isCompleted && (
            <View style={styles.doneTaskItem}>
              <Pressable 
              onPress={() => changeIsCompleted(item.id)}
              onLongPress={() => removeTask(item.id)}>
                  <Text>{item.name}</Text>
              </Pressable> 
            </View>
          )
        )}
        style={styles.taskList}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 70,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  taskList: {
    width: '100%',
    height: 'auto'
  },
  taskItem: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
  },
  doneTaskItem: {
    padding: 15,
    backgroundColor: 'green',
    borderRadius: 5,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
});

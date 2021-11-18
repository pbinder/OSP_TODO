import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TopBar from './components/TopBar';
import CategoriesView from './components/CategoriesView';

const App = () => {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar></TopBar>
      <View style={styles.overview}>
        <CategoriesView></CategoriesView>
      </View>
      <View style={styles.list}>
          <TodoInsert> </TodoInsert>
        <View style={styles.card}>
        {
        taskItems.map((item, index) => {
          return <TodoList key={index} text={item}/>
        })
        }
        </View>
      </View>

      <TouchableOpacity style={styles.addNewContainer} onPress={() => handleAddTask()}>
        <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
        </View>
        <TextInput style={styles.addTaskWrapper} placeholder={'Write a new task'} onChangeText={text => setTask(text)}/>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appTitle: {
    color: '#fff',
    fontSize: 36,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: '300',
    textAlign: 'center',
  },
  overview: {
    backgroundColor: '#F5F5F5',	
    flex: 2,
  },
  list: {
    backgroundColor: '#00462A',
    flex: 3,
  },
  card: {
    backgroundColor: '#fff',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },
  addNewContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addWrapper: {
    height: 37,
    width: 37,
    borderRadius: 50,
    backgroundColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTaskWrapper: {
    width: '80%',
    height: 40,
    margin: 5,
    backgroundColor: '#C0C0C0',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
  }
});

export default App;
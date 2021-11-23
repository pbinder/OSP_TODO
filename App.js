import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import TodoInsert from './components/TodoInsert';
import TodoListItem from './components/TodoListItem';
import TopBar from './components/TopBar';
import CategoriesView from './components/CategoriesView';

import db from './firebase';
import firebase from 'firebase';

function App() {

  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  //variables for the add new task modal
  const [modalVisible, setModalVisible] = useState(false);

  //when the app loads, fetch the database
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTaskItems(snapshot.docs.map(doc => ({id: doc.id, text: doc.data().todo})))
    })
  }, []);

  const handleAddTask = () => {
    db.collection('todos').add({
      todo: task,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTaskItems([...taskItems, task])
    setTask('');
    setModalVisible(!modalVisible);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar></TopBar>
      <View style={styles.overview}>
        <CategoriesView></CategoriesView>
      </View>
      <View style={styles.list}>
        <TodoInsert 
          modalVisible={modalVisible} 
          setModalVisible={setModalVisible}
          setTask = {setTask}
          handleAddTask = {handleAddTask}
        > 
        </TodoInsert>
        <View style={styles.listWrapper}>
          <TodoListItem taskItems={taskItems}/>
       </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
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
    //borderTopStartRadius: 20,
    //borderTopEndRadius: 20,
    flex: 3,
  },
  listWrapper: {
    height: '100%',
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  }
});

export default App;
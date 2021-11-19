import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
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
      //setTaskItems(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
      setTaskItems(snapshot.docs.map(doc => doc.data().todo))
    })
  }, []);

  const handleAddTask = () => {
    //event.preventDefault();
    db.collection('todos').add({
      todo: task,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTaskItems([...taskItems, task])
    setTask('');
    setModalVisible(!modalVisible);
    //console.log(todos);
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
        <View style={styles.card}>
        {
        taskItems.map((item, index) => {
          return <TodoList key={index} text={item}/>
        })
        }
        </View>
      </View>
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
  }
});

export default App;
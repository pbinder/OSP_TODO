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
import Search from './components/Search';
import db from './firebase';
import firebase from 'firebase';
import SortAs from './components/SortAs';

function App() {
  const [taskItems, setTaskItems] = useState([]);

  //variables for wing page
  const [wingPageVisible, setWingPageVisible] = useState(false);

  //Editstate
  const [isEdit, setEditState] = useState(false);

  //variables for the add new task modal
  const [modalVisible, setModalVisible] = useState(false);

  //when the app loads, fetch the database
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTaskItems(snapshot.docs.map(doc => ({
        id: doc.id, 
        name: doc.data().name, 
        date: doc.data().date,
        category: doc.data().category,
        note: doc.data().note,
        completed: doc.data().completed
      })))
    })
  }, []);

  const handleAddTask = (task) => {
    db.collection('todos').add({
      name: task.name,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      date: task.date,
      category: task.category,
      note:task.note,
      completed: task.completed
    })

    setTaskItems([...taskItems, task])
    setModalVisible(!modalVisible);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.barcontainer} >
      <TopBar
        wingPageVisible={wingPageVisible} 
        setWingPageVisible={setWingPageVisible}
        isEdit={isEdit}
        setEditState={setEditState}
      >
      </TopBar>
      </View>
      <View style={styles.overview}>
        <CategoriesView isEdit={isEdit}></CategoriesView>
      </View>
      <View style={styles.search}>
        <Search></Search>
      </View>
      <View style={styles.list}>
        <View style={styles.bar}>
        <TodoInsert 
          modalVisible={modalVisible} 
          setModalVisible={setModalVisible}
          handleAddTask = {handleAddTask}
        > 
        </TodoInsert>
        <SortAs></SortAs>
        </View>
        <View style={styles.listWrapper}>
          <TodoListItem taskItems={taskItems} isEdit={isEdit} setTaskItems={setTaskItems}/>
       </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingTop: StatusBar.currentHeight,
  },
  barcontainer: {
    height: 55,
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
  search: {
    backgroundColor: '#00462A',	
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
  },
  bar:{
    alignSelf: 'stretch',
    height: 45,
    flexDirection: 'row', // row
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    paddingLeft: 10,
    paddingRight: 10,
  }
});

export default App;
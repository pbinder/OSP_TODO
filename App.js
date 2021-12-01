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

function App() {
  const [taskItems, setTaskItems] = useState([]);

  //variables for wing page
  const [wingPageVisible, setWingPageVisible] = useState(false);

  //Editstate
  const [isEdit, setEditState] = useState(false);

  //variables for the add new task modal
  const [modalVisible, setModalVisible] = useState(false);

  //categories counter update (tasks left, tasks completed, etc)
  const [tasksComp, setTasksComp] = useState(0);
  const [tasksIncomp, setTasksIncomp] = useState(0);
  const [tasksTotal, setTasksTotal] = useState('');
  const [tasksHW, setTasksHW] = useState('');

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
      note: task.note,
      completed: task.completed
    })
    setTaskItems([...taskItems, task]);
    setModalVisible(!modalVisible);
  }

  const [willEdit, setWillEdit] = useState(true);
  let [idToEdit, setIdToEdit] = useState('');
  let [nameToEdit, setNameToEdit] = useState('');
  let [dateToEdit, setDateToEdit] = useState('');
  let [timeToEdit, setTimeToEdit] = useState('');
  let [categToEdit, setCategToEdit] = useState('');
  let [noteToEdit, setNoteToEdit] = useState('');

  const dataToEdit = (data) => {
    setIdToEdit(data.id);
    setNameToEdit(data.name);
    setDateToEdit(data.date);
    setCategToEdit(data.category);
    setNoteToEdit(data.note);
  }

  const handleUpdateTask = (task) => {
    db.collection('todos').doc(idToEdit).set({
      name: task.name,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      date: task.date,
      category: task.category,
      note: task.note
    }, {merge: true});
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
        <CategoriesView 
          isEdit={isEdit}
          tasksComp={tasksComp}
          tasksIncomp={tasksIncomp}
          tasksTotal={tasksTotal}
          tasksHW={tasksHW}
          ></CategoriesView>
      </View>
      <View style={styles.search}>
        <Search></Search>
      </View>
      <View style={styles.list}>
        <TodoInsert 
          modalVisible={modalVisible} 
          setModalVisible={setModalVisible}
          handleAddTask = {handleAddTask}
          willEdit={willEdit}
          setWillEdit={setWillEdit}
          nameToEdit={nameToEdit}
          categToEdit={categToEdit}
          noteToEdit={noteToEdit}
          handleUpdateTask={handleUpdateTask}
        > 
        </TodoInsert>
        <View style={styles.listWrapper}>
          <TodoListItem 
            taskItems={taskItems} 
            isEdit={isEdit} 
            setTaskItems={setTaskItems} 
            modalVisible={modalVisible} 
            setModalVisible={setModalVisible}
            tasksComp={tasksComp}
            setTasksComp={setTasksComp}
            tasksIncomp={tasksIncomp}
            setTasksIncomp={setTasksIncomp}
            tasksTotal={tasksTotal}
            setTasksTotal={setTasksTotal}
            willEdit={willEdit}
            setWillEdit={setWillEdit}
            dataToEdit={dataToEdit}
            />
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
  }
});

export default App;
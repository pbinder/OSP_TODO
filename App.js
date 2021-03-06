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
  //displayed taskitems updated on sort or filtering
  const [taskItems, setTaskItems] = useState([]);

  //needed for filtering to remeber the original items
  const [originalTaskItems, setOriginalTaskItems] = useState([]);

  //variables for wing page
  const [wingPageVisible, setWingPageVisible] = useState(false);

  //Editstate
  const [isEdit, setEditState] = useState(false);

  //variables for the add new task modal
  const [modalVisible, setModalVisible] = useState(false);

  //editing a todo list item variables
  const [willEdit, setWillEdit] = useState(true);
  const [idToEdit, setIdToEdit] = useState('');
  const [nameToEdit, setNameToEdit] = useState('');
  const [dateToEdit, setDateToEdit] = useState('');
  const [timeToEdit, setTimeToEdit] = useState('');
  const [categToEdit, setCategToEdit] = useState('');
  const [noteToEdit, setNoteToEdit] = useState('');
  const [percentage,setPercentage]=useState(0);

  //when the app loads, fetch the database
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id, 
        name: doc.data().name, 
        date: doc.data().date,
        category: doc.data().category,
        note: doc.data().note,
        completed: doc.data().completed
      }))
      setTaskItems(items)
      setOriginalTaskItems(items)
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
    setOriginalTaskItems(taskItems)
    setModalVisible(!modalVisible);
  }

  const dataToEdit = (data) => {
    setIdToEdit(data.id);
    setNameToEdit(data.name);
    setDateToEdit((data.date).toDate());
    setTimeToEdit((data.date).toDate());
    setCategToEdit(data.category);
    setNoteToEdit(data.note);
  }

  const handleUpdateTask = (task) => {
    if(task.name!=nameToEdit && task.name.length<1) task.name = nameToEdit
    if(task.name!=noteToEdit && task.note.length<1) task.note = noteToEdit
    db.collection('todos').doc(idToEdit).set({
      name: task.name,
      date: task.date,
      category: task.category,
      note: task.note
    }, {merge: true});
    setModalVisible(!modalVisible);
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#00462A'}]}>
      <View style={styles.barcontainer} >
      <TopBar
        wingPageVisible={wingPageVisible} 
        setWingPageVisible={setWingPageVisible}
        isEdit={isEdit}
        setEditState={setEditState}
        percentage={percentage}
        originalTaskItems={originalTaskItems}
      >
      </TopBar>
      </View>
      <View style={styles.overview}>
        <CategoriesView 
          isEdit={isEdit}
          originalTaskItems={originalTaskItems}
          setTaskItems={setTaskItems}
          percentage={percentage}
          setPercentage={setPercentage}
          ></CategoriesView>
      </View>
      <View style={styles.search}>
        <Search originalTaskItems={originalTaskItems} setTaskItems={setTaskItems}></Search>
      </View>
      <View style={styles.list}>
      {!isEdit &&  <View style={styles.bar}>
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
          isEdit={isEdit}
          dateToEdit={dateToEdit}
          setDateToEdit={setDateToEdit}
          setTimeToEdit={setTimeToEdit}
          timeToEdit={timeToEdit}
        > 
        </TodoInsert>
        <SortAs taskItems={taskItems} setTaskItems={setTaskItems} originalTaskItems={originalTaskItems}></SortAs>
        </View>}
        <View style={styles.listWrapper}>
          <TodoListItem 
            taskItems={taskItems} 
            isEdit={isEdit} 
            setTaskItems={setTaskItems} 
            modalVisible={modalVisible} 
            setModalVisible={setModalVisible}
            willEdit={willEdit}
            setWillEdit={setWillEdit}
            dataToEdit={dataToEdit}
            originalTaskItems={originalTaskItems}
            setOriginalTaskItems={setOriginalTaskItems}
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
    flex: 2.5,
  },
  search: {
    backgroundColor: '#00462A',	
  },
  list: {
    backgroundColor: '#00462A',
    flex: 3,
  },
  listWrapper: {
    height: '97%',
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
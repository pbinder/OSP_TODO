import React, {useState} from 'react';
import {
  StyleSheet, 
  View, 
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions
} from 'react-native';
import { Categories } from './constants/Categories';
import Moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from 'react-native-modal';

const windowW= Dimensions.get('window').width;

export default function TodoInsert  ({modalVisible, setModalVisible, handleAddTask, willEdit, setWillEdit, nameToEdit, categToEdit,noteToEdit, 
                                      handleUpdateTask, isEdit, dateToEdit, setDateToEdit, setTimeToEdit, timeToEdit}) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState(Categories[0]);
  const [note, setNote] = useState('');

  const loadEdit = () => {
      if(willEdit){
        setDate(dateToEdit)
        setTime(timeToEdit)
      }
  };

  const showMode = (currentMode) => {
    if(currentMode == 'date'){
      setShowDate(true)
    }
    else{
      setShowTime(true);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  
  const showTimepicker = () => {
    showMode('time');
  };

  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
    setDateToEdit(currentDate)
  }

  const changeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(Platform.OS === 'ios');
    setTime(currentTime);
    setTimeToEdit(currentTime);
  }

  const setTaskObject = () => {
    const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 
                              time.getHours(), time.getMinutes(), time.getSeconds())
    const task = {
      name: name, 
      date: dateTime, 
      category: category, 
      note: note,
      completed: false,
      duedate: date
    }
    handleAddTask(task);
    setName('');
    setNote('');

  };

  const updateTaskObject = () => {
    const dateTime = new Date(dateToEdit.getFullYear(), dateToEdit.getMonth(), dateToEdit.getDate(), 
                              timeToEdit.getHours(), timeToEdit.getMinutes(), timeToEdit.getSeconds())
    const task = {
        name: name, 
        date: dateTime, 
        category: category, 
        note: note,
        duedate: date
      }
    handleUpdateTask(task);
    setName('');
    setCategory(Categories[0]);
    setNote('');
  };

  const resetState = () => {
    setDate(new Date());
    setTime(new Date());
  }

    return (
      <View style={styles.centeredView}>
        <Modal
          style = {{marginLeft: 0, marginRight: 0, marginBottom: 0}}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          transparent={true}
          isVisible={modalVisible}
          onShow={() => {loadEdit()}}
          onRequestClose={() => {setModalVisible(!modalVisible)}} 
          >
          <View style={styles.centerModalView}>
            <View style={styles.modalView}>
              {!willEdit &&
                <Text style={styles.header}>Add new task</Text>
              }
              {willEdit &&
                <Text style={styles.header}>Edit task</Text>
              }
              <TouchableOpacity style={styles.addNewContainer}>
                {!willEdit &&
                  <TextInput style={styles.addTaskWrapper} placeholder={'Name'} onChangeText={text => setName(text)}/>
                }
                {willEdit &&
                  <TextInput style={styles.addTaskWrapper} defaultValue={nameToEdit} onChangeText={text => setName(text)}></TextInput>
                }
              </TouchableOpacity>
            <View style={styles.dateStyle}>
              <Text style={styles.date}>
                  Date:
               </Text>
              
              <Text  
                style={styles.datepicker} 
                editable={false}
                placeholder={'Select date!'}  
                onPress={showDatepicker} > 
                  { Moment(date).format('YYYY/MM/DD') }
               </Text>
              
              { showDate && (
                <DateTimePicker
                style={{width:'25%', marginLeft: '5.5%'}}
                value={date}
                mode={Platform.OS==='ios'?'date':mode}
                is24Hour={true}
                minimumDate={new Date()}
                display="default"
                onChange={changeDate}
                />
              )}
              </View>

            <View style={styles.dateStyle}>
              <Text style={styles.date}>
                  Time:
               </Text>
            
              <Text  
                style={styles.datepicker} 
                editable={false}
                placeholder={'Select time!'}  
                onPress={showTimepicker} >
                  { Moment(time).format('hh:mm:ss')}
               </Text> 
         
              { showTime && (
                <DateTimePicker
                style={{width:'33%'}}
                value={time}
                mode={Platform.OS==='ios'?'time':mode}
                is24Hour={true}
                minimumDate={new Date()}
                display="default"
                onChange={changeTime}
                />
              )}
            
              </View>
                {!willEdit &&
                <SelectDropdown
                  data={Categories}
                  onSelect={(selectedItem) => {
                    setCategory(selectedItem)
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                   return selectedItem
                  }}
                  rowTextForSelection={(item) => {
                     return item
                  }}
                  defaultButtonText='Select Category'
                  buttonStyle={styles.dropdown1BtnStyle}
                  buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  renderDropdownIcon={() => {
                    return (
                      <FontAwesome name="chevron-down" color={"#444"} size={18} />
                    );
                  }}
                  dropdownIconPosition={"right"}
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}/>
                }
                {willEdit &&
                  <SelectDropdown
                  data={Categories}
                  onSelect={(selectedItem) => {
                    setCategory(selectedItem)
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                   return selectedItem
                  }}
                  rowTextForSelection={(item) => {
                     return item
                  }}
                  defaultButtonText={categToEdit}
                  buttonStyle={styles.dropdown1BtnStyle}
                  buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  renderDropdownIcon={() => {
                    return (
                      <FontAwesome name="chevron-down" color={"#444"} size={18} />
                    );
                  }}
                  dropdownIconPosition={"right"}
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}/>
                }
              {!willEdit &&  
              <TouchableOpacity style={styles.addNewContainer}>
                <TextInput style={styles.addTaskWrapper} placeholder={'Add a note...'} onChangeText={text => setNote(text)}/>
              </TouchableOpacity>
              } 
              {willEdit &&  
              <TouchableOpacity style={styles.addNewContainer}>
                <TextInput style={styles.addTaskWrapper} defaultValue={noteToEdit} onChangeText={text => setNote(text)}></TextInput>
              </TouchableOpacity>
              } 
              <View style={styles.buttonsWrapper}>
              <Pressable
                  style={[styles.buttonModal, styles.buttonCancel]}
                  onPress={() => {setShowDate(false),setShowTime(false),setWillEdit(!willEdit), setModalVisible(!modalVisible), resetState()}}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                {willEdit &&
                  <Pressable
                  style={[styles.buttonModal, styles.buttonSubmit]}
                  onPress={() => {updateTaskObject(), setModalVisible(!modalVisible), resetState()}}>
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
                }
                {!willEdit &&
                  <Pressable
                    style={[styles.buttonModal, styles.buttonSubmit]}
                    onPress={() => {setTaskObject(),setModalVisible(!modalVisible), resetState()}}>
                    <Text style={styles.textStyle}>Submit</Text>
                  </Pressable>
                }
              </View>
            </View>
          </View>
        </Modal>
        {!isEdit &&
        <Pressable
          style={[styles.button]}
          onPress={() => {setModalVisible(true), setWillEdit(false)}}>
          <Text style={styles.text}>+ add new task</Text>
        </Pressable>
        }
      </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  centerModalView: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  modalView: {
    width: '100%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: "space-evenly",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  header: {
    fontSize: 18,
  },
  date: {
    fontSize: 15,
    marginRight: 10
  },
  buttonsWrapper: {
    marginTop: 10,
    flexDirection: 'row',
  },
  dateStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 10,
    paddingTop: 10,
    borderRadius: 10,
  },
  buttonModal: {
    height: 40,
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
  },
  buttonSubmit: {
    alignItems: 'center',
    width: windowW*0.2,
    backgroundColor: '#5cb85c',
    borderRadius: 8,
  },
  buttonCancel: {
    alignItems: 'center',
    width: windowW*0.2,
    borderRadius: 8,
    backgroundColor: '#d9534f',
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
    paddingVertical: 5,
    paddingHorizontal: 15,    
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  datepicker: {
    paddingVertical: 10,
    paddingHorizontal: 15,    
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnStyle: {
    width: "60%",
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { 
    fontSize: 16,
    color: "#444", 
    textAlign: "left" 
  },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { 
    fontSize: 16,
    color: "#444", 
    textAlign: "left" 
  },
});

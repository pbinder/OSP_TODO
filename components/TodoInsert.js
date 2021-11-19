import React from 'react';
import {
  StyleSheet, 
  View, 
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const TodoInsert = ({modalVisible, setModalVisible, setTask, handleAddTask}) => {
  
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centerModalView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>TO DO LIST</Text>
              <TouchableOpacity style={styles.addNewContainer}>
                <TextInput style={styles.addTaskWrapper} placeholder={'Write a new task'} onChangeText={text => setTask(text)}/>
              </TouchableOpacity>
              <View style={styles.buttonsWrapper}>
              <Pressable
                  style={[styles.buttonModal, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
                <Pressable
                  style={[styles.buttonModal, styles.buttonClose]}
                  onPress={() => handleAddTask()}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.text}>+ add new task</Text>
        </Pressable>
      </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    //flex: 1,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonsWrapper: {
    marginTop: 10,
    flexDirection: 'row'
  },
  button: {
    marginLeft: 10,
    paddingTop: 10,
    borderRadius: 10,
  },
  buttonModal: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
  },
  buttonOpen: {
    backgroundColor: '#00462A',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
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

export default TodoInsert;
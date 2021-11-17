import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';


class TodoInsert extends React.Component {
  render() {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.button}>
        <TouchableOpacity style={styles.button} onPress={this.addNewTask} title>
            <Text style={styles.text}>+ add new task</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  addNewTask() {
    console.log('Add new task Button pressed')
  }


};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginLeft: 10,
    color: '#00462A',
    paddingTop: 5,

  },
  text: {
    color:'#FFFFFF'
  }
});

export default TodoInsert;
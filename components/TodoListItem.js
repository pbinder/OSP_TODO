import { circle } from 'cli-spinners';
import { rosybrown } from 'color-name';
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const TodoListItem = (props) => {
  //render() {
    return (
    <View style={styles.container}>
      <View style={styles.itemLeft}>
          <TouchableOpacity style={styles.circle}></TouchableOpacity>
      </View>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: 20,
    marginRight: 15,
  },
  circle: {
    width: 24,
    height: 24,
    backgroundColor: '#C0C0C0',
    borderRadius: 15,
  },
  text: {
    flex: 5,
    padding: 5,
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 15,
    width: 100,
  },

});

export default TodoListItem;
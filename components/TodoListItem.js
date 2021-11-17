import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

class TodoListItem extends React.Component {
  render() {

    return (
    <View style={styles.container}>
      <Text style={styles.text}>TodoList items will be shown here</Text>
    </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 5,
    padding: 10,
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 20,
    width: 100,
  },

});

export default TodoListItem;
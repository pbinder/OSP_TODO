import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import TodoListItem from './TodoListItem';

class TodoList extends React.Component {
  render() {

    return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      <TodoListItem></TodoListItem>
    </ScrollView>
  );
  }
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
  },
});

export default TodoList;
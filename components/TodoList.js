import React,{useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import TodoListItem from './TodoListItem';

const TodoList = (props) => {
    return (
      <ScrollView contentContainerStyle={styles.listContainer}>
        <TodoListItem text={props.text}></TodoListItem>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
  },
});

export default TodoList;
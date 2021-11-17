import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TopBar from './components/TopBar';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar></TopBar>
      <View style={styles.overview}>
      </View>
      <View style={styles.list}>
          <TodoInsert> </TodoInsert>
        <View style={styles.card}>
          <TodoList></TodoList>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  list: {
    backgroundColor: '#00462A',
    flex: 3,
  },
  card: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },
});

export default App;
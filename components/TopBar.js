import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Moment from 'moment';
import { StatusBar } from 'expo-status-bar';

class TopBar extends React.Component {
  render() {
    Moment.locale('en');
    let currentDate = new Date();
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.circle} onPress={this.openSideMenu}>
        </TouchableOpacity>
        <Text >{Moment(currentDate).format('d MMMM')}</Text>
        <TouchableOpacity style={styles.button} onPress={this.openEditPage} title>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  openSideMenu(){
    console.log("Event for Side Menu open Button Presssed")
  }

  openEditPage(){
    console.log("Event for Edit Page Menu open Button Pressed")
  }

}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 55,
    flexDirection: 'row', // row
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: StatusBar.currentHeight
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    color: '#00462A',
    borderWidth: 10,
    marginLeft: 5,
  },
  button: {
    width: 30,
    height: 30,
    color: '#FFFFFF',
    marginRight: 5,
    marginTop: 10
  },
});

export default TopBar;
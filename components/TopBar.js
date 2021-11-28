import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Pressable } from 'react-native';
import Moment from 'moment';
import { StatusBar } from 'expo-status-bar';
import WingPage from './WingPage';

function TopBar ({wingPageVisible, setWingPageVisible}) {
 
  const openSideMenu=()=>{
    console.log("Event for Side Menu open Button Presssed")
  }

  const openEditPage=()=>{
    console.log("Event for Edit Page Menu open Button Pressed")
  }


    Moment.locale('en');
    let currentDate = new Date();
    return (
    <View style={styles.precontainer}>
      <View style={styles.wingcontainer}>
        <WingPage
          wingPageVisible={wingPageVisible} 
          setWingPageVisible={setWingPageVisible} >
        </WingPage>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.circle} onPress={() => setWingPageVisible(true)} underlayColor = '#000'>
        </Pressable>
        <Text >{Moment(currentDate).format('d MMMM')}</Text>
        <TouchableOpacity style={styles.button} onPress={() =>openEditPage()} >
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
};

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
  wingcontainer: {
    flex:2,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 13,
    borderColor: '#00462A',
    borderWidth: 13,
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
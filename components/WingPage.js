import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import {openSideMenu} from './TopBar';
import Modal from 'react-native-modal';
import {images} from './Images';
export default function WingPage ({wingPageVisible, setWingPageVisible}) {
      
      return (
        <View style={styles.centeredView}>
            <Modal
            animationIn={'slideInLeft'}
            animationOut={'slideOutLeft'}
            transparent={true}
            isVisible={wingPageVisible}
            onRequestClose={() => {setWingPageVisible(!wingPageVisible);}}>

              <View style={styles.centerModalView}>
                <View style={styles.modalView}>
                <Text style={styles.header}>(Someone's) Weekly Report</Text>
                <Text style={styles.modalText}>GOOD JOB!! ABSOLUTELY PERFECT</Text>
                <Pressable style={styles.button}
                        onPress={() => setWingPageVisible(!wingPageVisible)}>          
                        
                        <Text style={styles.textStyle}>Finish Review</Text>
                
                </Pressable>
                </View>
              </View>
            </Modal>
        </View>
    );
  };

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  centerModalView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modalView: {
    width: '100%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  header:{
    fontSize:20,
    fontWeight: "bold",
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#00462A",
  },
  
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center"
  }
});
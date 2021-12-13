import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from 'react-native-modal';
import { ProgressBar } from "react-native-paper";
import {Image} from 'react-native';

export default function WingPage ({wingPageVisible, setWingPageVisible,percentage, originalTaskItems}) {   
      
    const totalHW = originalTaskItems.filter(item => item.category === 'Homework').length;
    const completedHW = originalTaskItems.filter(item => ((item.category === 'Homework') && (item.completed === true))).length;
    const percentHW = Math.floor((completedHW*100)/(totalHW));

    const totalLeisure = originalTaskItems.filter(item => item.category === 'Leisure').length;
    const completedLeisure = originalTaskItems.filter(item => ((item.category === 'Leisure') && (item.completed === true))).length;
    const percentLeisure = Math.floor((completedLeisure*100)/(totalLeisure));

    const totalUniv = originalTaskItems.filter(item => item.category === 'University').length;
    const completedUniv = originalTaskItems.filter(item => ((item.category === 'University') && (item.completed === true))).length;
    const percentUniv = Math.floor((completedUniv*100)/(totalUniv));

    const totalGroc = originalTaskItems.filter(item => item.category === 'Groceries').length;
    const completedGroc = originalTaskItems.filter(item => ((item.category === 'Groceries') && (item.completed === true))).length;
    const percentGroc = Math.floor((completedGroc*100)/(totalGroc));

    return (
        <View>
            <Modal
            style = {{marginLeft: 0, marginBottom: 0}}
            animationIn={'slideInLeft'}
            animationOut={'slideOutLeft'}
            transparent={true}
            isVisible={wingPageVisible}
            onBackdropPress={() => {setWingPageVisible(!wingPageVisible);}}
            backdropTransitionInTiming={400}
            backdropTransitionOutTiming={600}
            onRequestClose={() => {setWingPageVisible(!wingPageVisible);}}>

              <View style={styles.centerModalView}>
                <View style={styles.modalView}>
                <Text style={styles.header}>Your Weekly Report</Text>
                <View style={styles.shareBox}>
                <Text style={styles.compText}>Share with friends !</Text>
                <Text style={styles.shareText}>You can share your tasks with your friends. Copy the link below and share by message.</Text>
                <View style={styles.linkBox}>
                <Text style={styles.linkText}>https://www.EwhaToDoList.ewha.ac.kr/OSP3</Text>
                </View>
                </View>
                <View style={styles.dataReport}>
                  <Text style={styles.compText}>Achievement Rate</Text>
                  <Text style={styles.categText}>Homework: {percentHW}%</Text>
                  <ProgressBar 
                  style={{margin: 15, height: 20, borderRadius: 10}}
                  progress={percentHW/100} 
                  color={"#32CD32"} 
                  width={250}
                  />
                  <Text style={styles.categText}>Leisure: {percentLeisure}%</Text>
                  <ProgressBar 
                  style={{margin: 15, height: 20, borderRadius: 10}}
                  progress={percentLeisure/100} 
                  color={"#32CD32"} 
                  width={250}
                  />
                  <Text style={styles.categText}>University: {percentUniv}%</Text>
                  <ProgressBar 
                  style={{margin: 15, height: 20, borderRadius: 10}}
                  progress={percentUniv/100} 
                  color={"#32CD32"} 
                  width={250}
                  />
                  <Text style={styles.categText}>Groceries: {percentGroc}%</Text>
                  <ProgressBar 
                  style={{margin: 15, height: 20, borderRadius: 10}}
                  progress={percentGroc/100} 
                  color={"#32CD32"} 
                  width={250}
                  />
                  <Text style={styles.modalText}>                      
                      {(()=>{
                        if (percentage==100) return 'Absolutely PERFECT!!!';
                        else if (percentage>=90) return 'Great! Just a little bit more!';
                        else if (percentage>=80) return 'Good Job! Keep up!!';
                        else return 'You can do it!!';
                      })()}
                  </Text>
                  {(()=>{
                        if (percentage==100) return <Image source={require('../assets/trophy100.png')} />
                        else if (percentage>=90) return <Image source={require('../assets/trophy90.png')} />
                        else if (percentage>=80) return <Image source={require('../assets/trophy80.png')} />
                        else return <Image source={require('../assets/trophybasic.png')} />
                      })()}
                </View>
                </View>
              </View>
            </Modal>
        </View>
    );
  };

const styles = StyleSheet.create({
  centerModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modalView: {
    width: '88%',
    height: '92%',
    backgroundColor: '#00462A',
    borderBottomEndRadius: 50,
    borderTopEndRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header:{
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: '#fff',
    margin: '10%',
    marginTop: 0
  },
  shareBox: {
    width: '78%',
    height: '20%',
    backgroundColor: '#C0C0C0',
    borderRadius: 30,
    margin: '5%',
    marginTop: 0,
    alignItems: 'flex-start'
  },
  linkBox:{
    width: '87%',
    height: '15%',
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    margin: 17,
    marginTop: -5,
    alignItems: 'center'
  },
  dataReport: {
    width: '78%',
    height: '60%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareText: {
    color: 'black',
    fontSize: 12.5,
    fontWeight: 'bold',
    margin: 20,
    marginTop: 0
  },
  linkText: {
    color: 'black',
    fontSize: 10,
    margin: 5,
    marginLeft: 10
  },
  compText: {
    color: 'black',
    fontSize: 15,
    margin: 20,
    textAlign: "center", 
    fontWeight: 'bold'
  },
  categText: {
    color: 'black',
    fontSize: 12.5,
    marginLeft: 30,
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },
  modalText: {
    fontSize: 16,
    margin: 20,
    textAlign: "center",
    color: 'black', 
    fontWeight: 'bold'
  }
});

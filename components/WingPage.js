import React from "react";
import { StyleSheet, Text, View, Share, Pressable, Image, Dimensions, Platform } from "react-native";
import Modal from 'react-native-modal';
import { ProgressBar } from "react-native-paper";
import moment from 'moment';

const windowW= Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;

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
    
    let todoList = originalTaskItems.map(item => {
      if (item.completed == true) {
      return '\n✓  ' + item.name + '\n' + '     due on ' + moment.unix(item.date.seconds).format('YYYY/MM/DD') + ' at ' + moment.unix(item.date.seconds).format('HH:mm')
    } else {
      return '\nx  ' + item.name + '\n' + '     due on ' + moment.unix(item.date.seconds).format('YYYY/MM/DD') + ' at ' + moment.unix(item.date.seconds).format('HH:mm')
    }
  }).join(" ")

    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            `Hey! This is my to-do list: \n(Completed: ✓, Incomplete: x) \n ${todoList} \n\n Download the Youcandoit app to make your own personal list! ^^`
        });
      } catch (error) {
        alert(error.message);
      }
    };

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
                  <Text style={styles.header}>Your Personal Report</Text>

                  <View style={styles.shareBox}>
                    <Text style={styles.compText}>Share with friends :)</Text>
                    <Text style={styles.shareText}>You can share your to-do list with your friends. Click the button below to share through your social media!</Text>
                    <View style={styles.linkBox}>
                        <Pressable onPress={onShare} style={styles.shareButton}>
                          <Text style={styles.shareButtonText}>Share</Text>
                        </Pressable>
                    </View>
                  </View>
                <View style={styles.dataReport}>
                  <Text style={styles.achievText}>Achievement Rate</Text>
                  <Text style={styles.categText}>Homework: {percentHW.toString()!='NaN'?percentHW:0}%</Text>
                  <ProgressBar 
                  style={styles.progressBar}
                  progress={percentHW.toString()!='NaN'?(percentHW/100):0}
                  color={percentHW>=65?"#32CD32":"#C0C0C0"}
                  width={windowW*0.56}
                  />
                  <Text style={styles.categText}>Leisure: {percentLeisure.toString()!='NaN'?percentLeisure:0}%</Text>
                  <ProgressBar 
                  style={styles.progressBar}
                  progress={percentLeisure.toString()!='NaN'?(percentLeisure/100):0} 
                  color={percentLeisure>=65?"#32CD32":"#C0C0C0"} 
                  width={windowW*0.56}
                  />
                  <Text style={styles.categText}>University: {percentUniv.toString()!='NaN'?percentUniv:0}%</Text>
                  <ProgressBar 
                  style={styles.progressBar}
                  progress={percentUniv.toString()!='NaN'?(percentUniv/100):0} 
                  color={percentUniv>=65?"#32CD32":"#C0C0C0"} 
                  width={windowW*0.56}
                  />
                  <Text style={styles.categText}>Groceries: {percentGroc.toString()!='NaN'?percentGroc:0}%</Text>
                  <ProgressBar 
                  style={styles.progressBar}
                  progress={percentGroc.toString()!='NaN'?(percentGroc/100):0} 
                  color={percentGroc>=65?"#32CD32":"#C0C0C0"} 
                  width={windowW*0.56}
                  />
                  <Text style={styles.modalText}>                      
                      {(()=>{
                        if (percentage==100) return 'Absolutely PERFECT!!!';
                        else if (percentage>=85) return 'Great! Just a little bit more!';
                        else if (percentage>=65) return 'Good Job! Keep it up!';
                        else return 'You can do it!!';
                      })()}
                  </Text>
                  {(()=>{
                        if (percentage==100) return <Image source={require('../assets/trophy100.png')} />
                        else if (percentage>=85) return <Image source={require('../assets/trophy90.png')} />
                        else if (percentage>=65) return <Image source={require('../assets/trophy80.png')} />
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
    height: Platform.OS==='ios'?'92%':'100%',
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
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#fff',
    marginBottom: windowH*0.035
  },
  shareBox: {
    width: '78%',
    height: '20%',
    backgroundColor: '#d4d4d4',
    borderRadius: 30,
    margin: '2%',
    marginTop: 0,
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
  shareButton:{
    width: windowW*0.20,
    height: windowH*0.035,
    backgroundColor: '#0096FF',
    borderRadius: 14,
    alignSelf: 'center',
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  shareButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  dataReport: {
    width: '78%',
    height: '58%',
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareText: {
    color: 'black',
    fontSize: windowH*0.014,
    fontWeight: '400',
    marginTop: windowH*0.015,
    marginLeft: windowH*0.02,
    marginRight: windowH*0.02,
  },
  linkText: {
    color: 'black',
    fontSize: 10,
    margin: 5,
    marginLeft: 10,
  },
  compText: {
    color: 'black',
    fontSize: windowH*0.017,
    marginTop: windowH*0.022,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  achievText: {
    color: 'black',
    fontSize: windowH*0.017,
    marginTop: windowH*0.02,
    marginBottom: windowH*0.03,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  categText: {
    color: 'black',
    fontSize: windowH*0.014,
    marginLeft: 30,
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },
  modalText: {
    fontSize: windowH*0.02,
    margin: '2.5%',
    textAlign: "center",
    color: 'black', 
    fontWeight: 'bold'
  },
  progressBar: {
    marginTop: windowH*0.012,
    marginBottom: windowH*0.03,
    height: windowH*0.022, 
    borderRadius: 10
  }
});

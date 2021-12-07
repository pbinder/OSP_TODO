import React , {useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from 'react-native-modal';
import Wingpercentage from './Wingpercentage';



export default function WingPage ({wingPageVisible, setWingPageVisible,percentage}) {   
      
    const [taskItems, setTaskItems] = useState([]);
    const [isEdit, setEditState] = useState(false);
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
                <Text style={styles.header}>(Someone's) Weekly Report</Text>
                <View style={styles.shareBox}/>
                <View style={styles.dataReport}>
                  <Wingpercentage 
                  isEdit={isEdit}
                  taskItems={taskItems}>
                  </Wingpercentage>
                </View>
                <View style={styles.dataReport}/>
                <Text style={styles.modalText}>
                      
                      {(()=>{
                        if (percentage==100) return 'Absolutely PERFECT!! Well Done';
                        else if (percentage>=80) return 'Good Job! Keep up!!' ;
                        else return 'You can do it!!';
                      })()}
                  </Text>
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: '#fff',
    margin: 20
  },
  shareBox: {
    width: '78%',
    height: '20%',
    backgroundColor: '#C0C0C0',
    borderRadius: 30,
  },
  dataReport: {
    width: '78%',
    height: '40%',
    backgroundColor: '#fff',
  },
  modalText: {
    fontSize: 16,
    margin: 20,
    textAlign: "center",
    color: '#fff', 
    fontWeight: 'bold'
  }
});
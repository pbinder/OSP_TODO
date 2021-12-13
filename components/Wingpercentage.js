import React  from "react";
import { render } from "react-dom";
import {View, StyleSheet, Text} from 'react-native';
import ProgressBarLine from 'react-progressbar-line'

export default function Percentage ({taskItems}){

    const tasksComp = taskItems.filter(item => item.completed === true).length;
    const tasksIncomp = taskItems.filter(item => item.completed === false).length;
    const percent = Math.floor((tasksComp*100)/(tasksIncomp+tasksComp));

    return (
        <View >
            <View >  
                <Text style={styles.todaysTasks}>Today's Tasks</Text>
            </View>
            <View>
                <View style={styles.taskCompletion}>
                <ProgressBarLine
                value={percent}>

                </ProgressBarLine>
                </View>
            </View>
        </View>        
    )
}

const styles = StyleSheet.create({
    overviewContainer: {
        flexDirection: 'column',
        backgroundColor: '#E8E8E8',
    },
    taskCircleTitle: {
        width: '100%',
        height: '10%',
        backgroundColor: '#E8E8E8',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginLeft: 22,
    },
    upperRowContainer: {
        width: '100%',
        height: '45%',
        backgroundColor: '#E8E8E8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 15,
    },
    lowerRowContainer: {
        width: '100%',
        height: '45%',
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    taskCircle: {
        width: 85,
        height: 85,
        borderRadius: 50,
        borderWidth: 10,  
        borderColor: '#32CD32',
    },
    upperCategoryBox: {
        width: '31.2%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: '#C0C0C0',
        borderWidth: 0.1,
        shadowOffset: {width: 0.5, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowColor: '#171717',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    lowerCategoryBox: {
        width: '30.2%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: '#C0C0C0',
        borderWidth: 0.1,
        shadowOffset: {width: 0.5, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowColor: '#171717',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryName: {
        color: '#000',
        fontSize: 15,
        marginBottom: 3,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    numOfTasks: {
        color: '#000',
        fontSize: 33,
        fontWeight: '700',
        textAlign: 'center',
    },
    todaysTasks: {
        color: '#000',
        fontSize: 19,
        fontWeight: '500',
        textAlign: 'center',
    }
});

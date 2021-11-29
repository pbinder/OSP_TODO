import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';

import db from '../firebase';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';

export default function TodoListItem({taskItems}) {

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const completeTask = task => {
        task.completed = !task.completed;
        console.log('Complete Task', task);
    };



    const renderItem = data => (
        <TouchableHighlight
            onPress={() => completeTask(data.item)}
            style={styles.rowFront}
            underlayColor={'#AAA'}>
            <View style={styles.subcontainer}>
                <View style={styles.itemLeft}>
                    <TouchableOpacity style={styles.circle}onPress={() => completeTask(data.item)}></TouchableOpacity>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={[styles.text, data.item.completed ? styles.completedTaskText : styles.notCompleted]}>{data.item.name}</Text>
                    <Text style={styles.dateText}>due at {moment.unix(data.item.date.seconds).format('YYYY/MM/DD')} at {moment.unix(data.item.date.seconds).format('HH:mm')} </Text>
                </View>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data) => (
        <View style={styles.rowBack}>
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                <Text style={styles.backTextWhite}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={() => deleteItem(data)}>
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    const deleteItem = data => {
        db.collection('todos').doc(data.item.id).delete();
    };
  
    return (
        <View style={styles.container}>
            <SwipeListView
                data={taskItems}
                keyExtractor={(item, index) => `${index}`}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                onRowDidOpen={onRowDidOpen}
                disableRightSwipe={true}
            >
                
            </SwipeListView>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    subcontainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginLeft: 25,
        marginRight: 15,
    },
    circle: {
        width: 24,
        height: 24,
        backgroundColor: '#C0C0C0',
        borderRadius: 15,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        backgroundColor: '#FFF',
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
        paddingLeft: 12,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    labelContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 25,
    },    
    text: {
        fontWeight: '500',
        fontSize: 17,
        width: '100%',
    },
    completedTaskText: {
        textDecorationLine: 'line-through',
    },
    notCompleted: {
    },
    dateText: {
        fontWeight: '400',
        fontSize: 14,
    }
});
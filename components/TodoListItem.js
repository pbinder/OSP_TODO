import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Pressable,
} from 'react-native';
import db from '../firebase';
import { SwipeListView } from 'react-native-swipe-list-view';
import SelectMultiple from 'react-native-select-multiple'
import moment from 'moment';

export default function TodoListItem({taskItems, isEdit, setTaskItems}) {

    const [selectedItems, setSelectedItems] = useState([]);

    const editTasksArray = taskItems.map( item => {
        let label = item.name + '\n '+'due at ' + moment.unix(item.date.seconds).format('YYYY/MM/DD') + 
        ' at ' + moment.unix(item.date.seconds).format('HH:mm')
        return {label: label, value: item.id}
    })

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const completeTask = task => {
        let tempArr = taskItems.map(item => {
            if (item.id == task.id)task.completed = !task.completed;
            return item
        })
        setTaskItems(tempArr)
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
                <View >
                    { !data.item.completed && 
                        <View style={styles.labelContainer}>
                            <Text style={styles.text}>{data.item.name}</Text>
                            <Text style={styles.dateText}>due at {moment.unix(data.item.date.seconds).format('YYYY/MM/DD')} at {moment.unix(data.item.date.seconds).format('HH:mm')} </Text>
                        </View>
                      }
                    { data.item.completed &&
                        <View style={styles.labelContainer}>
                            <Text style={styles.completedTaskText}>{data.item.name}</Text>
                            <Text style={styles.completedDateText}>due at {moment.unix(data.item.date.seconds).format('YYYY/MM/DD')} at {moment.unix(data.item.date.seconds).format('HH:mm')} </Text>
                        </View>
                    }
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

    const deleteSelectedItems = () => {
        selectedItems.forEach(item => {
          db.collection('todos').doc(item.value).delete();
        })
    };

    const deleteAllItems = () => {
        taskItems.forEach(item => {
          db.collection('todos').doc(item.id).delete();
        })
    };

    const renderLabel = (label) => {
        let split = label.split(" ")[0].trim();
        let task = taskItems.find(item =>  item.name == split)
        return (
          <View style={styles.multiSelectContainer}>
              { (!task.completed) &&
                  <Text style={styles.label}>{label}</Text>
              }
              { (task.completed) &&
                  <Text style={ styles.labelCompleted }>{label}</Text>
              }
          </View>
        )
      }
  
    return (
        <View>
        {isEdit &&         
        <View style={styles.deleteHeader}>
            <Pressable
                style={styles.button}
                onPress={() => deleteSelectedItems()}
            >
                <Text style={styles.deleteText}>delete selected</Text>
            </Pressable>
            
            <Pressable
                style={styles.button}
                onPress={() => deleteAllItems()}
            >
                <Text style={styles.deleteText}>delete all</Text>
            </Pressable>
        </View>
        }

        {!isEdit &&
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
        }
        { isEdit &&
        <View style={styles.multiSelectContainer}>
            <SelectMultiple
                items={editTasksArray}
                keyExtractor={(item, index) => `${index}`}
                selectedItems={selectedItems}
                onSelectionsChange={setSelectedItems}
                renderLabel={renderLabel}
                rowStyle={styles.rowStyle}
                />
        </View>          
        }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    multiSelectContainer: {
        marginLeft: 10,
        marginRight: 10,
      },
      rowStyle: {
        height: 60,
      },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginLeft: 25,
        marginRight: 15,
    },
    button: {
        paddingLeft: 15,
        borderRadius: 10,
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
        backgroundColor: '#20639B',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: '#ED553B',
        right: 0,
    },
    labelContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 25,
    },    
    label: {
        paddingLeft: 25,
        fontWeight: '500',
        fontSize: 16,
    },
    labelCompleted:{
        paddingLeft: 25,
        fontWeight: '500',
        fontSize: 16,
        textDecorationLine: 'line-through',
        color:'#8EBEBE'
    },
    text: {
        fontWeight: '500',
        fontSize: 17,
        width: '100%',
    },
    deleteHeader: {
        flexDirection: 'row',
        paddingBottom: 10
    },
    deleteText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#FFFFFF'
    },
    completedTaskText: {
        color:'#8EBEBE',
        fontWeight: '500',
        fontSize: 17,
        width: '100%',
        textDecorationLine: 'line-through'
    },
    dateText: {
        fontWeight: '400',
        fontSize: 14,
    } ,
    completedDateText: {
        color:'#8EBEBE',
        fontWeight: '400',
        fontSize: 14,
        textDecorationLine: 'line-through'
    }    
});
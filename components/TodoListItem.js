import React, {useState, useRef} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Pressable,
    LogBox,
} from 'react-native';
import db from '../firebase';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import Moment from 'moment';
import MultiSelectSortableFlatlist from 'react-native-multiselect-sortable-flatlist';
import { CheckBox } from 'react-native-elements';

export default function TodoListItem({taskItems, isEdit, setTaskItems, setModalVisible, modalVisible, setWillEdit, dataToEdit, originalTaskItems, setOriginalTaskItems}) {
    
    LogBox.ignoreAllLogs();
    LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);
    const multiSelectSortList = useRef();

    const [selectedItems, setSelectedItems] = useState([]);

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };
    
    const completeTask = task => {
        let tempArr = taskItems.map(item => {
            if (item.id == task.id) {
                task.completed = !task.completed;
                /*db.collection('todos').doc(task.id).update({
                    completed: task.completed
                });*/
            }
            return item
        })
        setTaskItems(tempArr);
    };

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => completeTask(data.item)}
            style={styles.rowFront}
            underlayColor={'#AAA'}>
            <View style={styles.subcontainer}>
                <View style={styles.itemLeft}> 
                { data.item.completed && 
                    <TouchableOpacity style={[styles.circle, { justifyContent: 'center'}]} onPress={() => completeTask(data.item)}>
                        <Text style={{fontWeight: 'bold', alignSelf: 'center', color: '#C0C0C0' }}>✓</Text>
                    </TouchableOpacity>
                }
                { !data.item.completed && 
                    <TouchableOpacity style={styles.circle} onPress={() => completeTask(data.item)}></TouchableOpacity>
                }
                </View>
                <View >
                    { !data.item.completed && 
                        <View style={styles.labelContainer}>
                            <Text style={styles.text}>{data.item.name}</Text>
                            <Text style={styles.noteText}> 
                            {(()=>{
                            if (data.item.note=='') return '';
                            else return data.item.note+'  ' ;
                             })()}
                            </Text>
                            <Text style={styles.dateText}>due on {moment.unix(data.item.date.seconds).format('YYYY/MM/DD')} at {moment.unix(data.item.date.seconds).format('HH:mm')} </Text>
                        </View>
                      }
                    { data.item.completed &&
                        <View style={styles.labelContainer}>
                            <Text style={styles.completedTaskText}>{data.item.name} </Text>
                            <Text style={styles.completedDateText}>due on {moment.unix(data.item.date.seconds).format('YYYY/MM/DD')} at {moment.unix(data.item.date.seconds).format('HH:mm')} </Text>
                        </View>
                    }
                </View>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={() => {setWillEdit(true), setModalVisible(!modalVisible), dataToEdit(data.item), closeRow(data, rowMap)}}>
                <Text style={styles.backTextWhite}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={() => {deleteItem(data), closeRow(data, rowMap)}}>
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    const closeRow = (data, rowMap) => {
        rowMap[data.index].closeRow();
    }

    const deleteItem = data => {
        db.collection('todos').doc(data.item.id).delete();
    };

    const deleteSelectedItems = () => {
        selectedItems.forEach(item => {
          db.collection('todos').doc(item.id).delete();
        })
    };

    const deleteAllItems = () => {
        taskItems.forEach(item => {
          db.collection('todos').doc(item.id).delete();
        })
    };

    const renderLabel = ( item, index, selected, drag, dragEnd, reverseSelection) => {
        let task; 
        taskItems.map(data => {
            if (data.name === item.name) task = data.completed;
            return data.completed
        });
        return (
            <TouchableHighlight style={[styles.rowFront, styles.aligner]}  onLongPress={() => drag()}
            onPressOut={() => dragEnd()} underlayColor={'#AAA'}>
                <View style={styles.order}>
                    <CheckBox
                    onPress={() => reverseSelection()}
                    checked={selected}/>
                    { !task &&
                        <View>
                            <Text style={[styles.label, {marginBottom: -5}]}>{item.name}</Text>
                            <Text style={[styles.label, styles.dateText]}>due on {moment.unix(item.date.seconds).format('YYYY/MM/DD')} at {moment.unix(item.date.seconds).format('HH:mm')}</Text>
                        </View>
                    }
                    { task &&
                    <View>
                        <Text style={ styles.labelCompleted }>{item.name}</Text>
                        <Text style={[styles.labelCompleted, styles.dateText]}>due on {moment.unix(item.date.seconds).format('YYYY/MM/DD')} at {moment.unix(item.date.seconds).format('HH:mm')}</Text>
                    </View>
                    }
                </View>
            </TouchableHighlight> 
        )
      }

      const onSelectionChanged = (selectedItems) => {
        setSelectedItems(selectedItems);
      }

      const onSort = (newArray) => {
        setTaskItems(newArray);
        setOriginalTaskItems(newArray);
      }
  
    return (
        <View>
        {isEdit &&         
        <View style={styles.deleteHeader}>
            <Pressable
                style={styles.button}
                onPress={() => multiSelectSortList.current.SelectAll()}>
                <Text style={styles.deleteText}>select all</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => multiSelectSortList.current.DeselectAll()}>
                <Text style={styles.deleteText}>deselect all</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => deleteSelectedItems()}>
                <Text style={styles.deleteText}>delete selected</Text>
            </Pressable>
            
            <Pressable
                style={styles.button}
                onPress={() => deleteAllItems()}>
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
                rightOpenValue={-150}
                onRowDidOpen={onRowDidOpen}
                disableRightSwipe={true}/>
        </View>
        }
        { isEdit &&
        <View style={styles.editList}>
            <MultiSelectSortableFlatlist
            ref={multiSelectSortList}
            data={originalTaskItems}
            keyExtractor={(item, index) => `${index}`}
            mode="manual"
            renderItem={({ item, index, selected, drag, dragEnd, reverseSelection}) => renderLabel( item, index, selected, drag, dragEnd, reverseSelection)}
            onItemSelected={({ selectedItems, item, index }) => onSelectionChanged(selectedItems)}
            onItemDeselected={({ selectedItems, item, index }) => onSelectionChanged(selectedItems)}
            onSort={data => onSort(data)}/>
        </View>
        }
        </View>
    );
}

const styles = StyleSheet.create({
    editList: {
        height: '87.5%',
        marginLeft: 10,
        marginRight: 10,
    },
    container: {
      marginLeft: 10,
      marginRight: 10,
      marginBottom: '11%',
    },
    subcontainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    multiSelectContainer: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row'
      },
      rowStyle: {
        height: '88.5%',
      },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginLeft: 35,
        marginRight: 10,
    },
    button: {
        paddingLeft: 15,
        borderRadius: 10,
      },
    circle: {
        width: 24,
        height: 24,
        borderWidth: 2.2,
        borderColor: '#C0C0C0',
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
    aligner: {
        alignItems: 'flex-start',
        marginLeft: -8
    },
    colored: {
        backgroundColor: 'lightgrey'
    },
    order: {
        flexDirection: 'row',
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
        backgroundColor: '#627894',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: '#ee6c4d',
        right: 0,
    },
    labelContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 25,
    },    
    label: {
        paddingLeft: 15,
        fontWeight: '500',
        fontSize: 17,
        paddingTop: 6
    },
    labelCompleted:{
        paddingLeft: 15,
        fontWeight: '500',
        fontSize: 17,
        textDecorationLine: 'line-through',
        color:'#8EBEBE',
        paddingTop: 6
    },
    text: {
        fontWeight: '500',
        fontSize: 17,
        width: '100%',
    },
    deleteHeader: {
        flexDirection: 'row',
        paddingBottom: 13,
        justifyContent: 'flex-start',
        paddingTop: 13,
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
        fontSize: 15,
    } ,
    completedDateText: {
        color:'#8EBEBE',
        fontWeight: '400',
        fontSize: 14,
        textDecorationLine: 'line-through'
    }, 
    noteCompletedText: {
        color:'#8EBEBE',
        fontWeight: '400',
        fontSize: 14,
        textDecorationLine: 'line-through'
    },
    noteText: {
        color:'#7E7E7E',
        fontWeight: '400',
        fontSize: 14
    }
});


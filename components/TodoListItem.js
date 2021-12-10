import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Pressable,
    LogBox,
} from 'react-native';
import { CheckBox, List, ListItem } from 'react-native-elements';
import db from '../firebase';
import { SwipeListView } from 'react-native-swipe-list-view';
import SelectMultiple from 'react-native-select-multiple'
import moment from 'moment';
import SortableList from 'react-native-sortable-list';
import MultiSelectSortableFlatlist from 'react-native-multiselect-sortable-flatlist';

export default function TodoListItem({taskItems, isEdit, setTaskItems, setModalVisible, modalVisible, setWillEdit, dataToEdit}) {
    LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);
    const [selectedItems, setSelectedItems] = useState([]);
    const [checked, setChecked] = useState(false);

    const editTasksArray = taskItems.map( item => {
        let label = item.name 
        let date = '\ndue at ' + moment.unix(item.date.seconds).format('YYYY/MM/DD') + 
        ' at ' + moment.unix(item.date.seconds).format('HH:mm')
        let checked = false; 
        return {label: label, date: date, value: item.id, checked: checked}
    })

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const completeTask = task => {
        let tempArr = taskItems.map(item => {
            if (item.id == task.id) {
                task.completed = !task.completed;
                db.collection('todos').doc(task.id).set({
                    completed: task.completed
                }, {merge: true});
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
                    <TouchableOpacity style={styles.circle}onPress={() => completeTask(data.item)}></TouchableOpacity>
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
                            <Text style={styles.dateText}>due at {moment.unix(data.item.date.seconds).format('YYYY/MM/DD')} at {moment.unix(data.item.date.seconds).format('HH:mm')} </Text>
                        </View>
                      }
                    { data.item.completed &&
                        <View style={styles.labelContainer}>
                            <Text style={styles.completedTaskText}>{data.item.name} </Text>
                            <Text style={styles.completedDateText}>due at {moment.unix(data.item.date.seconds).format('YYYY/MM/DD')} at {moment.unix(data.item.date.seconds).format('HH:mm')} </Text>
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
          db.collection('todos').doc(item.value).delete();
        })
    };

    const deleteAllItems = () => {
        taskItems.forEach(item => {
          db.collection('todos').doc(item.id).delete();
        })
    };

    const checkedd= (id) => {
        let its = editTasksArray.map( item => {
            if(item.value === id) item.checked = !item.checked;
            return item.checked
        });
        
        //setSelectedItems(id);
        console.log(id + " " + its)
    }

    const get = (id) => {
        let ok;
        editTasksArray.map(item => {
            if(item.value === id) ok = item.checked;
            //console.log(item.checked)
            return ok
        });
        console.log(ok)
    }
    

    const renderLabel = data => {
        let task, ity; 
        taskItems.map(item => {
            if (item.name === data.data.label) task = item.completed;
            return item.completed
        });
       
        
        //console.log(data.data.label);
        return (
            <View style={[styles.rowFront, styles.aligner]} underlayColor={'#AAA'}>
                <View style={styles.multiSelectContainer}>
                    <CheckBox 
                    checked={() => get(data.data.value)}
                    key = {data.data.value}
                    onPress={() => checkedd(data.data.value)}
                    />
                    { !task &&
                        <Text style={styles.label}>{data.data.label + data.data.date}</Text>
                    }
                    { task &&
                        <Text style={ styles.labelCompleted }>{data.data.label + data.data.date}</Text>
                    }
                </View>
            </View>      
        )
      }

      const setArray = () => {
        console.log(editTasksArray)
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
                rightOpenValue={-150}
                onRowDidOpen={onRowDidOpen}
                disableRightSwipe={true}
            >
            </SwipeListView>
        </View>
        }
        { isEdit &&
        <View>  
            <SortableList
                data={editTasksArray}
                keyExtractor={(item, index) => `${index}`}
                renderRow={renderLabel}
                style={styles.rowStyle}
                contentContainerStyle={styles.multiSelectContainer}
                onChangeOrder={()=>setArray()}
            >
                
                </SortableList>  
            </View>     
        }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      marginLeft: 10,
      marginRight: 10,
      marginBottom: '15%'
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
    aligner: {
        alignItems: 'flex-start',
        paddingLeft: 0,
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
        paddingLeft: 25,
        fontWeight: '500',
        fontSize: 16,
        paddingTop: 6
    },
    labelCompleted:{
        paddingLeft: 25,
        fontWeight: '500',
        fontSize: 16,
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
        fontSize: 14,
        
    } 

});
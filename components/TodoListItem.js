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

export default function TodoListItem({taskItems}) {

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#AAA'}>
            <View style={styles.subcontainer}>
                <View style={styles.itemLeft}>
                    <TouchableOpacity style={styles.circle}onPress={() => console.log('circle pressed')}></TouchableOpacity>
                </View>
                <Text style={styles.text}>{data.item.text}</Text>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap, rowKey) => (
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
    text: {
        fontWeight: '500',
        fontSize: 17,
        marginVertical: 15,
        width: '100%',
    }
});
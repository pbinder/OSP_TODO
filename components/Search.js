import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

export default function Search ({originalTaskItems, setTaskItems}) {    

    const searchSpace = (text)=>{
        if(text == ''){
            setTaskItems(originalTaskItems)        
        }
        else{
            const filteredItems = originalTaskItems.filter((data)=>{
                if(data.name.toLowerCase().includes(text.toLowerCase())){
                    return data
                }
            })
            setTaskItems(filteredItems)        
        }
    }
  
    return(
        <View style={styles.overviewContainer}>
            <View style={styles.Title}>
                <Text style={styles.todaysTasks}>To Do List</Text>
            </View>
            <View style={styles.searchbar}>
                <TextInput style={styles.searchitem} placeholder="Search" onChangeText={(text)=>searchSpace(text)}/>
            </View>
        </View>
    )   
}


const styles = StyleSheet.create({
    todaysTasks: {
        color: '#fff',
        fontSize: 19,
        fontWeight: '600',
        textAlign: 'left',
    },
    Title: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginLeft: 10,
        marginTop: 20,
    },
    overviewContainer: {
        flexDirection: 'column',
        backgroundColor: '#00462A',
    },
    searchbar: {
        width: '95%',
        height: 35,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        borderColor: '#C0C0C0',
        borderWidth: 0.1,
        justifyContent: 'center',
        elevation: 3,
        marginLeft: 10,
        marginTop: 10,
        paddingLeft: 20,
        paddingTop: 0,
    },
    searchitem: {
        color: '#C0C0C0',
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'left',
    }
});

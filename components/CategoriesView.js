import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

class CategoriesView extends React.Component {
    render() {
      return (
    
        <View style={styles.overviewContainer}>
            <View style={styles.taskCircleTitle}>
                <Text style={styles.todaysTasks}>Today's Tasks</Text>
            </View>
            <View style={styles.upperRowContainer}>
                <View style={styles.taskCompletion}>
                    
                    <View style={styles.taskCircle}></View>
                </View>
                <TouchableOpacity style={styles.upperCategoryBox} onPress={this.categButton}>
                    <Text style={styles.categoryName}>Incomplete</Text>
                    <Text style={styles.numOfTasks}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.upperCategoryBox} onPress={this.categButton}>
                    <Text style={styles.categoryName}>Completed</Text>
                    <Text style={styles.numOfTasks}>0</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.lowerRowContainer}>
                <TouchableOpacity style={styles.lowerCategoryBox} onPress={this.categButton}>
                    <Text style={styles.categoryName}>All</Text>
                    <Text style={styles.numOfTasks}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.lowerCategoryBox} onPress={this.categButton}>
                    <Text style={styles.categoryName}>HW</Text>
                    <Text style={styles.numOfTasks}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.lowerCategoryBox} onPress={this.categButton}>
                    <Text style={styles.categoryName}>Priority</Text>
                </TouchableOpacity>
            </View>
        </View>        
        );
    }
    categButton() {
    console.log('Category task Button pressed')
    }
};

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
        width: 120,
        height: 90,
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
        width: 115,
        height: 90,
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

export default CategoriesView;
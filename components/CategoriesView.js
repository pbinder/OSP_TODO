import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { Categories } from './constants/Categories';
import SelectDropdown from 'react-native-select-dropdown'

export default function CategoriesView ({isEdit, originalTaskItems, setTaskItems, setPercentage, percentage}) {
    const [incompleteSelect, setIncomplete] = useState(false);
    const [completeSelect, setComplete] = useState(false);
    const [firstCatSelect, setFirstCat] = useState(false);
    const [secondCatSelect, setSecondCat] = useState(false);
    const [thirdCatSelect, setThirdCat] = useState(false);
    
    const [firstCategoryName, setFirstCategoryName] = useState('University');
    const [secondCategoryName, setSecondCategoryName] = useState('Homework');
    const [thirdCategoryName, setThirdCategoryName] = useState('Groceries');


    useEffect(() => {
        setPercentage(percent);
      });

    const tasksComp = originalTaskItems.filter(item => item.completed === true).length;
    const tasksIncomp = originalTaskItems.filter(item => item.completed === false).length;
    const firstCatTasks = originalTaskItems.filter(item => item.category === firstCategoryName).length;
    const secondCatTasks = originalTaskItems.filter(item => item.category === secondCategoryName).length;
    const thirdCatTasks = originalTaskItems.filter(item => item.category === thirdCategoryName).length;
    const percent = Math.floor((tasksComp*100)/(tasksIncomp+tasksComp));

    const resetCategory = () => {
        setComplete(false)
        setIncomplete(false)
        setFirstCat(false)
        setSecondCat(false)
        setThirdCat(false)
        setTaskItems(originalTaskItems)
    }

    const incompleteCategory=()=> {
        if(!isEdit){
            setComplete(false)
            setFirstCat(false)
            setSecondCat(false)
            setThirdCat(false)
            if(!incompleteSelect){
                const tasksIncompleted = originalTaskItems.filter(item => item.completed === false)
                setIncomplete(true)
                setTaskItems(tasksIncompleted)
            }
            else{
                resetCategory()
            }
        }
    }

    const completeCategory =()=> {
        if(!isEdit){
            setIncomplete(false)
            setFirstCat(false)
            setSecondCat(false)
            setThirdCat(false)
            if(!completeSelect){
                const tasksCompleted = originalTaskItems.filter(item => item.completed === true)
                setComplete(true)
                setTaskItems(tasksCompleted)
            }
            else{
                resetCategory()
            }
        }
    }

    const firstCategory =(item)=> {
        if(!isEdit){
            setIncomplete(false)
            setComplete(false)
            setSecondCat(false)
            setThirdCat(false)
            if(!firstCatSelect){
                const firstCat = originalTaskItems.filter(item => item.category === firstCategoryName)
                setFirstCat(true)
                setTaskItems(firstCat)
            }
            else{
                resetCategory()
            }
        } else {
            setFirstCategoryName(item)
        }
    }

    const secondCategory =(item)=> {
        if(!isEdit){
            setIncomplete(false)
            setComplete(false)
            setFirstCat(false)
            setThirdCat(false)
            if(!secondCatSelect){
                const secondCat = originalTaskItems.filter(item => item.category === secondCategoryName)
                setSecondCat(true)
                setTaskItems(secondCat)
            }
            else{
                resetCategory()
            }
        } else {
            setSecondCategoryName(item)    
        }
    }

    const thirdCategory =(item)=> {
        if(!isEdit){
            setIncomplete(false)
            setComplete(false)
            setFirstCat(false)
            setSecondCat(false)
            if(!thirdCatSelect){
                const thirdCat = originalTaskItems.filter(item => item.category === thirdCategoryName)
                setThirdCat(true)
                setTaskItems(thirdCat)
            }
            else{
                resetCategory()
            }
        } else {
            setThirdCategoryName(item)     
        }
    }

      return (
    
        <View style={styles.overviewContainer}>
            <View style={styles.taskCircleTitle}>  
                <Text style={styles.todaysTasks}>Today's Tasks</Text>
            </View>
            <View style={styles.upperRowContainer}>
                <View style={styles.taskCompletion}>
                    <ProgressCircle
                    percent={percent}
                    radius={45}
                    borderWidth={10}
                    color="#32CD32"
                    shadowColor="#999"
                    bgColor="#E8E8E8">
                        <Text style={{fontSize: 17}}>{percent + "%"}</Text>
                    </ProgressCircle>
                </View>
                <TouchableOpacity style={[styles.categoryBox, incompleteSelect ? styles.activeBox: null]} onPress={() =>incompleteCategory()}>
                    <Text style={styles.categoryName}>Incomplete</Text>
                    <Text style={styles.numOfTasks}>{tasksIncomp}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.categoryBox, completeSelect ? styles.activeBox: null]} onPress={() =>completeCategory()}>
                    <Text style={styles.categoryName}>Completed</Text>
                    <Text style={styles.numOfTasks}>{tasksComp}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.lowerRowContainer}>
                <TouchableOpacity style={[styles.categoryBox, firstCatSelect ? styles.activeBox: null]} onPress={() =>firstCategory(null)}>
                   {isEdit && <SelectDropdown
                  data={Categories}
                  onSelect={(selectedItem, index) => {
                    firstCategory(selectedItem)
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                   return selectedItem
                  }}
                  rowTextForSelection={(item) => {
                     return item
                  }}
                  defaultButtonText= {firstCategoryName}
                  buttonStyle={styles.categoryButton}
                  buttonTextStyle={styles.categoryButtonTxtStyle}
                />
                }
                   {!isEdit && <Text style={styles.categoryName}>{firstCategoryName}</Text> }
                    <Text style={styles.numOfTasks}>{firstCatTasks}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.categoryBox, secondCatSelect ? styles.activeBox: null]} onPress={() =>secondCategory(null)}>
                    {isEdit && <SelectDropdown
                    data={Categories}
                    onSelect={(selectedItem, index) => {
                        secondCategory(selectedItem)
                    }}
                    buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem
                    }}
                    rowTextForSelection={(item) => {
                        return item
                    }}
                    defaultButtonText= {secondCategoryName}
                    buttonStyle={styles.categoryButton}
                    buttonTextStyle={styles.categoryButtonTxtStyle}
                    />
                    }
                   {!isEdit && <Text style={styles.categoryName}>{secondCategoryName}</Text> }
                    <Text style={styles.numOfTasks}>{secondCatTasks}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.categoryBox, thirdCatSelect ? styles.activeBox: null]} onPress={() =>thirdCategory(null)}>
                    {isEdit && <SelectDropdown
                    data={Categories}
                    onSelect={(selectedItem, index) => {
                        thirdCategory(selectedItem)
                    }}
                    buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem
                    }}
                    rowTextForSelection={(item) => {
                        return item
                    }}
                    defaultButtonText= {thirdCategoryName}
                    buttonStyle={styles.categoryButton}
                    buttonTextStyle={styles.categoryButtonTxtStyle}
                    />
                    }
                   {!isEdit &&
                    <Text style={styles.categoryName}>{thirdCategoryName}</Text> }
                    <Text style={styles.numOfTasks}>{thirdCatTasks}</Text>
                </TouchableOpacity>
            </View>
        </View>        
        );
    
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
    categoryBox: {
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
    activeBox:{
        borderColor: '#0096FF',
        borderRadius: 20,
        borderWidth: 1,
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
    },
    categoryButton: {
        width: "100%",
        height: 25,
        borderRadius: 20,
        backgroundColor: "#FFF",
      },
    categoryButtonTxtStyle: { 
        color: '#000',
        fontSize: 15,
        marginBottom: 3,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});

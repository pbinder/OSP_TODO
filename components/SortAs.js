import React, {useState, useEffect} from "react";
import { StyleSheet} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";



export default function SortAs(setTaskItems){

    const [standardForList, setStandardForList] = useState('');
    const sortMenu = ["Manual", "Alphabet", "Recent"]
    
    {(()=>{
      if(standardForList=='completed') 
      {useEffect(() => {
          db.collection('todos').orderBy('completed', 'asc').onSnapshot(snapshot => {
            setTaskItems(snapshot.docs.map(doc => ({
              id: doc.id, 
              name: doc.data().name, 
              date: doc.data().date,
              category: doc.data().category,
              note: doc.data().note,
              completed: doc.data().completed
            })))
          })
        }, []); }
      else if(standardForList=='alphabet') 
      {useEffect(() => {
          db.collection('todos').orderBy('name', 'asc').onSnapshot(snapshot => {
            setTaskItems(snapshot.docs.map(doc => ({
              id: doc.id, 
              name: doc.data().name, 
              date: doc.data().date,
              category: doc.data().category,
              note: doc.data().note,
              completed: doc.data().completed
            })))
          })
        }, []);}
    })()}


    return(
        <SelectDropdown
                  data={sortMenu}
                  onSelect={(selectedItem,index) => {
                    console.log(selectedItem, index)
                    {(()=>{
                      if(index==0) setStandardForList('timestamp');
                      else if(index==1) setStandardForList('completed'); //have to change inside ' '
                      if(index==2) setStandardForList('alphabet');  
                    })()}

                    
  
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                   return selectedItem
                  }}
                  rowTextForSelection={(item) => {
                     return item
                  }}
                  defaultButtonText='Sort As'
                  buttonStyle={styles.dropdown1BtnStyle}
                  buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  renderDropdownIcon={() => {
                    return (
                      <FontAwesome name="chevron-down" color={"#444"} size={5} />
                    );
                  }}
                  dropdownIconPosition={"right"}
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}
                />

    );
};

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
      width: "25%",
      height: 25,
      backgroundColor: "#FFF",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#444",
    },
    dropdown1BtnTxtStyle: { 
      fontSize: 13,
      color: "#444", 
      textAlign: "left" 
    },
    dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
    dropdown1RowStyle: {
      backgroundColor: "#EFEFEF",
      borderBottomColor: "#C5C5C5",
    },
    dropdown1RowTxtStyle: { 
      fontSize: 16,
      color: "#444", 
      textAlign: "left" 
    },
  });
  
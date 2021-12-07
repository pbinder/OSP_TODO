import React, {useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default function SortAs({taskItems, setTaskItems}){
    
    const sortMenu = ["Name", "Added Date (Earliest)","Added Date (Latest)",  "Due Date"]
    const inOrder = (index) => {

        switch(index){
          case 0:
            inAlphabeticalOrder();
            break;
          case 1:
            inLatestDateOrder();
            break;
          case 2:
            inEarliestDateOrder();
            break;
          case 3:
            inDueDateOrder();
            break;
          
        }

        
    };
   
    const inAlphabeticalOrder = () => { 
          let array=(taskItems.sort( (a,b)=>( a.name.toLowerCase()> b.name.toLowerCase() ) ? 1 : -1 ))
          let sorted=array.map(item=>{
            return{
              adddate:item.adddate,
              name:item.name,
              date:item.date,
              category:item.category,
              note:item.note,
              completed:item.completed
            }})
          setTaskItems(sorted);
    };
    const inLatestDateOrder = () => {
      let array=(taskItems.sort( (a,b)=>( b.adddate> a.adddate)  ? 1 : -1 ))
      let sorted=array.map(item=>{
        return{
          adddate:item.adddate,
          name:item.name,
          date:item.date,
          category:item.category,
          note:item.note,
          completed:item.completed
        }})
      setTaskItems(sorted);};
      const inEarliestDateOrder = () => {
        let array=(taskItems.sort( (a,b)=>( a.adddate> b.adddate)  ? 1 : -1 ))
        let sorted=array.map(item=>{
          return{
            adddate:item.adddate,
            name:item.name,
            date:item.date,
            category:item.category,
            note:item.note,
            completed:item.completed
          }})
        setTaskItems(sorted);};
    const inDueDateOrder = () => {
      let array=(taskItems.sort( (a,b)=>( a.date> b.date)  ? 1 : -1 ))
      let sorted=array.map(item=>{
        return{
          adddate:item.adddate,
          name:item.name,
          date:item.date,
          category:item.category,
          note:item.note,
          completed:item.completed
        }})
      setTaskItems(sorted);};

    return(
        <SelectDropdown
                  data={sortMenu}
                  onSelect={(selectedItem, index) => {
                    //setSortBy(selectedItem)
                    inOrder(index)
                    
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
      width: "40%",
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
      fontSize: 13,
      color: "#444", 
      textAlign: "left" 
    },
  });
  
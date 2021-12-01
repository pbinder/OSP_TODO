import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SortAs(){

    const sortMenu = ["Manual", "Alphabet", "Added order"]

    return(
        <SelectDropdown
                  data={sortMenu}
                  onSelect={(selectedItem) => {
                    setCategory(selectedItem)
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
  
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import COLORS from "../constants/colors";

export const CustomDropdown = ({
  data,
  placeholder,
  stylesDropdown,
  stylesContainer,
  onSelect,
  emptyEl,
  value,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={[styles.container, stylesContainer]}>
      <Dropdown
        style={[
          styles.dropdown,
          stylesDropdown,
          isFocus && { borderColor: COLORS.secondary },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={emptyEl ? [emptyEl, ...data] : data}
        placeholder={placeholder || "Select"}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onSelect(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginHorizontal: 22,
  },
  dropdown: {
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingLeft: 22,
    width: "89%",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

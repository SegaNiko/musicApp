import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import COLORS from "../constants/colors";

export const Input = (props) => {
  const [isFocus, setIsFocus] = useState(false);

  const { label, onChange, placeholder, styleContainer } = props;
  const keyboardType = props?.keyboardType ? props.keyboardType : "default";

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <View style={[{ marginBottom: 12, marginHorizontal: 22 }, styleContainer]}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "400",
          marginVertical: 8,
        }}
      >
        {label}
      </Text>

      <View
        style={{
          width: "100%",
          height: 48,
          borderColor: isFocus ? COLORS.secondary : COLORS.black,
          borderWidth: 1,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 22,
        }}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.black}
          onChangeText={onChange}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            width: "100%",
          }}
        />
      </View>
    </View>
  );
};

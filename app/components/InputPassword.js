import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export const InputPassword = (props) => {
  const { label, onChange, placeholder } = props;
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };
  const onPressIcon = () => {
    setIsPasswordShown((prev) => !prev);
  };

  return (
    <View style={{ marginBottom: 12, marginHorizontal: 22 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 400,
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
          secureTextEntry={isPasswordShown}
          onChangeText={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            width: "100%",
          }}
        />

        <TouchableOpacity
          onPress={onPressIcon}
          style={{
            position: "absolute",
            right: 12,
          }}
        >
          {isPasswordShown ? (
            <Ionicons name="eye-off" size={24} color={COLORS.black} />
          ) : (
            <Ionicons name="eye" size={24} color={COLORS.black} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Animated,
} from "react-native";
import COLORS from "../constants/colors";

export const FormSelectorButton = ({
  title,
  backgroundColor,
  style,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.container, style, { backgroundColor }]}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: "50%",
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { color: COLORS.black, fontSize: 16 },
});

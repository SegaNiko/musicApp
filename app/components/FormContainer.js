import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export const FormContainer = ({ children }) => {
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      {children}
    </KeyboardAvoidingView>
  );
};
